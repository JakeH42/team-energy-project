const dateElement = document.querySelector('#current-date');
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = 'Today\'s Date: ' + dd + '/' + mm + '/' + yyyy;
dateElement.innerText = today;

const validFormFieldInput = (data) => {
    const taskTitle = document.querySelector('#task-title');
    const taskDesc = document.querySelector('#task-description');
    const assignTo = document.querySelector('#task-assignee');
    const taskDueDate = document.querySelector('#task-due-date');
    const taskStatus = document.querySelector('#task-status');

    console.log(`Title: ${taskTitle.value}, Desc: ${taskDesc.value}, Assignee: ${assignTo.value}, Due Date: ${taskDueDate.value}, Status: ${taskStatus.value}`)

    const titleError = document.querySelector('#task-title-invalid');
    if(taskTitle.value.length <= 5) {
        taskTitle.classList.add("is-invalid");
        taskTitle.classList.remove("is-valid");
        titleError.innerText = 'Title requires more than 5 characters';
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
    } else if(taskDueDate.value.length === 10) {
        taskDueDate.classList.add("is-valid");
        taskDueDate.classList.remove("is-invalid");
        dueDateError.innerText = '';
    }

    const statusError = document.querySelector('#task-status-invalid');
    const defaultOption = document.querySelector('#default-option').value;
    
    if(defaultOption === ''){
        taskStatus.classList.add("is-invalid");
        taskStatus.classList.remove("is-valid");
        statusError.style.display = 'block';
        statusError.innerText = 'Status required';
    } else {
        taskStatus.classList.add("is-valid");
        taskStatus.classList.remove("is-invalid");
        statusError.innerText = '';
    }

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict'
    
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
    
            form.classList.add('was-validated')
            }, false)
        })
    })()
}

const submitButton = document.querySelector('#submit-task-button');
submitButton.addEventListener("click", validFormFieldInput);


