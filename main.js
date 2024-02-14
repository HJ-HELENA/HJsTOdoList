let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList =[];
addButton.addEventListener("click", addTask);


function addTask() {
    let taskObj = {
        id : randomIDGenerate(), 
        taskContent : taskInput.value,
        isCompleted : false
    }
    taskList.push(taskObj)
    console.log(taskList);
    render();
}

function render() {
    let resultHtml ='';
    taskList.forEach(task =>{
        resultHtml += 
        `<div class="task">`
        if(task.isCompleted == true) {
            resultHtml += 
            `<div class="taskDone">${task.taskContent}</div>`
        }else {
            resultHtml += 
            `<div>${task.taskContent}</div>`
        }
        resultHtml += 
            `<div>
                <button onclick="toggleComplete('${task.id}')">CHECK</button>
                <button onclick="deleteTask('${task.id}')">DELETE</button>
            </div>
        </div>`; 
    })


    document.getElementById("taskBoard").innerHTML = resultHtml;
}

function toggleComplete(id){
    // for(let task of taskList) {
    //     if(task.id == id) {
    //         task.isComplete = true
    //         break; // for문 종료
    //     }
    //     console.log(taskList);
    // }

    taskList.forEach(task=> {
        if(task.id == id) {
            task.isCompleted = !task.isCompleted;
            render();
            console.log(taskList);
        }
    })

    // for(let i=0; i<taskList.length; i++) {
    //     if(taskList[i].id == id) {
    //         taskList[i].isComplete = true;
    //         break;
    //     }
    //     console.log(taskList);
    // }
}

function deleteTask(id) {
   taskList.forEach(task => {
        if(task.id == id) {
            taskList.splice(taskList.indexOf(task),1);
            render();
            console.log(taskList)
        }
   }) 
}

// 랜덤 id 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2,9); // 함수의 결과물이 다른 데서 쓰일 때에 return 값을 지정
}