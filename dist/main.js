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
let taskFilter = document.querySelector('#task-filter');
console.log('taskFilter', taskFilter.value);
// array of all tasks
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
        let newTask = new Task(inputText.value, deaddate.value, false, 'n');
        // save task localy
        // allTasks.push(newTask)
        // save task on db
        saveTasks(newTask);
        inputText.value = '';
    });
});
taskFilter.addEventListener('change', () => {
    console.log('taskFilter changed to : ', taskFilter.value);
    let filterValue;
    if (taskFilter.value === 'completed') {
        filterValue = true;
    }
    else if (taskFilter.value === 'active') {
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
function showTasks(allTasks) {
    let list = document.getElementsByClassName('list')[0];
    list.innerHTML = '';
    allTasks.forEach(tsk => {
        createCard(tsk.getTaskName(), tsk.getDeadLine(), tsk.getDone(), tsk.getTaskId());
    });
}
function createCard(inputText, deaddate, taskDone, taskId) {
    let checkd = (taskDone) ? 'checked' : ' ';
    // console.log(checkd)
    if (inputText !== null && inputText !== '') {
        //edit
        let date = document.createElement('div');
        date.classList.add('date');
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon">`;
        let deadDate = document.createElement('span');
        deadDate.innerText = deaddate;
        deadDate.style.fontWeight = 'bold';
        compareDates(deaddate, new Date().toISOString().slice(0, 10));
        if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 0) {
            deadDate.style.color = '#bc6100';
        }
        else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 1) {
            deadDate.style.color = 'green';
        }
        else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === -1) {
            deadDate.style.color = 'red';
        }
        date.appendChild(deadDate);
        let editDelete = document.createElement('div');
        editDelete.classList.add('edit-delete');
        editDelete.innerHTML = `
          
         <span  class="edit-done" onclick="editDone(this)" data-mdb-toggle="tooltip" title="Edit todo">
         <i class="fa-solid fa-check"></i></span>

        <span  class="edit-task" onclick="editCard(this)" data-mdb-toggle="tooltip" title="Edit todo"><i
        class="fas fa-pencil-alt me-3"></i></span>
        
        <span class="delete-task" onclick="deleteCard(this)"><i class="fas fa-trash-alt" ></i></span>`;
        let edit = document.createElement('div');
        edit.classList.add('edit');
        edit.appendChild(date);
        edit.appendChild(editDelete);
        //view
        let name = document.createElement('input');
        //    name.innerHTML= `<i class="fa-solid fa-check"></i>`
        name.value = inputText;
        name.disabled = true;
        name.type = 'text';
        name.classList.add("to-do-name");
        let view = document.createElement('div');
        view.classList.add('view');
        let ou = `<input type="checkbox" value="" ${checkd}  onclick="check(this)"/>`;
        view.innerHTML = ou;
        view.appendChild(name);
        // view.innerHTML= view.innerHTML 
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
        let indx = allTasks.indexOf(tsk);
        allTasks.splice(indx, 1);
        // console.log('Task ' + tsk.getTaskName() + ' deleted drom DB')
        // delete task form firebase db
        // console.log(tsk.getJsonId())
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
    });
}
/* [4] 'PUT' update data in task on firebase db */
function editCard(event) {
    let id = event.parentElement.parentElement.parentElement.getAttribute('data-id');
    let oldName = event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].value;
    event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].disabled = false;
    event.parentElement.childNodes[1].style.display = 'inline-block';
    console.log(event.parentElement.childNodes[1]);
    console.log(oldName);
}
function editDone(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = event.parentElement.parentElement.parentElement.getAttribute('data-id');
        let newName = event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].value;
        event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].disabled = true;
        let tsk = allTasks.find(tsk => tsk.getTaskId() === id);
        let indx = allTasks.indexOf(tsk);
        allTasks[indx].setTaskName(newName);
        console.log(allTasks[indx].getTaskName());
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
    });
}
/* [5] 'PUT' update data in task on firebase db */
function check(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = event.parentElement.parentElement.getAttribute('data-id');
        let tsk = allTasks.find(tsk => tsk.getTaskId() === id);
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
// // XMLHttpRequest
// // make function to do the request
// var btn = document.getElementsByClassName("btn-js");
// btn[0].addEventListener('click', function () {
//     // assign the request object to variable
//     var myRequest = new XMLHttpRequest();
//     // https://api.github.com/users/elzerowebschool/repos
//     myRequest.open("GET", "object.json", true);
//     myRequest.send();
//     // function called when readystate change
//     myRequest.onreadystatechange = function () {
//         console.log(this.readyState);
//         console.log(this.status);
//         if (this.readyState === 4 && this.status === 200) {
//             // console.log(this.responseText);
//             var myJsObj = JSON.parse(this.responseText);
//             // console.log(myJsObj[0].age);
//             let myText:string = "";
//             for (var i = 0; i < myJsObj.length; i++) {
//                 console.log(myJsObj[i].username);
//                 myText += myJsObj[i].username + "<br>";
//                 console.log(myText);
//             }
//             document.getElementById("show").innerHTML = myText;
//         }
//     };
// });
