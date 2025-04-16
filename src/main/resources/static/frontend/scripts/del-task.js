function bindDeleteButtonEvents() {
    $('#taskContainer').on('click', '.delete-btn', function () {
        const taskId = $(this).data('id');
        console.log('Open modal for task:', taskId);
        openDeleteModal(taskId);
    });
}

$(document).ready(function () {
    // Load the delete modal into the container
    $('#delete-modal-container').load('/frontend/del-task.html', function () {
        console.log('Delete modal loaded.');
        bindDeleteButtonEvents(); // Bind after loading modal
    });
});

function openDeleteModal(taskId) {
    console.log('Open modal for task:', taskId);
    const $modal = $('#delete-task-modal');
    $modal.removeClass('hidden').addClass('flex');
    $modal.data('task-id', taskId);
}

$(document).on('click', '#confirm-delete-btn', function () {
    const taskId = $('#delete-task-modal').data('task-id');

    $.ajax({
        url: `/tasks/${taskId}`,
        type: 'DELETE',
        success: () => {
            $('#delete-task-modal').addClass('hidden').removeClass('flex');
            fetchAndRenderTasks(); // Refresh
        },
        error: (err) => {
            console.error('Delete failed:', err);
        }
    });
});

$(document).on('click', '[data-modal-hide="delete-task-modal"]', function () {
    $('#delete-task-modal').addClass('hidden').removeClass('flex');
});