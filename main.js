//Global Scope variables
let task_input;
let task_due_date;
let task_set =[];// cointains new tasks to be created

//Creates a Task class object
class Task{
    constructor(task_input_param, task_due_date_param) {
        this.task_input = task_input_param;
        this.task_due_date = task_due_date_param;
    }

    get getTask_input() {
        return this.task_input;
    }

    get getTask_due_date() {
        return this.task_due_date;
    }

}

//main function 
function set_task(event){  //runs function when the button is clicked
    event.preventDefault();


    
    task_input = document.getElementById("task-input").value;//fetching task input from html to assign value to it
    task_due_date = document.getElementById("task-due-date").value;//fetching task-due-date input from html to assign value to it

    let new_task = new Task (task_input, task_due_date);//assign Task class object value to new task

    task_set.push(new_task);
    display_function(new_task);

}
//renders tasks into the DOM
function display_function(new_task_param){

        for (let i = 0; i < task_set.length; i++) {   //loops through the task_set array
        let new_task_display = document.createElement("div");

    /*template-literal to output task and dates
    *
    * <p> ${task_set...input} returns task_input from the task_set array 
    * <p> ${task_set...due_date} returns task_due_date from the task_set array
    */

     let new_task_display_content =             
        `  
        <h4>Your Tasks:</h4>
        <p>${task_set[i].getTask_input}</p>  
        <h4>Due Date:</h4>
        <p>${task_set[i].getTask_due_date}
        
        `;

        new_task_display.innerHTML = new_task_display_content;

        document.getElementById("tasks_display").appendChild(new_task_display)


}
}
