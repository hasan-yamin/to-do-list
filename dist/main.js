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
// array of all tasks
let allTasks = [];
// get all tasks from firebase
tasks();
function tasks() {
    getTasks().then((result) => {
        let taskObjId;
        // loop on all tasks came from db
        allTasks = [];
        for ((taskObjId) in result) {
            // add task to allTasks array
            console.log(taskObjId);
            allTasks.push(new Task(result[taskObjId].taskname, result[taskObjId].deadline, result[taskObjId].status, taskObjId, result[taskObjId].taskid));
        }
        // show tasks on screen 
        showTasks();
    });
}
// allTasks.push(new Task('test task', '2022-11-15', true, '5555555'))
// showCards()
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
        // show all tasks on screen
        //   tasks()
    });
});
function showTasks() {
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
        date.innerHTML = `<i class="fas fa-info-circle me-2">`;
        let deadDate = document.createElement('span');
        deadDate.innerText = deaddate;
        date.appendChild(deadDate);
        let editDelete = document.createElement('div');
        editDelete.classList.add('edit-delete');
        editDelete.innerHTML = `
        <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
        class="fas fa-pencil-alt me-3"></i></a>
        <span onclick="deleteCard(this)"><i class="fas fa-trash-alt" ></i></span>`;
        let edit = document.createElement('div');
        edit.classList.add('edit');
        edit.appendChild(date);
        edit.appendChild(editDelete);
        //view
        let name = document.createElement('p');
        name.innerText = inputText;
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
}
/* [1] 'GET' get all tasks from firebase db */
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json";
        const response = yield fetch(url);
        const responseData = yield response.json();
        // console.log('responseData: ')
        // console.log(responseData)
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            // console.log(error)
            throw error;
        }
        return responseData;
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
        console.log('Task ' + tsk.getTaskName() + ' deleted drom DB');
        event.parentElement.parentElement.parentElement.remove();
        // delete task form firebase db
        console.log(tsk.getJsonId());
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
    });
}
/* [4] 'PUT' update data in task on firebase db */
function check(event) {
    let id = event.parentElement.parentElement.getAttribute('data-id');
    allTasks.find(tsk => tsk.getTaskId() === id).setDone(event.checked);
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
