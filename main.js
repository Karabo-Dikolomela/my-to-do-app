//Load even after the page has loaded without bubble
window.addEventListener('load', () => {
    //global variable getting item from local storage if available, if not make it an empty array
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    //get input and form from html, then assign to variables
    const nameInput =  document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form')

    //get username from local storage else set as empty string
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;//pull username from local storage and assign as value of nameImput

    //Updates the user name
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    //On submit the contents of the form push inputs into local storage
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()

        }
        todos.push(todo);
        todos = todos.sort();
        console.log(todos);

        localStorage.setItem('todos', JSON.stringify(todos)); //Save updated todos array as string

        e.target.reset(); //Reset the form after submission

        DisplayTodos();// Call dipslay function to display todo list
    })

    DisplayTodos(); //Call display fuction to diplay content after page has been loaded

})

//Method that loops through the todo array and display its contant
function DisplayTodos () {
    const todoList = document.querySelector('#todo-list'); // select a dive in html with id todo-list

    todoList.innerHTML = '';//refreshes display everytime the function is called (does not add new item but add new items evrytime its refereshed)

    //loop through every item in the todo array
    todos.forEach(todo => {

        //Declare local variable that creates a div in html
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')//add a class to the created div

        //Create child elements for the div
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox'; //set a type check box to an input element
        input.checked = todo.done;
        span.classList.add('bubble');// set a bubble class to span element

        //assign a class of personal or business in the span created tag
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business')
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML =  `<input type = "text" value = "${todo.content}" readonly>`
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        //put elements under their respective parents 
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        //if value of todo=done is true than the todoitem dive gets a class of done
        if (todo.done) {
            todoItem.classList.add('done');
        }

        //adds event listner on the input tag
        input.addEventListener('click', e => {
            todo.done = e.target.checked; //checks if what is clicked is checked
            localStorage.setItem('todos', JSON.stringify(todos));//update the todos in local storage

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos(); //display change made
        })

        //event when the edit button is clicked
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            //if clicked outside the iput field it will stop adding
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));//update local storage
                DisplayTodos();//Redisplay updated todos
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));//update local storage
            DisplayTodos();//Redisplay updated todos
        })

    })

}
