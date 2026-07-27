package com.taskflow.taskflow_backend.dto;


import com.taskflow.taskflow_backend.entity.User;


public class UserResponseDTO {


    private Long id;

    private String name;

    private String email;

    private String role;



    public UserResponseDTO(User user){

        this.id = user.getId();

        this.name = user.getName();

        this.email = user.getEmail();

        this.role = user.getRole();

    }



    public Long getId() {
        return id;
    }


    public String getName() {
        return name;
    }


    public String getEmail() {
        return email;
    }


    public String getRole() {
        return role;
    }

}