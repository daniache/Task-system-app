<!--Toggle Logic -->
document.addEventListener('DOMContentLoaded', function () {
    const allFields = document.querySelectorAll('.all-field');
    const editAllRadio = document.getElementById('editAll');
    const editStatusRadio = document.getElementById('editStatus');

    function toggleFields() {
        const showAll = editAllRadio.checked;
        allFields.forEach(field => {
            field.style.display = showAll ? 'block' : 'none';
        });
    }

    editAllRadio.addEventListener('change', toggleFields);
    editStatusRadio.addEventListener('change', toggleFields);

    toggleFields();
});

$(document).ready(function () {
    // Load modal HTML
    $.get('/frontend/edit-task.html?v=' + Date.now(), function (html) {
        $('#edit-modal-container').html(html);

        // Re-init Flowbite
        if (typeof window.initFlowbite === 'function') {
            initFlowbite();
        }

        // Toggle logic for status vs all fields
        $('#editAll, #editStatus').on('change', function () {
            const showAll = $('#editAll').is(':checked');
            $('.all-field').toggle(showAll);
        });
    });
});

$(document).on('click', '.edit-btn', function () {
    const taskId = $(this).data('id');

    // Fetch task data
    $.get(`/tasks/${taskId}`, function (task) {
        $('#edit-caseNumber').val(task.caseNumber);
        $('#edit-title').val(task.title);
        $('#edit-description').val(task.description);
        $('#edit-status').val(task.status);
        $('#edit-dueDate').val(new Date(task.dueDateTime).toISOString().split('T')[0]);

        $('#edit-task-modal').removeClass('hidden').addClass('flex');
    });
});

$(document).on('click', '[data-modal-hide="edit-task-modal"]', function () {
    $('#edit-task-modal').addClass('hidden').removeClass('flex');
});