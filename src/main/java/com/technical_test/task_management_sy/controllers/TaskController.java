package com.technical_test.task_management_sy.controllers;

import com.technical_test.task_management_sy.models.Task;
import com.technical_test.task_management_sy.services.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
   private TaskService taskService;

   @GetMapping
   public ResponseEntity<List<Task>> getAllTasks (){
       List<Task> allTasks = taskService.getAllTasks();
       return ResponseEntity.ok(allTasks);
   }

   @GetMapping("/{id}")
   public ResponseEntity<Task>getTaskById(@PathVariable Long id) {
       Task taskId = taskService.getTaskById(id);
       if (taskId == null) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
       }
       return ResponseEntity.ok(taskId);
   }

   @PostMapping
    public  ResponseEntity<Task> createTask(@Valid @RequestBody Task tasks) {
       Task createdTask =  taskService.createTask(tasks);
       return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
   }

   @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,@Valid @RequestBody Task upTask){
       Task updatedTask = taskService.updateTask(id, upTask);
       return ResponseEntity.ok(updatedTask);
   }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id,@Valid @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        Task updatedStautusTask = taskService.updateStatus(id, newStatus);
        return ResponseEntity.ok(updatedStautusTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
       taskService.deleteTask(id);
       return ResponseEntity.noContent().build();
   }
}