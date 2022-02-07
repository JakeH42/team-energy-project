let taskManagerClass = new TaskManager;
taskManagerClass.load();
taskManagerClass.render();

const dateElement = document.querySelector('#current-date');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = 'Today\'s Date: ' + dd + '/' + mm + '/' + yyyy;
dateElement.innerText = today;

const taskTitle = document.querySelector('#task-title');
const taskDesc = document.querySelector('#task-description');
const assignTo = document.querySelector('#task-assignee');
const taskDueDate = document.querySelector('#task-due-date');
const taskStatus = document.querySelector('#selectTaskStatus');
const submitButton = document.querySelector('#submit-task-button');
const resetButton = document.querySelector('#reset-form');

const removeNotification = () => {
    let submittedSuccess = document.getElementById('submitted');
    submittedSuccess.classList.add("remove");
};
const removeNotificationClass = () => {
    let submittedSuccess = document.getElementById('submitted');
    submittedSuccess.classList.remove("remove");
    submittedSuccess.innerHTML = '';
};

const resetFields = () => {
    taskTitle.value = '';
    taskDesc.value = '';
    assignTo.value = '';
    taskDueDate.value = '';
    taskStatus.value = '';
    submitButton.value = '';
    taskTitle.classList.remove("is-valid");
    taskDesc.classList.remove("is-valid");
    assignTo.classList.remove("is-valid");
    taskDueDate.classList.remove("is-valid");
    taskStatus.classList.remove("is-valid");
}

const validFormFieldInput = (data) => {

    let numOfErrors = 0;

    data.preventDefault();

    const titleError = document.querySelector('#task-title-invalid');
    if(taskTitle.value.length <= 5) {
        taskTitle.classList.add("is-invalid");
        taskTitle.classList.remove("is-valid");
        titleError.innerText = 'Title requires more than 5 characters';
        numOfErrors++
    } else {
        taskTitle.classList.add("is-valid");
        taskTitle.classList.remove("is-invalid");
        titleError.innerText = '';
    }

    const descError = document.querySelector('#task-description-invalid');
    if(taskDesc.value.length <= 5) {
        taskDesc.classList.add("is-invalid");
        taskDesc.classList.remove("is-valid");
        descError.innerText = 'Description requires more than 5 characters';
        numOfErrors++
    } else {
        taskDesc.classList.add("is-valid");
        taskDesc.classList.remove("is-invalid");
        descError.innerText = '';
    }
    
    const assigneeError = document.querySelector('#task-assignee-invalid');
    if(assignTo.value.length <= 5) {
        assignTo.classList.add("is-invalid");
        assignTo.classList.remove("is-valid");
        assigneeError.innerText = 'Assignee requires more than 5 characters';
        numOfErrors++
    } else {
        assignTo.classList.add("is-valid");
        assignTo.classList.remove("is-invalid");
        assigneeError.innerText = '';
    }

    const dueDateError = document.querySelector('#task-due-date-invalid');
    if(taskDueDate.value.length <= 9) {
        taskDueDate.classList.add("is-invalid");
        taskDueDate.classList.remove("is-valid");
        dueDateError.innerText = 'Date required';
        numOfErrors++
    } else if(taskDueDate.value.length === 10) {
        taskDueDate.classList.add("is-valid");
        taskDueDate.classList.remove("is-invalid");
        dueDateError.innerText = '';
    }

    const oSel = document.getElementById("selectTaskStatus")

    oSel.addEventListener('change',function(e){
        let value = this.value;
    })

    let optval = oSel.options[oSel.options.selectedIndex].value;
    const statusError = document.querySelector('#task-status-invalid');
    if(optval === '') {
        taskStatus.classList.add("is-invalid");
        taskStatus.classList.remove("is-valid");
        statusError.style.display = 'block';
        statusError.innerText = 'Status required';
        numOfErrors++
    } else if(optval !== '') {
        taskStatus.classList.add("is-valid");
        taskStatus.classList.remove("is-invalid");
        statusError.innerText = '';
    }

    
    if(numOfErrors === 0) {
        taskManagerClass.addTask(taskTitle.value, taskDesc.value, assignTo.value, taskDueDate.value, taskStatus.value);
        taskManagerClass.save();
        taskManagerClass.render();
        let submittedSuccess = document.getElementById('submitted');
        submittedSuccess.innerHTML = 'Task Submitted <i class="bi bi-check-circle"></i>';
        setTimeout(removeNotification, 3000)
        setTimeout(removeNotificationClass, 6000)
        resetFields();
    } else if(numOfErrors > 0) {
        return; // Returns nothing
    }
}

submitButton.addEventListener("click", validFormFieldInput);
resetButton.addEventListener("click", resetFields);

let taskListContainer = document.querySelector('#input-added-task');

taskListContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('done-button')) {
        let taskParentElement = event.target.parentElement.parentElement.parentElement.parentElement;
        const taskId = Number(taskParentElement.dataset.taskId);
        let task = taskManagerClass.getTaskById(taskId);
        task.task.status = 'done';
        taskManagerClass.save();
        taskManagerClass.render();
        console.log(task.task);
        task.classList.add("remove");
    }

    if(event.target.classList.contains('delete-button')) {
        let taskParentElement = event.target.parentElement.parentElement.parentElement.parentElement;
        const taskId = Number(taskParentElement.dataset.taskId);
        taskManagerClass.deleteTask(taskId);
        taskManagerClass.save();
        taskManagerClass.render();
    }
});

// let taskHTML = createTaskHtml('Add Bacon', 'This is the description', 'Lucas', '01/06/2022', 'In Progress');
// console.log(taskHTML);
// console.log(taskManagerClass.tasks);
// taskManagerClass.addTask('Add Bacon', 'hdjgjehfjvnsnfbsnfnsnf', 'Lucas', '01/06/2022', 'In Progress');
// taskManagerClass.addTask('Add Beef', 'poiuytrewq', 'Robert', '01/09/2022', 'Done');
//console.log(taskManagerClass.tasks);



