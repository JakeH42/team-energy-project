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

    
}

