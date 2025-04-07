//timer functionality

//define the timer variables
const clock = document.getElementById("clock");
const timerBtn = document.querySelector(".timer-btn");

// 25 minutes in seconds
let timeLeft = 25 * 60;

// Will store the setInterval reference
let timer; 

// Function to update the timer display
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds; // Format seconds (00-09)
    clock.innerText = `${minutes}:${seconds}`;
}

// Function to start the timer
function startTimer() {
    if (!timer) { // is no timer running? run the if statement.
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else { 
                clearInterval(timer); //else statement says if timer is running, stop it with clearInterval
                timer = null;  // define as null 
                alert("Focus session complete!"); //alert the user
            }
        }, 1000); // 1000 milliseconds = 1 second
    }
}

// Event listener for the Start Timer button
timerBtn.addEventListener("click", startTimer);

// call the function and initialize the timer display
updateDisplay();

// Event listener for the 'increase time' button to increase time by 1 minute
document.getElementById("increase-btn").addEventListener("click", function() {
    timeLeft += 60; // Add 1 minute (60 seconds)
    updateDisplay(); // run the updateDisplay function to show the new time
});

// Event listener for the 'decrease time' button to decrease time by 1 minute
document.getElementById("decrease-btn").addEventListener("click", function() {
    if (timeLeft > 60) { // Prevent going below 1 minute
        timeLeft -= 60; // Subtract 1 minute (60 seconds)
        updateDisplay(); // Update the display with the new time
    }
});

//pause timer function
function pauseTimer() {
    clearInterval(timer); //clearInterval with the timer variable to stop the timer
    timer = null; //set timer as null because it is not running
}

// Event listener for the Pause Timer button
document.getElementById("pause-btn").addEventListener("click", pauseTimer);

//reset timer function
function resetTimer() {
    clearInterval(timer); // Stop the timer
    timer = null; //reset the timer to allow restart
    timeLeft = 25 * 60; // Reset timeLeft back to 25 minutes
    updateDisplay(); // Update the UI to show the reset time
}

// Event listener for the Reset Timer button
document.getElementById("reset-btn").addEventListener("click", resetTimer);

//this is the function to generate the week
//generate week function
function generateWeek(){ //generate week function
    const weekContainer = document.getElementById("week"); //get & define week ID
    weekContainer.innerHTML = ""; //clear innerHTML for weekContainer

    const today = new Date(); // set the today variable to be today's date dynamically
    const currentDay = today.getDay(); //set currentDay to get the day of the week
    const startOfWeek = new Date(); // copy today's date into the startOfWeek variable
    startOfWeek.setDate(today.getDate() - currentDay); //set the startOfWeek variable to today's date minus the current number of the days of the week

    for (let i = 0; i < 7; i++) { 
        const day = new Date(startOfWeek); //set day variable to copy of startOfWeek
        day.setDate(startOfWeek.getDate() + i); // this iterates through the days of the week from 0 - 6 (sunday-saturday)

        const dayElement = document.createElement("div"); //create a div element
        dayElement.classList.add("day"); //add the day class
        dayElement.textContent = day.getDate(); //show the number of each day

        if (i === currentDay) { // if today is shown, add a circle to highlight it in the displayed list
            dayElement.classList.add("today"); //add today class
        }

        weekContainer.appendChild(dayElement); //add day to page
    }
}

generateWeek(); // call the generate week function to show the week on the page


// Get elements
const searchBar = document.getElementById('search-bar');
const taskList = document.getElementById('tasks'); // This is where your tasks are displayed

// Function to filter tasks
function filterTasks() {
    const searchText = searchBar.value.toLowerCase(); // Get search text and convert to lowercase
    const tasks = taskList.getElementsByClassName('task-item'); // Get all tasks

    for (let task of tasks) {
        const taskName = task.textContent.toLowerCase(); // Get the text content of each task
        if (taskName.includes(searchText)) {
            task.style.display = ''; // Show the task if it matches the search
        } else {
            task.style.display = 'none'; // Hide the task if it doesn't match
        }
    }
}


// Add event listener for input changes
searchBar.addEventListener('input', filterTasks);

