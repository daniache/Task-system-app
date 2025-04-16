$(document).ready(function () {
    // Load modal HTML into placeholder
    $.get('/frontend/edit-task.html?v=' + Date.now(), function (html) {
        $('#edit-modal-container').html(html);

        if (typeof window.initFlowbite === 'function') {
            initFlowbite();
        }

        // Toggle between full edit and status-only
        $(document).on('change', '#editAll, #editStatus', function () {
            const showAll = $('#editAll').is(':checked');
            $('.all-field').toggle(showAll);
        });

        // Handle Save
        $(document).on('submit', '#edit-task-form', function (e) {
            e.preventDefault();

            const taskId = $('#edit-task-modal').data('task-id');
            const isFullEdit = $('#editAll').is(':checked');

            if (isFullEdit) {
                const updatedTask = {
                    caseNumber: $('#edit-caseNumber').val(),
                    title: $('#edit-title').val(),
                    description: $('#edit-description').val(),
                    status: $('#edit-status').val(),
                    dueDateTime: $('#edit-dueDate').val() + 'T00:00:00'
                };

                $.ajax({
                    url: `/tasks/${taskId}`,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedTask),
                    success: function () {
                        $('#edit-task-modal').addClass('hidden').removeClass('flex');

                        // Remove from list if status becomes "Completed"
                        if (updatedTask.status === 'Completed') {
                            $(`.edit-btn[data-id="${taskId}"]`).closest('.task-card').remove();
                        }

                        fetchAndRenderTasks();
                    },
                    error: function (err) {
                        console.error('Update failed:', err);
                    }
                });
            } else {
                const statusOnly = {
                    status: $('#edit-status').val()
                };

                $.ajax({
                    url: `/tasks/${taskId}/status`,
                    method: 'PATCH',
                    contentType: 'application/json',
                    data: JSON.stringify(statusOnly),
                    success: function () {
                        $('#edit-task-modal').addClass('hidden').removeClass('flex');

                        if (statusOnly.status === 'Completed') {
                            $(`.edit-btn[data-id="${taskId}"]`).closest('.task-card').remove();
                        }

                        fetchAndRenderTasks();
                    },
                    error: function (err) {
                        console.error('Status update failed:', err);
                    }
                });
            }
        });
    });
});

// Open modal + populate form
$(document).on('click', '.edit-btn', function () {
    const taskId = $(this).data('id');

    $.get(`/tasks/${taskId}`, function (task) {
        $('#edit-task-modal').data('task-id', task.id);
        $('#edit-caseNumber').val(task.caseNumber);
        $('#edit-title').val(task.title);
        $('#edit-description').val(task.description);
        $('#edit-status').val(task.status);
        $('#edit-dueDate').val(new Date(task.dueDateTime).toISOString().split('T')[0]);

        $('#edit-task-modal').removeClass('hidden').addClass('flex');
    });
});

// Close modal
$(document).on('click', '[data-modal-hide="edit-task-modal"]', function () {
    $('#edit-task-modal').addClass('hidden').removeClass('flex');
});
