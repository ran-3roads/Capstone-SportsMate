//package com.capstone.sportsmate.controller;
//
//import com.capstone.sportsmate.service.AwsS3Service;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/sportsmate/file")
//public class AmazonS3Conroller {
//    private final AwsS3Service awsS3Service;
//
//    /**
//     * Amazon S3에 파일 업로드
//     * @return 성공 시 200 Success와 함께 업로드 된 파일의 파일명 리스트 반환
//     */
//    @PostMapping("/image")
//    public ResponseEntity<List<String>> uploadFile(@RequestPart List<MultipartFile> multipartFile) {
//        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile));
//    }
//
//    /**
//     * Amazon S3에 업로드 된 파일을 삭제
//     * @return 성공 시 200 Success
//     */
//    @DeleteMapping("/image")
//    public ResponseEntity<Void> deleteFile(@RequestParam String fileName) {
//        awsS3Service.deleteFile(fileName);
//        return ResponseEntity.ok(null);
//    }
//}
