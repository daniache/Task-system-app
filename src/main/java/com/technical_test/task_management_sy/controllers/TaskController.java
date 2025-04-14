package com.technical_test.task_management_sy.controllers;

import com.technical_test.task_management_sy.models.Task;
import com.technical_test.task_management_sy.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
   private TaskService taskService;

   @GetMapping("/all")
   public ResponseEntity<List<Task>> getAllTasks (){
       List<Task> allTasks = taskService.getAllTasks();
       return ResponseEntity.ok(allTasks);
   }

   @GetMapping("/id")
   public ResponseEntity<Task>getTaskById(@PathVariable Long id) {
       Task taskId = taskService.getTaskById(id);
       /*if (taskId == null) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
       }*/
       return ResponseEntity.ok(taskId);
   }

   @PostMapping("/create")
    public  ResponseEntity<Task> createTask(@RequestBody Task tasks) {
       Task createdTask =  taskService.createTask(tasks);
       return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
   }
}