let allTasks = [];

async function fetchAndRenderTasks() {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();

        // Keep all tasks in memory (excluding completed)
        allTasks = tasks.filter(task => task.status !== 'Completed');

        // Apply initial filters
        applyFilters();
    } catch (err) {
        console.error('Error loading tasks:', err);
    }
}

function applyFilters() {
    const searchValue = $('#searchInput').val()?.toLowerCase() || '';
    const sortBy = $('#sortBy').val();

    let filtered = allTasks.filter(task =>
        task.title.toLowerCase().includes(searchValue) ||
        (task.description && task.description.toLowerCase().includes(searchValue))
    );

    switch (sortBy) {
        case 'title-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'due-asc':
            filtered.sort((a, b) => new Date(a.dueDateTime) - new Date(b.dueDateTime));
            break;
        case 'due-desc':
            filtered.sort((a, b) => new Date(b.dueDateTime) - new Date(a.dueDateTime));
            break;
    }

    renderTaskCards(filtered);
}

function renderTaskCards(tasks) {
    const container = document.getElementById('taskContainer');
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = '<p class="text-gray-600">No tasks found.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskCard = `
            <div class="bg-white shadow-md p-4 rounded-lg border mb-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-semibold">${task.title}</h3>
                        <p class="text-sm text-gray-500">Case #${task.caseNumber} - Due: ${new Date(task.dueDateTime).toLocaleDateString()}</p>
                        <p class="text-sm mt-1">Description: ${task.description || 'No description available.'}</p>
                        <div class="mt-3 flex gap-2 items-center flex-wrap">
                            <label class="text-sm font-medium">Priority:</label>
                            <select class="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded" onchange="updatePriority(this)">
                                <option ${task.priority === 'High' ? 'selected' : ''}>High</option>
                                <option ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                                <option ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                            </select>
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">${task.status}</span>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-10 text-lg text-gray-600">
                        <button class="view-task-btn" data-task-id="${task.id}" title="View"><i class="fas fa-eye hover:text-blue-600"></i></button>
                        <button class="edit-btn" data-id="${task.id}" title="Edit"><i class="fas fa-edit hover:text-green-600"></i></button>
                        <button class="delete-btn" data-id="${task.id}" title="Delete"><i class="fas fa-trash hover:text-red-600"></i></button>
                    </div>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', taskCard);
    });
}

function updatePriority(selectEl) {
    const value = selectEl.value;
    selectEl.className = 'text-sm px-2 py-1 rounded';
    if (value === 'High') {
        selectEl.classList.add('bg-red-100', 'text-red-700');
    } else if (value === 'Medium') {
        selectEl.classList.add('bg-orange-100', 'text-orange-700');
    } else {
        selectEl.classList.add('bg-green-100', 'text-green-700');
    }
}

function toggleMenuDropdown() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.classList.toggle("hidden");
}

window.addEventListener('click', function (e) {
    const dropdown = document.getElementById("menuDropdown");
    if (!e.target.closest('#menuDropdown') && !e.target.closest('button[onclick="toggleMenuDropdown()"]')) {
        dropdown.classList.add('hidden');
    }
});

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    fetchAndRenderTasks();

    $('#searchInput').on('input', applyFilters);
    $('#sortBy').on('change', applyFilters);
});
