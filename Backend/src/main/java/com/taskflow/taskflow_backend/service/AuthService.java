package com.taskflow.taskflow_backend.service;


import com.taskflow.taskflow_backend.dto.LoginRequest;
import com.taskflow.taskflow_backend.dto.RegisterRequest;
import com.taskflow.taskflow_backend.entity.User;
import com.taskflow.taskflow_backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Optional;



@Service
public class AuthService {


    private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;



     public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;

}





    // REGISTER

    public User register(RegisterRequest request) {


        User user = new User();


        user.setName(request.getName());

        user.setEmail(request.getEmail());

       user.setPassword(
        passwordEncoder.encode(request.getPassword())
);

        user.setRole("USER");



        return userRepository.save(user);

    }







    // LOGIN

    public User login(LoginRequest request) {


        Optional<User> user = userRepository.findByEmail(
                request.getEmail()
        );


        if(user.isPresent()) {


            User existingUser = user.get();


            if(passwordEncoder.matches(
        request.getPassword(),
        existingUser.getPassword()
)) {


                return existingUser;

            }

        }



        throw new RuntimeException(
                "Invalid email or password"
        );


    }



}