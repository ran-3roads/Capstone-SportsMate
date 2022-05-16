package com.capstone.sportsmate.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.capstone.sportsmate.domain.status.ImageCategory;
import com.capstone.sportsmate.repository.MemberRepository;
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

@Service
@RequiredArgsConstructor
public class AwsS3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    //amazons3client 주입
    private final AmazonS3 amazonS3;
    private final MemberRepository memberRepository;

    //파일 업로드 다시 같은 이름으로 업로드시 덮어씌움
    public List<String> uploadFile(List<MultipartFile> multipartFile, Long id, ImageCategory imageCategory) {
        List<String> fileNameList = new ArrayList<>();
        if(imageCategory.equals(ImageCategory.MEMBER))
            id = SecurityUtil.getCurrentMemberId();
        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        Long finalId = id;
        multipartFile.forEach(file -> {
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
    //파일 업로드 다시 같은 이름으로 업로드시 덮어씌움
    public List<String> uploadSignupFile(List<MultipartFile> multipartFile, String email, ImageCategory imageCategory) {
        List<String> fileNameList = new ArrayList<>();
        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        Long finalId = memberRepository.findByEmail(email).getId();
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



    public String getFile(Long id, ImageCategory imageCategory) {//파일 주소 넘김 주소로 이미지 접근가능함 물론 평소는 이렇게 하면 안됌
        if(imageCategory.equals(ImageCategory.MEMBER))
            id = SecurityUtil.getCurrentMemberId();
        return amazonS3.getUrl(bucket, imageCategory.value()+id+".png").toString();
    }
}
