package com.example.editorbackend.User;

import com.example.editorbackend.RequestBodyParams.UserReqs;
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
