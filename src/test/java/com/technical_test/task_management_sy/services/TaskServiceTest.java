package com.technical_test.task_management_sy.services;

import com.technical_test.task_management_sy.models.Task;
import com.technical_test.task_management_sy.repository.TaskSyRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TaskServiceTest {

    private TaskSyRepo taskSyRepo; // Mocked repository
    private TaskService taskService; // Service under test
    @BeforeEach
    void setUp() {
        // Create a mock of TaskSyRepo using Mockito
        taskSyRepo = Mockito.mock(TaskSyRepo.class);

        // Manually instantiate TaskService and inject the mock repo using reflection
        taskService = new TaskService() {{

            try {
                // Access and set the private field 'taskSyRepo' in the service
                var field = TaskService.class.getDeclaredField("taskSyRepo");
                field.setAccessible(true);
                field.set(this, taskSyRepo);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }};
    }

    @Test
    void testUpdateStatus_success() {
        // Arrange (Setup)
        Long taskId = 1L;
        String newStatus = "Completed";

        // Create a fake existing task
        Task existingTask = new Task();
        existingTask.setId(taskId);
        existingTask.setTitle("Test task");
        existingTask.setStatus("Pending");

        // Defines how the mock should behave: return the existing task when findById is called
        when(taskSyRepo.findById(taskId)).thenReturn(Optional.of(existingTask));
        // defines what happens when save is called (return the same task for simplicity)
        when(taskSyRepo.save(any(Task.class))).thenReturn(existingTask);
        // Act (Call the actual method that is being tested)
        Task updatedTask = taskService.updateStatus(taskId, newStatus);

        // Assert (Check results)
        assertNotNull(updatedTask); // Make sure the returned task is not null
        assertEquals(newStatus, updatedTask.getStatus()); // Status should be updated

        // Verify that save was indeed called with the updated task
        verify(taskSyRepo).save(existingTask);
    }
}
