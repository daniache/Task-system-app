$(document).ready(function () {
    // Load the modal HTML fragment
    $('#modal-container').load('/frontend/add-task.html', function () {
        // Reinitialize Flowbite after loading the modal
        if (typeof initFlowbite === 'function') {
            initFlowbite();
        } else {
            console.warn('Flowbite not initialized.');
        }
    });
});