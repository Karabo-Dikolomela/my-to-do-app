//Global Scope variables
let task_input;
let task_due_date;


function set_task(event){
    event.preventDefault();
    
    task_input = document.getElementById("task-input").value;//fetching task input from html to assign value to it
    task_due_date = document.getElementById("task-due-date").value;//fetching task-due-date input from html to assign value to it
}