package com.technical_test.task_management_sy.services;

import com.technical_test.task_management_sy.repository.TaskSyRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import com.technical_test.task_management_sy.models.Task;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class TaskService {

    @Autowired
    private TaskSyRepo taskSyRepo;

    public List<Task> getAllTasks() {
        log.info("Fetching all tasks");
        return taskSyRepo.findAll();
    }

    public Task getTaskById(Long id) {
        return taskSyRepo.findById(id).orElse(null);
    }

    public Task createTask (Task tasks){
        log.info("Adding Task");
        return taskSyRepo.save(tasks);
    }

    public Task updateTask (Long id, Task upTasks) {
        upTasks.setId(id);
        return taskSyRepo.save(upTasks);
    }

    public Task updateStatus(Long id, String status) {
        Task task = taskSyRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return taskSyRepo.save(task);
    }

    public void deleteTask(Long id){
        taskSyRepo.deleteById(id);
    }
}
