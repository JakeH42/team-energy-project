// Create the task html structure
let createTaskHtml = (name, description, assignedTo, dueDate, status, descId, id) => {

    let listHTML = `<li class="list-group-item ${status}" data-task-id="${id}">
        <div class="row">
            <div class="col-8">
                <h3 class="task-title">${name}</h3>
                <div class="assign-task">Assign to: <span class="assignee-name">${assignedTo}</span></div>
                <div class="task-due-date">Due Date: <span class="date-due">${dueDate}</span></div>
            </div>
            <div class="col-4 card-status">
                <div class="row">
                    <div class="current-task-status"><strong>Status: </strong>${status}</div>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-success btn-block done-button"><i class="bi bi-check-circle"></i> Mark as Done</button>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-info btn-sm" id="edit-task-button" data-toggle="modal" data-target="#edit-task-modal"><i class="bi-pencil"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-sm delete-button"><i class="bi-trash"></i> Delete</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <p>
                    <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#${descId}" aria-expanded="false" aria-controls="collapseExample">
                        Description <i class="bi-chevron-down"></i> 
                    </button>
                </p>
                <div class="collapse" id="${descId}">
                    <div class="card card-body description-body">
                        ${description}
                    </div>
                </div>
            </div>
        </div>
    </li>`

    return listHTML;
};

// Create a class to mange the tasks
class TaskManager {

    currentId;

    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }

    // Add the task to the tasks array
    addTask(name, description, assignedTo, dueDate, status) {
        let task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }

        this.tasks.push({task});
    } 

    //Render the task ready to be formatted into HTML
    render() {
        let tasksHtmlList = [];
        let taskNumber = this.tasks.length;
        for(let i = 0; i < taskNumber; i++ ) {
            const currentTask = this.tasks[i];
            const date = new Date(currentTask.task.dueDate);
            const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const descriptionId = `task-description${i}`;
            const taskId = currentTask.task.id;
            const taskHtml = createTaskHtml(
                currentTask.task.name,
                currentTask.task.description,
                currentTask.task.assignedTo,
                formattedDate,
                currentTask.task.status,
                descriptionId,
                taskId
            );
            tasksHtmlList.push(taskHtml);
        }

        let tasksHtml = tasksHtmlList.join('\n');

        let inputAddedTask = document.getElementById('input-added-task');
        inputAddedTask.innerHTML = tasksHtml;
    }

    //Get the tasks ID
    getTaskById(taskId) {
        let foundTask;
        let taskNumber = this.tasks.length;
        for(let thisTask = 0; thisTask < taskNumber; thisTask++ ) {
            const currentTask = this.tasks[thisTask];
            const currentTaskId = currentTask.task.id;
            if(taskId === currentTaskId) {
                foundTask = currentTask;
            } 
        }
        return foundTask;
    }

    //Save the tasks and task ID to the local storage
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", tasksJson);
        const currentId = JSON.stringify(this.currentId);
        localStorage.setItem("currentId", currentId);
    }

    //Load the tasks and task ID from the local storage and convert into html from string
    load() {
        if (localStorage.getItem("tasks")) {
            const tasksJson = localStorage.getItem("tasks");
            this.tasks = JSON.parse(tasksJson);
        }
      
        if (localStorage.getItem("currentId")) {
            const currentId = localStorage.getItem("currentId");
            this.currentId = Number(currentId);
        }
    }

    //Remove a task from the array
    deleteTask(taskId) {
        const newTasks = [];
        let taskNumber = this.tasks.length;
        for(let i = 0; i < taskNumber; i++ ) {
            const task = this.tasks[i];
            const currentTaskId = task.task.id;
            // console.log('Input Task ID', currentTaskId)
            // console.log('Current Task ID', currentTaskId)
            if(currentTaskId != taskId) {
                newTasks.push(task);
            }
        }
        //Reset the tasks array to the newly created array (without the task we want to delete)
        this.tasks = newTasks;
    }
}

