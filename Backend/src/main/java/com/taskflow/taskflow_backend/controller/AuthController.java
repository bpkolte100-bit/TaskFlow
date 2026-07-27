package com.taskflow.taskflow_backend.controller;


import com.taskflow.taskflow_backend.dto.RegisterRequest;
import com.taskflow.taskflow_backend.dto.LoginRequest;
import com.taskflow.taskflow_backend.dto.UserResponseDTO;
import com.taskflow.taskflow_backend.service.AuthService;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {



    private final AuthService authService;



    public AuthController(AuthService authService){

        this.authService = authService;

    }





    @PostMapping("/register")
    public UserResponseDTO register(
        @RequestBody RegisterRequest request
){

    return new UserResponseDTO(
            authService.register(request)
    );

}





    @PostMapping("/login")
   public UserResponseDTO login(
        @RequestBody LoginRequest request
){

    return new UserResponseDTO(
            authService.login(request)
    );

}


}