//Global Scope variables
let task_input;
let task_due_date;
let task_set; // cointains new tasks to be created

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

check_storage(); 

//Checks contents of the storage
function check_storage() {

    //if there is something in local_storage
    if (localStorage.getItem("task_password") !== null) {//fetching tasks from storage
        task_set = [];
        let the_data = localStorage.getItem("task_password");
        non_functional_task_set = JSON.parse(the_data);// PARSE tasks back into javascript array
        console.log("There were items in storage:");
        console.log(task_set);
        

        for(let i = 0; i< non_functional_task_set.length; i++ ) { //LOOPS through array to create new tasks
             task_set.push(new Task(non_functional_task_set[i].task_input, non_functional_task_set[i].task_due_date)); //pushes new tasks into task_set
        }

    }
    //If there is nothing in local storage
    else {
        task_set =[];
        console.log("There were NO items in storage:");
        console.log(task_set);
    }

}

//adds tasks inputs to local storage
function add_task_to_storage(task_param) {
    

    let my_data = JSON.stringify(task_param); //converts my_data to a string
    localStorage.setItem("task_password", my_data);
}



//main function 
function set_task(event){  //runs function when the button is clicked
    event.preventDefault();

    task_input = document.getElementById("task-input").value;//fetching task input from html to assign value to it
    task_due_date = document.getElementById("task-due-date").value;//fetching task-due-date input from html to assign value to it

    let new_task = new Task (task_input, task_due_date);//assign Task class object value to new task
    task_set.push(new_task);

    //display_function(new_task);

    add_task_to_storage(task_set);
    display_function();
}

//renders tasks into the DOM
function display_function(){
        check_storage();

        document.getElementById("tasks_display").innerHTML = "";

        for (let i = 0; i < task_set.length; i++) {   //LOOPS through the task_set array
        let new_task_display = document.createElement("div");

    /*template-literal to output task and dates
    *
    * <p> ${task_set...input} returns task_input from the task_set array 
    * <p> ${task_set...due_date} returns task_due_date from the task_set array
    */

     let new_task_display_content =             
        `  
        <p>${task_set[i].getTask_input}</p>  
        <p>${task_set[i].getTask_due_date}</p>
        <button>Edit</button>
        <button>Delete</button>
        `;

        new_task_display.innerHTML = new_task_display_content;

        document.getElementById("tasks_display").appendChild(new_task_display)


}
}
