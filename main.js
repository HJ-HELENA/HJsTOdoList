let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList =[];
addButton.addEventListener("click", addTask);


function addTask() {
    taskList.push(taskInput.value)
    render()
}

function render() {
    let resultHtml ='';
    // for(let task of taskList){
    //    resultHtml += `<div class="task">
    //     <div>${task}</div>
    //     <div>
    //         <button>CHECK</button>
    //         <button>DELETE</button>
    //     </div>
    // </div>`;
    // }
    taskList.forEach(task =>{
        resultHtml += `<div class="task">
        <div>${task}</div>
        <div>
            <button>CHECK</button>
            <button>DELETE</button>
        </div>
    </div>`;
    })


    document.getElementById("taskBoard").innerHTML = resultHtml;
}