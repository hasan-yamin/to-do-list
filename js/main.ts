import Taskq from './module'
console.log(Taskq)
class Task {
    private _taskName: string
    private _deadLine: string
    private _done: boolean
    private _taskId: string
    constructor(taskName: string, deadLine: string, done: boolean) {
        this._taskName = taskName
        this._deadLine = deadLine
        this._done = done
        this._taskId = new Date().toISOString()
    }
    public getTaskId(): string {
        return this._taskId
    }
    public getDeadLine(): string {
        return this._deadLine
    }

    public setDeadLine(deadLine: string): void {
        this._deadLine = deadLine
    }

    public getDone(): boolean {
        return this._done
    }

    public setDone(done: boolean): void {
        this._done = done
    }

    public getTaskName(): string {
        return this._taskName
    }

    public setTaskName(taskName: string): void {
        this._taskName = taskName
    }



}
let tasks = getTasks()
tasks.then((result) => {
    console.log(result)
})
let allTasks: Task[] = []
allTasks.push(new Task('test task', '2022-11-15', true))
showCards()
let addToDo: any | null = document.getElementById('add-task');
addToDo.style.backgroundColor = 'red'
console.log(addToDo)
addToDo.addEventListener('click', function () {
    let inputText: HTMLInputElement | null = <HTMLInputElement>document.getElementById('in-text');
    let deaddate: HTMLInputElement | null = <HTMLInputElement>document.getElementById('deadtime');

    let newTask: Task = new Task(inputText.value, deaddate.value, false)
    saveTasks(newTask)
    allTasks.push(newTask)
    showCards()
})
function showCards() {
    let list = document.getElementsByClassName('list')[0]
    list.innerHTML = ''
    allTasks.forEach(tsk => {
        createCard(tsk.getTaskName(), tsk.getDeadLine(), tsk.getDone(), tsk.getTaskId())
    });
}

function createCard(inputText: string, deaddate: string, taskDone: boolean, taskId: string) {
    let checkd: string = (taskDone) ? 'checked' : ' '
    console.log(checkd)
    if (inputText !== null && inputText !== '') {
        //edit
        let date: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        date.classList.add('date')
        date.innerHTML = `<i class="fas fa-info-circle me-2">`
        let deadDate: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
        deadDate.innerText = deaddate
        date.appendChild(deadDate)

        let editDelete: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        editDelete.classList.add('edit-delete')
        editDelete.innerHTML = `
        <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
        class="fas fa-pencil-alt me-3"></i></a>
        <span onclick="deleteCard(this)"><i class="fas fa-trash-alt" ></i></span>`

        let edit: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        edit.classList.add('edit')
        edit.appendChild(date)
        edit.appendChild(editDelete)
        //view
        let name: HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
        name.innerText = inputText
        name.classList.add("to-do-name")
        let view: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        view.classList.add('view')
        let ou: string = `<input type="checkbox" value="" ${checkd}  onclick="check(this)"/>`
        view.innerHTML = ou
        view.appendChild(name)
        //list-card
        let listCard: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        listCard.classList.add('list-card')
        listCard.setAttribute('data-id', taskId)
        listCard.appendChild(edit)
        listCard.appendChild(view)
        //list
        let list = document.getElementsByClassName('list')[0]
        list.appendChild(listCard)
        // inputText.value = ''
    }

    console.log('tasks number: ' + allTasks.length)
}
function deleteCard(event: any) {

    let id: string = event.parentElement.parentElement.parentElement.getAttribute('data-id')
    let tsk: Task | undefined = allTasks.find(tsk => tsk.getTaskId() === id)
    let indx: number = allTasks.indexOf(<Task>tsk)
    allTasks.splice(indx, 1)
    console.log('Task ' + tsk.getTaskName() + ' deleted drom DB')
    event.parentElement.parentElement.parentElement.remove()
}

function check(event: any) {
    let id: string = event.parentElement.parentElement.getAttribute('data-id')
    allTasks.find(tsk => tsk.getTaskId() === id).setDone(event.checked)

    // if (event.checked) {
    //     console.log('task done')
    //     console.log(event.checked)
    // } else {

    //     console.log('task not done yet')
    //     console.log(event.checked)
    // } 
}

async function saveTasks(tsk: Task) {
    let url: string = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json"
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            taskid: tsk.getTaskId(),
            taskname: tsk.getTaskName(),
            deadline: tsk.getDeadLine(),
            status: tsk.getDone(),
        }),
    });
    const responseData = await response.json();
    if (!response.ok) {
        console.log(responseData);
        const error = new Error(responseData.message || 'failed to authenticate');
        throw error;
    }
}

async function getTasks() {
    let url: string = "https://todolist-42b5f-default-rtdb.firebaseio.com/hasan.json"
    const response = await fetch(url);
    // console.log('response : ')
    // console.log(response)
    const responseData = await response.json();
    console.log('responseData: ')
    console.log(responseData)
    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
    }
    return responseData
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