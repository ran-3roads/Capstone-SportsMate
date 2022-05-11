package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.domain.status.ImageCategory;
import com.capstone.sportsmate.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sportsmate/file")
public class AmazonS3Conroller {
    private final AwsS3Service awsS3Service;

    /**
     * Amazon S3에 파일 업로드
     * @return 성공 시 200 Success와 함께 업로드 된 파일의 파일명 리스트 반환
     */
    @PostMapping("/image") //이미지 삽입 수정
    public ResponseEntity<List<String>> uploadFile(@RequestPart List<MultipartFile> multipartFile,
                                                        @RequestParam Long id,
                                                        @RequestParam ImageCategory imageCategory) {//멤버의 경우 필요가 없으니 -1을 부탁한다.
        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile,id,imageCategory));
    }
    @PostMapping("/public/signupimage")//멤버 가입할때 이미지 삽입
    public ResponseEntity<List<String>> uploadSingupFile(@RequestPart List<MultipartFile> multipartFile,
                                                   @RequestParam String email,
                                                   @RequestParam ImageCategory imageCategory) {//멤버의 경우 필요가 없으니 -1을 부탁한다.
        return ResponseEntity.ok(awsS3Service.uploadSignupFile(multipartFile,email,imageCategory));
    }

    @GetMapping("/public/image")//이미지 조회
    public ResponseEntity<String> getFile(@RequestParam Long id,
                                          @RequestParam ImageCategory imageCategory) {//멤버의 경우 필요가 없으니 -1을 부탁한다.
        return ResponseEntity.ok(awsS3Service.getFile(id,imageCategory));
    }

    /**
     * Amazon S3에 업로드 된 파일을 삭제
     * @return 성공 시 200 Success
     */
    @DeleteMapping("/image")//이미지 삭제
    public ResponseEntity<Void> deleteFile(@RequestParam Long id,
                                           @RequestParam ImageCategory imageCategory) {
        awsS3Service.deleteFile(id,imageCategory);
        return ResponseEntity.ok(null);
    }
}
