let taskManagerClass = new TaskManager;

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

const validFormFieldInput = (data) => {

    let numOfErrors = 0;

    data.preventDefault();

    // console.log(`Title: ${taskTitle.value}, Desc: ${taskDesc.value}, Assignee: ${assignTo.value}, Due Date: ${taskDueDate.value}, Status: ${taskStatus.value}`)

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
        taskManagerClass.render();
        let submittedSuccess = document.getElementById('submitted');
        submittedSuccess.innerHTML = 'Task Submitted <i class="bi bi-check-circle"></i>';
        
        taskTitle.value = '';
        taskDesc.value = '';
        assignTo.value = '';
        taskDueDate.value = '';
        taskStatus.value = '';
        submitButton.value = '';
        // submitButton.addEventListener("submit", removeSubmittedText)

        // let removeSubmittedText = () => {
        //     setTimeout(functionToDisappearInnerHTML(), 3000);
        // }
        
        // let functionToDisappearInnerHTML = () => {
        //     document.getElementById("submitted").innerHTML = ''; //Clears the innerHTML
        // }
        // console.log(taskManagerClass.tasks);
    } else if(numOfErrors > 0) {
        // console.log('Errors')
        return; // Returns nothing
    }
}

submitButton.addEventListener("click", validFormFieldInput);


// let taskHTML = createTaskHtml('Add Bacon', 'This is the description', 'Lucas', '01/06/2022', 'In Progress');
// console.log(taskHTML);
// console.log(taskManagerClass.tasks);
// taskManagerClass.addTask('Add Bacon', 'hdjgjehfjvnsnfbsnfnsnf', 'Lucas', '01/06/2022', 'In Progress');
// taskManagerClass.addTask('Add Beef', 'poiuytrewq', 'Robert', '01/09/2022', 'Done');
//console.log(taskManagerClass.tasks);



