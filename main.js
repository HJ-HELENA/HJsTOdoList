let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".taskTabs div")
let underLine = document.getElementById("underLine")

let taskList =[];
let state ='all';
let filterList =[];


tabs.forEach((m) => m.addEventListener("click", (e) => indicator(e)))

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        addTask();
        taskInput.value=""
    }
})
// 할 일 추가 후 input창 비우기
addButton.addEventListener("click",function(){
    taskInput.value=""
})
taskInput.addEventListener("click",function(){
    taskInput.value=""
})


// 탭 클릭시 이벤트 적용
for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click",function(event) {
        filter(event) ;
    })
}

function addTask() {
    let taskObj = {
        id : randomIDGenerate(), 
        taskContent : taskInput.value,
        isCompleted : false
    }
        // input에 값이 입력되지 않으면 저장되지 않도록 유효성 검사
        if(taskObj.taskContent == '') {
            alert("할 일을 입력해주세요")
            return false;
        }
    taskList.push(taskObj)
    render();
}

function render() {
    let list =[];
    if(state == "all") {
        list = taskList;
    }else if(state == "ongoing" || state == "done") {
        list = filterList
    }
    
    
    let resultHtml ='';
    list.forEach(task =>{
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
                <button class="button" onclick="toggleComplete('${task.id}')">CHECK</button>
                <button class="button" onclick="deleteTask('${task.id}')">DELETE</button>
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
        }
    })
}

function deleteTask(id) {

   taskList.forEach(task => {
        if(task.id == id) {
            taskList.splice(taskList.indexOf(task),1);
        }
   })

   filterList.forEach(task=> {
        if(task.id == id) {
        filterList.splice(filterList.indexOf(task),1);
    }
   })

   render();
}

function filter(event) {
    state = event.target.id;
    filterList =[];
    if(state =="all") {
       render();
    }else if(state == "ongoing") {
        taskList.forEach(ongoing=> {
            if(ongoing.isCompleted == false) {
                filterList.push(ongoing);
                console.log(filterList)
            }
        })
        render();
    }else if (state == "done"){
        taskList.forEach(done=> {
            if(done.isCompleted == true) {
                filterList.push(done);
                console.log(filterList)
            }
        })
        render();
    }
}

function indicator(e) {
    underLine.style.display = "block";
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 4 + "px";
}

// 랜덤 id 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2,9); // 함수의 결과물이 다른 데서 쓰일 때에 return 값을 지정
}