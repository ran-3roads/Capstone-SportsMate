package com.capstone.sportsmate.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.capstone.sportsmate.domain.status.ImageCategory;
import com.capstone.sportsmate.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //amazons3client 주입
    private final AmazonS3 amazonS3;

    //파일 업로드 다시 같은 이름으로 업로드시 덮어씌움
    public List<String> uploadFile(List<MultipartFile> multipartFile, Long id, ImageCategory imageCategory) {
        List<String> fileNameList = new ArrayList<>();
        if(imageCategory.equals(ImageCategory.MEMBER))
            id = SecurityUtil.getCurrentMemberId();
        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        Long finalId = id;
        multipartFile.forEach(file -> {
            System.out.println("file name is"+file.getOriginalFilename());
            String fileName = imageCategory.value()+ finalId +".png";
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }

            fileNameList.add(fileName);
        });

        return fileNameList;
    }

    public void deleteFile(Long id, ImageCategory imageCategory) {//파일 삭제
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, imageCategory.value()+id+".png"));
    }

//    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다. 아직은 사용안함
//        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
//    }


    private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    public String getFile(Long id, ImageCategory imageCategory) {//파일 주소 넘김 주소로 이미지 접근가능함 물론 평소는 이렇게 하면 안됌
        if(imageCategory.equals(ImageCategory.MEMBER))
            id = SecurityUtil.getCurrentMemberId();
        return amazonS3.getUrl(bucket, imageCategory.value()+id+".png").toString();
    }
}
