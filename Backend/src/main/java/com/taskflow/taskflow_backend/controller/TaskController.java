package com.taskflow.taskflow_backend.controller;


import com.taskflow.taskflow_backend.entity.Task;
import com.taskflow.taskflow_backend.entity.User;
import com.taskflow.taskflow_backend.repository.UserRepository;
import com.taskflow.taskflow_backend.service.TaskService;


import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {



    private final TaskService taskService;

    private final UserRepository userRepository;




    public TaskController(
            TaskService taskService,
            UserRepository userRepository
    ) {

        this.taskService = taskService;
        this.userRepository = userRepository;

    }








    // GET USER TASKS

    @GetMapping
    public List<Task> getAllTasks(
            @RequestHeader("userEmail") String email
    ) {


        User user = userRepository
                .findByEmail(email)
                .orElseThrow();



        return taskService.getTasksByUser(user);

    }









    // CREATE TASK

    @PostMapping
    public Task createTask(
            @RequestBody Task task,
            @RequestHeader("userEmail") String email
    ) {


        User user = userRepository
                .findByEmail(email)
                .orElseThrow();



        return taskService.createTask(
                task,
                user
        );

    }









    // UPDATE TASK

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task,
            @RequestHeader("userEmail") String email
    ) {


        User user = userRepository
                .findByEmail(email)
                .orElseThrow();




        return taskService.updateTask(
                id,
                task,
                user
        );

    }









    // DELETE TASK

    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id,
            @RequestHeader("userEmail") String email
    ) {


        User user = userRepository
                .findByEmail(email)
                .orElseThrow();




        taskService.deleteTask(
                id,
                user
        );

    }



}