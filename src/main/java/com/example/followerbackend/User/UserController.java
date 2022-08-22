package com.example.followerbackend.User;

import com.example.followerbackend.RequestBodyParams.UserReqs;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public void create(@RequestBody UserReqs requestBody) {

        userService.create(requestBody.username, requestBody.password);
    }

    @PostMapping("/login")
    public UserEntity login(@RequestBody UserReqs requestBody) {
        return userService.login(requestBody.username, requestBody.password);
    }

}

