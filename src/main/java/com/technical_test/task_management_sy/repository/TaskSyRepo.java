package com.technical_test.task_management_sy.repository;

import com.technical_test.task_management_sy.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskSyRepo extends JpaRepository<Task, Long> {

}
