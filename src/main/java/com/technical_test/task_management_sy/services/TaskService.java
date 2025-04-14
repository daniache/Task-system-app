package com.technical_test.task_management_sy.services;

import com.technical_test.task_management_sy.repository.TaskSyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import com.technical_test.task_management_sy.models.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskSyRepo taskSyRepo;

    public List<Task> getAllTasks() {
        return taskSyRepo.findAll();
    }

    public Task getTaskById(Long id) {
        return taskSyRepo.findById(id).orElse(null);
    }

    public Task createTask (Task tasks){
        return taskSyRepo.save(tasks);
    }
}
