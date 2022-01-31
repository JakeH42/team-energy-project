let createTaskHtml = (name, description, assignedTo, dueDate, status, descId, id) => {

    let listHTML = `<li class="list-group-item" data-task-id="${id}">
        <div class="row">
            <div class="col-8">
                <h3 class="task-title">${name}</h3>
                <div class="assign-task">Assign to: <span class="assignee-name">${assignedTo}</span></div>
                <div class="task-due-date">Due Date: <span class="date-due">${dueDate}</span></div>
            </div>
            <div class="col-4 card-status">
                <div class="row">
                    <div class="current-task-status">${status}</div>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-success btn-block done-button"><i class="bi bi-check-circle"></i> Done</button>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-info btn-sm" id="edit-task-button" data-toggle="modal" data-target="#edit-task-modal"><i class="bi-pencil"></i> Edit</button>
                    <button type="button" class="btn btn-danger btn-sm"><i class="bi-trash"></i> Delete</button>
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
                    <div class="card card-body">
                        ${description}
                    </div>
                </div>
            </div>
        </div>
    </li>`

    return listHTML;
};

class TaskManager {

    currentId;

    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }

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

    render() {
        let tasksHtmlList = [];

        let taskNumber = this.tasks.length;
        for(let task = 0; task < taskNumber; task++ ) {
            const currentTask = this.tasks[task];
            const date = new Date(currentTask.task.dueDate);
            const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const descriptionId = `task-description${task}`;
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

    getTaskById(taskId) {
        let foundTask;

        let taskNumber = this.tasks.length;
        for(let i = 0; i < taskNumber; i++ ) {
            const currentTask = this.tasks[i];
            const currentTaskId = currentTask.i.id;
            if(currentTaskId === taskId) {
                foundTask = currentTask;
            }

            return foundTask;
        }
    }
}

