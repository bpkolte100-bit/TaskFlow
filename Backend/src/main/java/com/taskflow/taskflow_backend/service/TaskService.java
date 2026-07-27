package com.taskflow.taskflow_backend.service;


import com.taskflow.taskflow_backend.entity.Task;
import com.taskflow.taskflow_backend.entity.User;
import com.taskflow.taskflow_backend.repository.TaskRepository;

import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class TaskService {


    private final TaskRepository taskRepository;



    public TaskService(TaskRepository taskRepository) {

        this.taskRepository = taskRepository;

    }





    // Get tasks of logged-in user

    public List<Task> getTasksByUser(User user) {

        return taskRepository.findByUser(user);

    }







    // Create task for logged-in user

    public Task createTask(
            Task task,
            User user
    ) {

        task.setUser(user);

        return taskRepository.save(task);

    }







    // Update task only if user owns it

    public Task updateTask(
            Long id,
            Task updatedTask,
            User user
    ) {


        Task task = taskRepository.findById(id)
                .orElseThrow();



        if(!task.getUser()
                .getId()
                .equals(user.getId())) {


            throw new RuntimeException(
                    "You cannot update this task"
            );

        }





        task.setTitle(
                updatedTask.getTitle()
        );


        task.setDescription(
                updatedTask.getDescription()
        );


        task.setDueDate(
                updatedTask.getDueDate()
        );


        task.setPriority(
                updatedTask.getPriority()
        );


        task.setStatus(
                updatedTask.getStatus()
        );



        return taskRepository.save(task);

    }







    // Delete task only if user owns it

    public void deleteTask(
            Long id,
            User user
    ) {


        Task task = taskRepository.findById(id)
                .orElseThrow();




        if(!task.getUser()
                .getId()
                .equals(user.getId())) {


            throw new RuntimeException(
                    "You cannot delete this task"
            );

        }



        taskRepository.delete(task);

    }


}