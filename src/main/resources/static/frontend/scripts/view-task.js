$(document).ready(function () {
    // Load view-task modal HTML on page load
    $('#view-modal-container').load('/frontend/view-task.html?v=' + Date.now(), function () {
        if (typeof initFlowbite === 'function') initFlowbite();

        // Delegate click events for dynamically created view icons
        $('#taskContainer').on('click', '.view-task-btn', function () {
            const taskId = $(this).data('task-id');
            openViewModal(taskId);
        });
    });

// Function to load task details and show the modal
function openViewModal(taskId) {
    $.get(`/tasks/${taskId}`, function (task) {
        $('#view-task-modal .case-number').text(task.caseNumber);
        $('#view-task-modal .task-title').text(task.title);
        $('#view-task-modal .task-desc').text(task.description);
        $('#view-task-modal .task-status').text(task.status);
        $('#view-task-modal .task-due').text(new Date(task.dueDateTime).toLocaleDateString());

        // Manually show the modal
        $('#view-task-modal').removeClass('hidden').addClass('flex');
    });
}
    $(document).on('click', '[data-modal-hide="view-task-modal"]', function () {
    $('#view-task-modal').addClass('hidden').removeClass('flex');
});
});

