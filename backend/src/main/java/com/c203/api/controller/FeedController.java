package com.c203.api.controller;

import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;
import com.c203.api.dto.User.UserInfoDto;
import com.c203.api.service.FeedService;
import com.c203.api.service.JwtService;
import com.c203.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class FeedController {
    private final JwtService jwtService;
    private final UserService userService;
    private final FeedService feedService;
    @Autowired
    FeedController(JwtService jwtService,UserService userService,FeedService feedService){
        this.jwtService = jwtService;
        this.userService = userService;
        this.feedService = feedService;
    }
    // 피드 생성
    @PostMapping("/mypage/{roomIdx}")
    public ResponseEntity<?> registFeed(@RequestBody FeedRegistDto feedRegistDto, HttpServletRequest request,@PathVariable("roomIdx") String roomIdx){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            if(!decodeEmail.equals("timeout")){
                feedRegistDto.setEmail(decodeEmail);
                feedRegistDto.setRoomIdx(roomIdx);
                FeedShowDto feedShowDto = feedService.registFeed(feedRegistDto);
                result.put("result",feedShowDto);
                status = HttpStatus.OK;
            }
            else {
                result.put("result", "accessToken 타임아웃");
                status = HttpStatus.UNAUTHORIZED;
            }
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 피드 삭제
    @DeleteMapping("/mypage/{roomIdx}")
    public ResponseEntity<?> deleteUser(HttpServletRequest request,@PathVariable("roomIdx") String roomIdx){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            boolean is = feedService.deleteFeed(decodeEmail,roomIdx);
            if(is){
                result.put("result","success");
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 사진 불러오기
    @GetMapping("/mypage/{roomIdx}")
    public ResponseEntity<?> showPicture(HttpServletRequest request,@PathVariable("roomIdx") String roomIdx){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            if(!decodeEmail.equals("timeout")){
                Map map = feedService.showPicture(decodeEmail, roomIdx);
                result.put("result",map);
                status = HttpStatus.OK;
            }
            else{
                result.put("result","accessToken 타임아웃");
                status = HttpStatus.UNAUTHORIZED;
            }
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}