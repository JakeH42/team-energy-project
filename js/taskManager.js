let createTaskHtml = (name, description, assignedTo, dueDate, status) => {

    let listHTML = `<li class="list-group-item">
        <div class="row">
            <div class="col-8">
                <h3 class="task-title">${name}</h3>
                <div class="assign-task">Assign to: <span class="assignee-name">${assignedTo}</span></div>
                <div class="task-due-date">Due Date: <span class="date-due">${dueDate}</span></div>
            </div>
            <div class="col-4 card-status">
                <form>
                    <div class="form-group">
                        <label for="task-status">Status</label>
                        <select class="form-control" id="cardTaskStatus">
                            <option disabled value="">Select status</option>
                            <option value="to do">To Do</option>
                            <option value="review">Review</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </form>
                <button type="button" class="btn btn-info btn-sm" id="edit-task-button" data-toggle="modal" data-target="#edit-task-modal"><i class="bi-pencil"></i> Edit</button>
                <button type="button" class="btn btn-danger btn-sm"><i class="bi-trash"></i> Delete</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <p>
                    <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#beef-patty-description" aria-expanded="false" aria-controls="collapseExample">
                    Description <i class="bi-chevron-down"></i> 
                    </button>
                </p>
                <div class="collapse" id="task-description">
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
            let currentTask = this.tasks[task];
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const taskHtml = createTaskHtml(
                currentTask.name,
                currentTask.description,
                currentTask.assignedTo,
                formattedDate,
                currentTask.status
            );
            tasksHtmlList.push(taskHtml);
        }

        let tasksHtml = tasksHtmlList.join('\n');

        let inputAddedTask = document.getElementById('input-added-task');
        inputAddedTask.innerHTML = tasksHtml;
    }
}

