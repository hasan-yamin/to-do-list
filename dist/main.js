"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import Taskq from './module'
// console.log(Taskq)
class Task {
    constructor(taskName, deadLine, done, jsonId, taskId) {
        this._taskName = taskName;
        this._deadLine = deadLine;
        this._done = done;
        this._jsonId = jsonId;
        if (taskId) {
            this._taskId = taskId;
        }
        else {
            this._taskId = new Date().toISOString();
        }
    }
    getJsonId() {
        return this._jsonId;
    }
    getTaskId() {
        return this._taskId;
    }
    getDeadLine() {
        return this._deadLine;
    }
    setDeadLine(deadLine) {
        this._deadLine = deadLine;
    }
    getDone() {
        return this._done;
    }
    setDone(done) {
        this._done = done;
    }
    getTaskName() {
        return this._taskName;
    }
    setTaskName(taskName) {
        this._taskName = taskName;
    }
}
let taskFilterStatus = document.querySelector('#task-filter-status');
let filterStartDate = document.querySelector('#filter-start-date');
let filterEndDate = document.querySelector('#filter-end-date');
filterStartDate.value = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
filterEndDate.value = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
let editContent = document.querySelector('#edit-content');
let editInText = document.querySelector('#edit-in-text');
//this editID will used to edit task content
let editID = '';
console.log("Today's Date: ", `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
let allTasks = [];
// get all tasks from firebase
tasks();
// console.log(new Date().toISOString().slice(0,10))
function tasks() {
    getTasks().then((result) => {
        let taskObjId;
        // loop on all tasks came from db
        allTasks = [];
        for ((taskObjId) in result) {
            // add task to allTasks array
            // console.log(taskObjId)
            allTasks.push(new Task(result[taskObjId].taskname, result[taskObjId].deadline, result[taskObjId].status, taskObjId, result[taskObjId].taskid));
        }
        if (allTasks.length > 0) {
            let w = document.getElementsByClassName('no-task')[0];
            w.style.display = 'none';
            //    console.log(w)
        }
        // show tasks on screen 
        showTasks(allTasks);
    });
}
let addToDo = document.getElementById('add-task');
addToDo.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let inputText = document.getElementById('in-text');
        let deaddate = document.getElementById('deadtime');
        if (inputText.value.trim().length > 1) {
            let newTask = new Task(inputText.value, deaddate.value, false, 'n');
            // save task on db
            saveTasks(newTask);
            inputText.value = '';
        }
    });
});
function showTasks(allTasks) {
    let list = document.getElementsByClassName('list')[0];
    list.innerHTML = '';
    allTasks.forEach(tsk => {
        createCard(tsk.getTaskName(), tsk.getDeadLine(), tsk.getDone(), tsk.getTaskId());
    });
}
function createCard(inputText, deaddate, taskDone, taskId) {
    let checkd = (taskDone) ? 'checked' : ' ';
    //edit
    let date = document.createElement('div');
    date.classList.add('date');
    // date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:">`
    let deadDate = document.createElement('span');
    deadDate.innerText = deaddate;
    deadDate.style.fontWeight = 'bold';
    compareDates(deaddate, new Date().toISOString().slice(0, 10));
    if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 0) {
        deadDate.style.color = '#bc6100';
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:#bc6100">`;
    }
    else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 1) {
        deadDate.style.color = 'green';
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:green">`;
    }
    else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === -1) {
        deadDate.style.color = 'red';
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:red">`;
    }
    date.appendChild(deadDate);
    let editDelete = document.createElement('div');
    editDelete.classList.add('edit-delete');
    editDelete.innerHTML = ` 
        <span  class="edit-task" onclick="editCard(this)" data-mdb-toggle="tooltip" title="Edit todo"><i
        class="fas fa-pencil-alt me-3"></i></span>
        
        <span class="delete-task" onclick="deleteCard(this)"><i class="fas fa-trash-alt" ></i></span>`;
    let edit = document.createElement('div');
    edit.classList.add('edit');
    edit.appendChild(date);
    edit.appendChild(editDelete);
    //view
    // let name: HTMLInputElement = <HTMLInputElement>document.createElement('input');
    let name = document.createElement('textarea');
    name.value = inputText;
    name.disabled = true;
    // name.type = 'text'
    name.classList.add("to-do-name");
    let view = document.createElement('div');
    view.classList.add('view');
    let ou = `<input type="checkbox" value="" ${checkd}  onclick="check(this)"/>`;
    view.innerHTML = ou;
    view.appendChild(name);
    //list-card
    let listCard = document.createElement('div');
    listCard.classList.add('list-card');
    listCard.setAttribute('data-id', taskId);
    listCard.appendChild(edit);
    listCard.appendChild(view);
    //list
    let list = document.getElementsByClassName('list')[0];
    list.appendChild(listCard);
}
/* [1] 'GET' get all tasks from firebase db */
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json";
        const response = yield fetch(url);
        // console.log(response)
        const responseData = yield response.json();
        // console.log('responseData: ')
        // console.log(responseData)
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            // console.log(error)
            throw error;
        }
        return responseData;
        ////////////////////////
        // fetch(url).then((response)=>{
        //     const responseData = response.json();
        //     return responseData
        // })
    });
}
/* [2] 'POST' save new task to firebase db */
function saveTasks(tsk) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json";
        const response = yield fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                taskid: tsk.getTaskId(),
                taskname: tsk.getTaskName(),
                deadline: tsk.getDeadLine(),
                status: tsk.getDone(),
            }),
        });
        const responseData = yield response.json();
        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'failed to authenticate');
            throw error;
        }
        else {
            tasks();
        }
    });
}
/* [3] 'DELETE' delete a task from firebase db */
function deleteCard(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // delete task localy
        let id = event.parentElement.parentElement.parentElement.getAttribute('data-id');
        let tsk = allTasks.find(tsk => tsk.getTaskId() === id);
        if (tsk !== undefined) {
            let indx = allTasks.indexOf(tsk);
            allTasks.splice(indx, 1);
            let url = `https://todolist-42b5f-default-rtdb.firebaseio.com/hasan/${tsk.getJsonId()}.json`;
            const response = yield fetch(url, {
                method: 'DELETE',
            });
            const responseData = yield response.json();
            if (!response.ok) {
                console.log(responseData);
                const error = new Error(responseData.message || 'failed to authenticate');
                throw error;
            }
            else {
                event.parentElement.parentElement.parentElement.remove();
                if (allTasks.length === 0) {
                    let w = document.getElementsByClassName('no-task')[0];
                    w.style.display = 'block';
                    //    console.log(w)
                }
            }
        }
    });
}
/* [4] 'PUT' update data in task on firebase db */
function editCard(event) {
    editID = event.parentElement.parentElement.parentElement.getAttribute('data-id');
    let oldName = event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].value;
    editContent.style.display = 'flex';
    editInText.value = oldName;
}
function editDone(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let editDeadtime = document.getElementById('edit-deadtime');
        const newName = editInText.value;
        let tsk = allTasks.find(tsk => tsk.getTaskId() === editID);
        // let indx: number = allTasks.indexOf(<Task>tsk)
        if (tsk != undefined) {
            tsk.setTaskName(newName);
            tsk.setDeadLine(editDeadtime.value);
            let url = `https://todolist-42b5f-default-rtdb.firebaseio.com/hasan/${tsk.getJsonId()}.json`;
            const response = yield fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    taskid: tsk.getTaskId(),
                    taskname: tsk.getTaskName(),
                    deadline: tsk.getDeadLine(),
                    status: tsk.getDone(),
                }),
            });
        }
        editInText.value = '';
        editID = '';
        editContent.style.display = 'none';
        tasks();
    });
}
/* [5] 'PUT' update data in task on firebase db */
function check(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = event.parentElement.parentElement.getAttribute('data-id');
        let tsk = allTasks.find(tsk => tsk.getTaskId() === id);
        if (tsk != undefined) {
            tsk.setDone(event.checked);
            let url = `https://todolist-42b5f-default-rtdb.firebaseio.com/hasan/${tsk.getJsonId()}.json`;
            const response = yield fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    taskid: tsk.getTaskId(),
                    taskname: tsk.getTaskName(),
                    deadline: tsk.getDeadLine(),
                    status: tsk.getDone(),
                }),
            });
        }
    });
}
function compareDates(d1, d2) {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 < date2) {
        return -1;
    }
    else if (date1 > date2) {
        return 1;
    }
    else {
        return 0;
    }
}
// filters
// filter by status (complete, active)
taskFilterStatus.addEventListener('change', () => {
    // console.log('taskFilter changed to : ', taskFilterStatus.value)
    let filterValue;
    if (taskFilterStatus.value === 'completed') {
        filterValue = true;
    }
    else if (taskFilterStatus.value === 'active') {
        filterValue = false;
    }
    else {
        showTasks(allTasks);
        return;
    }
    let filteredTasks = allTasks.filter(task => {
        if (task.getDone() === filterValue) {
            return task;
        }
    });
    console.log('filteredTasks', filteredTasks);
    showTasks(filteredTasks);
});
// filter by start date
filterStartDate.addEventListener('change', () => {
    filterDate();
});
// filter by end date
filterEndDate.addEventListener('change', () => {
    filterDate();
});
const filterDate = () => {
    let filterStartValue = new Date(filterStartDate.value);
    let filterEndValue = new Date(filterEndDate.value);
    let filteredTasks = allTasks.filter(task => {
        let tskDate = new Date(task.getDeadLine());
        if (tskDate >= filterStartValue && tskDate <= filterEndValue) {
            return task;
        }
    });
    showTasks(filteredTasks);
};