//this is for the to do list container. Includes: add task, add date, buttons.
//add task function    
    function addTask() {
    
    //define the variables for the task input and task date input and the category input
    const taskInput = document.getElementById("task-input");
    const taskValue = taskInput.value.trim();
    const taskDateInput = document.getElementById("task-date");
    const taskDateValue = taskDateInput.value;
    const taskCategoryInput = document.getElementById("category");
    const taskCategoryValue = taskCategoryInput.value.trim();
    
    //if the task input is empty, alert the user to enter a task
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("div"); // Create a <div> element for task items
    taskItem.classList.add("task-item");
    
    //create a paragraph element for the task text
    const taskText = document.createElement("p"); // Creates the <p> element
    taskText.textContent = taskValue; //set the taskValue input into the paragraph element

    // Create a paragraph for the date
    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date"); // set the class for the date to task-date

        // if the task date input is not empty, set the taskDate text content to the date input value
        if (taskDateValue !== "") {
            taskDate.textContent = taskDateValue;
        }
        
        // Append both taskText and taskDate directly inside taskItem
        taskItem.appendChild(taskText); // Add the taskText to the taskItem div
        if (taskDateValue !== "") {
            taskItem.appendChild(taskDate); // if the task date is not empty, add it to the taskItem div
        }

        taskInput.value = ""; // Clear task input field and reset the field
        taskDateInput.value = ""; // Clear date input field and reset the field



    
    const taskCategory = document.createElement("p"); // Create a paragraph for the category
    taskCategory.classList.add("task-category"); // Set the class for the category to task-category
        if (taskCategoryValue !== "") {
            taskCategory.textContent = `${taskCategoryValue}`;
            taskCategory.style.fontStyle = "italic";  // Style category as italic
            taskCategory.style.fontSize = "0.9em";   // Smaller text
        }

        if (taskCategoryValue !== "") {
            taskItem.appendChild(taskCategory);
        }

        taskCategoryInput.value = "";

        
    //this is for the actions/buttons within the to do list container
    //create the empty gem button
    const emptyGemButton = document.createElement("button");
    emptyGemButton.innerHTML = '<i class="fa-regular fa-gem"></i>';
    emptyGemButton.classList.add("empty-gem-button"); //Add a class for empty gem button

    //create the full gem button
    const gemButton = document.createElement("button");
    gemButton.innerHTML = '<i class="fa-solid fa-gem"></i>';
    gemButton.classList.add("gem-btn");
            
    gemButton.addEventListener("click", function() {
    const prioritySection = document.getElementById("priority");
    const taskList = document.getElementById("tasks");
    
        // Check if the task is in the priority section or not
        if (prioritySection.contains(taskItem)) {
            // Move the task back to the task list
            taskList.appendChild(taskItem);
    
            // Toggle the gem button to full when in the task list
            gemButton.innerHTML = '<i class="fa-solid fa-gem"></i>';
            gemButton.classList.replace("empty-gem-button", "gem-btn");
            
        } else {
            // If there is already a task in the priority section, remove it
            const existingPriorityTask = prioritySection.querySelector(".task-item");
            
                if (existingPriorityTask) {
                    // Move the existing priority task back to the task list
                    taskList.appendChild(existingPriorityTask);

                    // Reset the gem button of the removed priority task
                    const existingGemButton = existingPriorityTask.querySelector(".gem-btn");

                        if (existingGemButton) {
                            existingGemButton.innerHTML = '<i class="fa-solid fa-gem"></i>';
                            existingGemButton.classList.replace("empty-gem-button", "gem-btn");
                        }

                        // Also reset the gem button of the existing priority task to full when moved back
                        const existingEmptyGemButton = existingPriorityTask.querySelector(".empty-gem-button");
                        
                        if (existingEmptyGemButton) {
                        existingEmptyGemButton.innerHTML = '<i class="fa-solid fa-gem"></i>'; // Full gem
                        existingEmptyGemButton.classList.replace("empty-gem-button", "gem-btn"); // Add correct class
                    }
                }

                        // Move the task to the priority section
                        prioritySection.appendChild(taskItem);

                        // Toggle the gem button to empty when in the priority section
                        gemButton.innerHTML = '<i class="fa-regular fa-gem"></i>';
                        gemButton.classList.replace("gem-btn", "empty-gem-button");
        }
});

    //create check button
    const chkButton = document.createElement("button");
    chkButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    chkButton.classList.add('chk-button');

        chkButton.addEventListener("click", function() {
            window.alert("Task Complete! Great Job, keep going!");
            taskItem.remove();
        });

    //create the edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.classList.add("edit-btn"); //edit button has the class .edit-btn

    //create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-btn"); // Add a class for styling delete button

        // Add event listener for deleting the task
        deleteButton.addEventListener("click", function() {
        taskItem.remove(); // Removes the task when clicked
        });
     
    // Create the div for the buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container"); //buttton class div created

    //append buttons to button container div
    buttonContainer.appendChild(gemButton);
    buttonContainer.appendChild(chkButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    taskItem.appendChild(buttonContainer);

    //add the task item with text and button to the task list div
    document.getElementById("tasks").appendChild(taskItem);

    //add functionality to the edit button
    editButton.addEventListener("click", function(){
    
    //create an input field and set its value to the current task text
    const inputField = document.createElement("input");
    inputField.classList.add("task-edit-input")
    inputField.type = "text";
    inputField.value = taskText.textContent;
    
    //Replace the task text with the input field
    taskItem.replaceChild(inputField, taskText);

    //Focus the input field for immediate editing
    inputField.focus();

        //when the user presses Enter, save the new task text
        inputField.addEventListener("blur", function(){
            taskText.textContent = inputField.value; //update task text with the input field
            taskItem.replaceChild(taskText, inputField); //revert back to task text
        });

        // Adding keydown event (when the Enter key is pressed)
        inputField.addEventListener("keydown", function (event) {
            // Check if Enter key was pressed (keyCode 13)
            if (event.key === "Enter") {
            taskText.textContent = inputField.value;  // Update task text with the input field value
            taskItem.replaceChild(taskText, inputField);  // Revert back to task text
            }
        });
    });
};

document.getElementById("add-task-btn").addEventListener("click", addTask);
document.getElementById("task-input").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        addTask();
    }

    
});

document.getElementById("task-date").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});