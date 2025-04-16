$(document).ready(function () {
    // Fetch and render only completed tasks
    $.get('/tasks', function (tasks) {
        const completedTasks = tasks.filter(t => t.status === 'Completed');
        const container = $('#completedTasksContainer');
        container.empty();

        if (completedTasks.length === 0) {
            container.append('<p class="text-gray-600">No completed tasks yet.</p>');
        }

        completedTasks.forEach(task => {
            const card = `
                <div class="bg-white shadow-md p-4 rounded-lg border task-card mb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-semibold">${task.title}</h3>
                            <p class="text-sm text-gray-500">Case #${task.caseNumber} - Due: ${new Date(task.dueDateTime).toLocaleDateString()}</p>
                            <p class="text-sm mt-1">${task.description || 'No description available.'}</p>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm inline-block mt-2">${task.status}</span>
                        </div>
                    </div>
                </div>`;
            container.append(card);
        });
    });
});
