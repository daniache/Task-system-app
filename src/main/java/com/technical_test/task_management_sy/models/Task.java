package com.technical_test.task_management_sy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor


public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, unique = true)
    private String caseNumber;

    @NotBlank (message = "Title is required")
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status;

    @NotNull(message = "Due date/time is required")
    @Column(name = "due_date_time")
    private LocalDateTime dueDateTime;

}
