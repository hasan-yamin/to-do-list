var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Taskq from './module';
console.log(Taskq);
class Task {
    constructor(taskName, deadLine, done) {
        this._taskName = taskName;
        this._deadLine = deadLine;
        this._done = done;
        this._taskId = new Date().toISOString();
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
let tasks = getTasks();
tasks.then((result) => {
    console.log(result);
});
let allTasks = [];
allTasks.push(new Task('test task', '2022-11-15', true));
showCards();
let addToDo = document.getElementById('add-task');
addToDo.style.backgroundColor = 'red';
console.log(addToDo);
addToDo.addEventListener('click', function () {
    let inputText = document.getElementById('in-text');
    let deaddate = document.getElementById('deadtime');
    let newTask = new Task(inputText.value, deaddate.value, false);
    saveTasks(newTask);
    allTasks.push(newTask);
    showCards();
});
function showCards() {
    let list = document.getElementsByClassName('list')[0];
    list.innerHTML = '';
    allTasks.forEach(tsk => {
        createCard(tsk.getTaskName(), tsk.getDeadLine(), tsk.getDone(), tsk.getTaskId());
    });
}
function createCard(inputText, deaddate, taskDone, taskId) {
    let checkd = (taskDone) ? 'checked' : ' ';
    console.log(checkd);
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
        // inputText.value = ''
    }
    console.log('tasks number: ' + allTasks.length);
}
function deleteCard(event) {
    let id = event.parentElement.parentElement.parentElement.getAttribute('data-id');
    let tsk = allTasks.find(tsk => tsk.getTaskId() === id);
    let indx = allTasks.indexOf(tsk);
    allTasks.splice(indx, 1);
    console.log('Task ' + tsk.getTaskName() + ' deleted drom DB');
    event.parentElement.parentElement.parentElement.remove();
}
function check(event) {
    let id = event.parentElement.parentElement.getAttribute('data-id');
    allTasks.find(tsk => tsk.getTaskId() === id).setDone(event.checked);
    // if (event.checked) {
    //     console.log('task done')
    //     console.log(event.checked)
    // } else {
    //     console.log('task not done yet')
    //     console.log(event.checked)
    // } 
}
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
    });
}
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json";
        const response = yield fetch(url);
        // console.log('response : ')
        // console.log(response)
        const responseData = yield response.json();
        console.log('responseData: ');
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        return responseData;
    });
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
