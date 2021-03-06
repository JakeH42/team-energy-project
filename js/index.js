//Initiate the TaskManger class
let taskManagerClass = new TaskManager;
taskManagerClass.load();
taskManagerClass.render();

//Set the current date
const dateElement = document.querySelector('#current-date');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

//Format the date into dd/mm/yyyy
today = 'Today\'s Date: ' + dd + '/' + mm + '/' + yyyy;
dateElement.innerText = today;

//Get the app elements
const taskTitle = document.querySelector('#task-title');
const taskDesc = document.querySelector('#task-description');
const assignTo = document.querySelector('#task-assignee');
const taskDueDate = document.querySelector('#task-due-date');
const taskStatus = document.querySelector('#selectTaskStatus');
const submitButton = document.querySelector('#submit-task-button');
const resetButton = document.querySelector('#reset-form');

//Show then remove the 'task submitted' notification
const removeNotification = () => {
    let submittedSuccess = document.getElementById('submitted');
    submittedSuccess.classList.add("remove");
};
const removeNotificationClass = () => {
    let submittedSuccess = document.getElementById('submitted');
    submittedSuccess.classList.remove("remove");
    submittedSuccess.innerHTML = '';
};

//Reset the form fields
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

//Conditional logic to validate the form fields and return the number of errors
const validFormFieldInput = (data) => {

    let numOfErrors = 0;

    data.preventDefault();

    //Check to see if title has less than 5 characters
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

    //Check to see if description has less than 5 characters
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
    
    //Check to see if asignee name has less than 5 characters
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

    //Check to see if date has 10 characters
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

    //Check to see that the user has selected a status option
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

    //If there's no errors, submit the form field values to be stored as an object, which is then stored in an array
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

//Call validation function on sumbit button
submitButton.addEventListener("click", validFormFieldInput);

//Call reset fields function on reset button
resetButton.addEventListener("click", resetFields);

//Call reset fields function on reset button
let taskListContainer = document.querySelector('#input-added-task');

//Done and delete button
taskListContainer.addEventListener('click', (event) => {

    //Update status of selected task to 'Done'
    if(event.target.classList.contains('done-button')) {
        let taskParentElement = event.target.parentElement.parentElement.parentElement.parentElement;
        const taskId = Number(taskParentElement.dataset.taskId);
        let task = taskManagerClass.getTaskById(taskId);
        task.task.status = 'done';
        taskManagerClass.save();
        taskManagerClass.render();
    }

    //Call the task manger method to delete the selected task
    if(event.target.classList.contains('delete-button')) {
        let taskParentElement = event.target.parentElement.parentElement.parentElement.parentElement;
        const taskId = Number(taskParentElement.dataset.taskId);
        taskManagerClass.deleteTask(taskId);
        taskManagerClass.save();
        taskManagerClass.render();
    }
});



