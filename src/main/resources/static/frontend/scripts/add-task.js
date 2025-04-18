$(document).ready(function () {
    // Attach form submit listener AFTER the modal is loaded
    $('#modal-container').load('/frontend/add-task.html', function () {
        if (typeof initFlowbite === 'function') initFlowbite();

        // Submit logic
        $('#addTaskForm').on('submit', function (event) {
            event.preventDefault(); // Prevent default form submit

            const taskData = {
                caseNumber: $('#caseNumber').val(),
                title: $('#title').val(),
                description: $('#description').val(),
                status: $('#status').val(),
                dueDateTime: $('#dueDate').val() + "T00:00:00"
            };

            $.ajax({
                url: '/tasks',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(taskData),
                success: function (response) {
                    console.log('Task added:', response);
                    location.reload(); //  Reloads the entire page
                    $('#add-task-modal').addClass('hidden').removeClass('flex');
                    $('#addTaskForm')[0].reset(); // clear form
                },
                error: function (xhr) {
                    console.error('Error adding task:', xhr.responseText);
                    alert('Failed to add task.');
                }
            });
        });
    });
});

