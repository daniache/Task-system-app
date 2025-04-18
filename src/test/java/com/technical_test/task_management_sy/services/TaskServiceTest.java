package com.technical_test.task_management_sy.services;

import com.technical_test.task_management_sy.models.Task;
import com.technical_test.task_management_sy.repository.TaskSyRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class TaskServiceTest {

    @Mock
    // simulates behaviour/creates a mock version of your database to test the logic
    private TaskSyRepo taskSyRepo;
    @InjectMocks
    // creates an instance of TaskService and automatically injects the mocked taskRepository into it
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        //initialises the @Mock and @InjectMocks annotations before each test runs
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getTaskById() {
        //create an instance/obj of the Task class
        Task tgID = new Task();
        // expected data that should be returned when the method is tested.
        tgID.setId(2L);
        tgID.setTitle("Case Evidence");

        //If findById(2L) is called, return Optional.of(tgID)
        when(taskSyRepo.findById(2L)).thenReturn(Optional.of(tgID));

        //Testing actual method
        Task result = taskService.getTaskById(2L);
        //checks that the service did return a task, and not null
        assertNotNull(result);
        //checks that the title of the returned task is exactly "Case Evidence"
        assertEquals("Case Evidence", result.getTitle());
    }

    @Test
    void createTask() {
        Task ctask = new Task();
        ctask.setTitle("New Case");
        ctask.setDescription("Murder Case of a teenager in Central London");

        //save ctask
        when(taskSyRepo.save(ctask)).thenReturn(ctask);

        Task result = taskService.createTask(ctask);
        assertNotNull(result);
        assertEquals("New Case", result.getTitle());
        assertEquals("Murder Case of a teenager in Central London", result.getDescription());
    }

    @Test
    void updateTask() {
        //dummy task object to simulate an existing task
        Task existingTask = new Task();
        existingTask.setId(1L);
        existingTask.setTitle("Close Case");
        existingTask.setDescription("Updated description");
        existingTask.setCaseNumber("ABC123");
        existingTask.setStatus("In Progress");
        existingTask.setDueDateTime(LocalDateTime.now());

        //simulates the save operation succeeding and returning the updated task
        when(taskSyRepo.save(existingTask)).thenReturn(existingTask);

        //call the actual method
        Task result = taskService.updateTask(1L, existingTask);

        assertNotNull(result);
        assertEquals("Close Case", result.getTitle());
        assertEquals("Updated description", result.getDescription());
    }

    @Test
    void updateStatus() {
        Task sTask = new Task();
        sTask.setId(5L);
        sTask.setStatus("On-Hold");

        when(taskSyRepo.findById(5L)).thenReturn(Optional.of(sTask));
        when(taskSyRepo.save(sTask)).thenReturn(sTask);

        Task result = taskService.updateStatus(5L,"In Progress");
        assertEquals("In Progress", result.getStatus());
    }
}