// import Taskq from './module'

/* *********** Start Authentication **************/
let userId: string = '',
    userAuth: string = '';
/* *********** Start login **************/
let loginForm: HTMLFormElement | null = <HTMLFormElement>document.getElementById('login-form');
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const mail: string | null = e.target.email.value.trim()
    const pass: string | null = e.target.password.value.trim()
    if (pass != null && mail != null) {
        try {
            await signin(mail, pass)
            let authPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('auth');
            authPage.style.display = 'none'

            //Show to do list
            let todo: HTMLDivElement | null = <HTMLDivElement>document.getElementById('to-do-list');
            todo.classList.add('show')
            tasks()
        } catch (err) {
            // console.log('Signin Error', err)
            //Show error message
            let ErrorMsg: HTMLDivElement | null = <HTMLDivElement>document.getElementById('error');
            ErrorMsg.innerHTML = err + '';
            ErrorMsg.style.display = 'block'
        }
    }

})
async function signin(email: string, pass: string) {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAMPai0xIg6Rs5-7BaPVphtDONiMQAR2GM ", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true,
        })
    });
    const responseData = await response.json();
    if (!response.ok) {
        const error = new Error(responseData.error.message || 'Signin Error');
        throw error
    }
    userId = responseData.localId;
    userAuth = responseData.idToken;
}
/* *********** end login **************/

/* *********** Start Signup **************/
let signupForm: HTMLFormElement | null = <HTMLFormElement>document.getElementById('signup-form');
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const mail: string | null = e.target.email.value.trim()
    const pass: string | null = e.target.password.value.trim()
    if (pass != null && mail != null) {
        try {
            await signup(mail, pass)
            // hide signup page
            let signupPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('signup');
            signupPage.classList.remove('show')
            // Show Signin Page
            let loginPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('login');
            loginPage.classList.add('show')
            //Hide error message
            let ErrorMsg: HTMLDivElement | null = <HTMLDivElement>document.getElementById('error');
            ErrorMsg.style.display = 'none'
        } catch (err) {
            // console.log('Signup Error', err)
            //Show error message
            let ErrorMsg: HTMLDivElement | null = <HTMLDivElement>document.getElementById('error');
            ErrorMsg.innerHTML = err + '';
            ErrorMsg.style.display = 'block'
        }
    }
})
async function signup(email: string, pass: string) {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyAMPai0xIg6Rs5-7BaPVphtDONiMQAR2GM ", {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true,
        })
    });
    const responseData = await response.json();
    if (!response.ok) {
        const error = new Error(responseData.error.message || 'Signup Error');
        throw error
    }
    // console.log(responseData)
}
/* *********** End Signup **************/

/* *********** Start change aauth page **************/
let changeAuthPage: HTMLButtonElement | null = <HTMLButtonElement>document.getElementById('change-auth');
changeAuthPage.addEventListener('click', function () {
    //Hide error message
    let ErrorMsg: HTMLDivElement | null = <HTMLDivElement>document.getElementById('error');
    ErrorMsg.style.display = 'none'

    if (changeAuthPage?.innerHTML === 'Signup insted') {
        changeAuthPage.innerHTML = 'Login insted'
        let loginPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('login');
        loginPage.classList.remove('show')

        let signupPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('signup');
        signupPage.classList.add('show')

    } else if (changeAuthPage?.innerHTML === 'Login insted') {
        changeAuthPage.innerHTML = 'Signup insted'
        let loginPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('login');
        loginPage.classList.add('show')

        let signupPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('signup');
        signupPage.classList.remove('show')

    }
})
/* *********** End change aauth page **************/

/* *********** Start Logout **************/
let logOut: HTMLButtonElement | null = <HTMLButtonElement>document.getElementById('logout');
logOut.addEventListener('click', function () {
    userId = ''
    userAuth = ''
    //Hide to do list
    let todo: HTMLDivElement | null = <HTMLDivElement>document.getElementById('to-do-list');
    todo.classList.remove('show')
    let authPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('auth');
    authPage.style.display = 'flex'
    // Show Signin Page
    let loginPage: HTMLDivElement | null = <HTMLDivElement>document.getElementById('login');
    loginPage.classList.add('show')
    //Hide error message
    let ErrorMsg: HTMLDivElement | null = <HTMLDivElement>document.getElementById('error');
    ErrorMsg.style.display = 'none'
})

/* *********** End Logout **************/
/* *********** End Authentication **************/


// console.log(Taskq)
class Task {
    private _taskName: string
    private _deadLine: string
    private _done: boolean
    private _jsonId: string
    private _taskId: string
    constructor(taskName: string, deadLine: string, done: boolean, jsonId: string, taskId?: string) {
        this._taskName = taskName
        this._deadLine = deadLine
        this._done = done
        this._jsonId = jsonId
        if (taskId) {
            this._taskId = taskId
        } else {
            this._taskId = new Date().toISOString()
        }
    }
    public getJsonId(): string {
        return this._jsonId
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
let taskFilterStatus: HTMLSelectElement = <HTMLSelectElement>document.querySelector('#task-filter-status')
let filterStartDate: HTMLInputElement = <HTMLInputElement>document.querySelector('#filter-start-date')
let filterEndDate: HTMLInputElement = <HTMLInputElement>document.querySelector('#filter-end-date')
filterStartDate.value = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
filterEndDate.value = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
let editContent: HTMLDivElement = <HTMLDivElement>document.querySelector('#edit-content')
let editInText: HTMLInputElement = <HTMLInputElement>document.querySelector('#edit-in-text')
//this editID will used to edit task content
let editID: string = '';
console.log("Today's Date: ", `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)

let allTasks: Task[] = []
// get all tasks from firebase
// tasks()
// console.log(new Date().toISOString().slice(0,10))
function tasks() {
    getTasks().then((result) => {
        let taskObjId: string
        // loop on all tasks came from db
        allTasks = []
        for ((taskObjId) in result) {
            // add task to allTasks array
            // console.log(taskObjId)
            allTasks.push(new Task(result[taskObjId].taskname, result[taskObjId].deadline, result[taskObjId].status, taskObjId, result[taskObjId].taskid))
        }
        if (allTasks.length > 0) {
            let w: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('no-task')[0]
            w.style.display = 'none'
            //    console.log(w)
        }
        // show tasks on screen 
        showTasks(allTasks)
    })
}

let addToDo: any | null = document.getElementById('add-task');
addToDo.addEventListener('click', async function () {
    let inputText: HTMLInputElement | null = <HTMLInputElement>document.getElementById('in-text');
    let deaddate: HTMLInputElement | null = <HTMLInputElement>document.getElementById('deadtime');
    if (inputText.value.trim().length > 1) {
        let newTask: Task = new Task(inputText.value, deaddate.value, false, 'n')
        // save task on db
        saveTasks(newTask)
        inputText.value = ''
    }

})



function showTasks(allTasks: (Task)[]) {
    let list = document.getElementsByClassName('list')[0]
    list.innerHTML = ''
    allTasks.forEach(tsk => {
        createCard(tsk.getTaskName(), tsk.getDeadLine(), tsk.getDone(), tsk.getTaskId())
    });
}


function createCard(inputText: string, deaddate: string, taskDone: boolean, taskId: string) {
    let checkd: string = (taskDone) ? 'checked' : ' '
    //edit
    let date: HTMLDivElement = <HTMLDivElement>document.createElement('div');
    date.classList.add('date')
    // date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:">`
    let deadDate: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
    deadDate.innerText = deaddate
    deadDate.style.fontWeight = 'bold'
    compareDates(deaddate, new Date().toISOString().slice(0, 10))
    if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 0) {
        deadDate.style.color = '#bc6100';
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:#bc6100">`

    } else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === 1) {
        deadDate.style.color = 'green'
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:green">`

    } else if (compareDates(deaddate, new Date().toISOString().slice(0, 10)) === -1) {
        deadDate.style.color = 'red'
        date.innerHTML = `<i class="fas fa-info-circle me-2 date-icon" style="color:red">`

    }

    date.appendChild(deadDate)

    let editDelete: HTMLDivElement = <HTMLDivElement>document.createElement('div');
    editDelete.classList.add('edit-delete')
    editDelete.innerHTML = ` 
        <span  class="edit-task" onclick="editCard(this)" data-mdb-toggle="tooltip" title="Edit todo"><i
        class="fas fa-pencil-alt me-3"></i></span>
        
        <span class="delete-task" onclick="deleteCard(this)"><i class="fas fa-trash-alt" ></i></span>`

    let edit: HTMLDivElement = <HTMLDivElement>document.createElement('div');
    edit.classList.add('edit')
    edit.appendChild(date)
    edit.appendChild(editDelete)
    //view
    // let name: HTMLInputElement = <HTMLInputElement>document.createElement('input');
    let name: HTMLTextAreaElement = <HTMLTextAreaElement>document.createElement('textarea');
    name.value = inputText
    name.disabled = true
    // name.type = 'text'
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

}

/* [1] 'GET' get all tasks from firebase db */
async function getTasks() {
    let url: string = `https://todolist-42b5f-default-rtdb.firebaseio.com/users/${userId}.json?auth=${userAuth}`
    const response = await fetch(url);
    // console.log(response)
    const responseData = await response.json();
    // console.log('responseData: ')
    // console.log(responseData)
    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        // console.log(error)
        throw error;
    }
    return responseData
    ////////////////////////
    // fetch(url).then((response)=>{
    //     const responseData = response.json();
    //     return responseData
    // })
}

/* [2] 'POST' save new task to firebase db */
async function saveTasks(tsk: Task) {
    let url: string = `https://todolist-42b5f-default-rtdb.firebaseio.com/users/${userId}.json?auth=${userAuth}`
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
    } else {
        tasks()
    }
}

/* [3] 'DELETE' delete a task from firebase db */
async function deleteCard(event: any) {
    // delete task localy
    let id: string = event.parentElement.parentElement.parentElement.getAttribute('data-id')
    let tsk: Task | undefined = allTasks.find(tsk => tsk.getTaskId() === id)
    if (tsk !== undefined) {
        let indx: number = allTasks.indexOf(<Task>tsk)
        allTasks.splice(indx, 1)
        let url: string = `https://todolist-42b5f-default-rtdb.firebaseio.com/users/${userId}/${tsk.getJsonId()}.json?auth=${userAuth}`
        const response = await fetch(url, {
            method: 'DELETE',
        });
        const responseData = await response.json();
        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'failed to authenticate');
            throw error;
        } else {
            event.parentElement.parentElement.parentElement.remove()
            if (allTasks.length === 0) {
                let w: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('no-task')[0]
                w.style.display = 'block'
                //    console.log(w)
            }
        }
    }


}

/* [4] 'PUT' update data in task on firebase db */
function editCard(event: any) {
    editID = event.parentElement.parentElement.parentElement.getAttribute('data-id')
    let oldName = event.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].value
    editContent.style.display = 'flex';
    editInText.value = oldName;
}

async function editDone(event: any) {
    let editDeadtime: HTMLInputElement | null = <HTMLInputElement>document.getElementById('edit-deadtime');
    const newName = editInText.value
    let tsk: Task | undefined = allTasks.find(tsk => tsk.getTaskId() === editID)
    // let indx: number = allTasks.indexOf(<Task>tsk)
    if (tsk != undefined) {
        tsk.setTaskName(newName)
        tsk.setDeadLine(editDeadtime.value)
        let url: string = `https://todolist-42b5f-default-rtdb.firebaseio.com/users/${userId}/${tsk.getJsonId()}.json?auth=${userAuth}`
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                taskid: tsk.getTaskId(),
                taskname: tsk.getTaskName(),
                deadline: tsk.getDeadLine(),
                status: tsk.getDone(),
            }),
        });
    }
    editInText.value = ''
    editID = ''
    editContent.style.display = 'none';
    tasks()
}
/* [5] 'PUT' update data in task on firebase db */
async function check(event: any) {
    let id: string = event.parentElement.parentElement.getAttribute('data-id')
    let tsk: Task | undefined = allTasks.find(tsk => tsk.getTaskId() === id)
    if (tsk != undefined) {
        tsk.setDone(event.checked)
        let url: string = `https://todolist-42b5f-default-rtdb.firebaseio.com/users/${userId}/${tsk.getJsonId()}.json?auth=${userAuth}`
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                taskid: tsk.getTaskId(),
                taskname: tsk.getTaskName(),
                deadline: tsk.getDeadLine(),
                status: tsk.getDone(),
            }),
        });
    }
}

function compareDates(d1: string, d2: string): number {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
}

// filters
// filter by status (complete, active)
taskFilterStatus.addEventListener('change', () => {
    // console.log('taskFilter changed to : ', taskFilterStatus.value)
    let filterValue: boolean
    if (taskFilterStatus.value === 'completed') {
        filterValue = true
    } else if (taskFilterStatus.value === 'active') {
        filterValue = false
    }
    else {
        showTasks(allTasks)
        return
    }
    let filteredTasks: (Task)[] = allTasks.filter(task => {
        if (task.getDone() === filterValue) {
            return task
        }
    })
    // console.log('filteredTasks', filteredTasks)
    showTasks(filteredTasks)
})
// filter by start date
filterStartDate.addEventListener('change', () => {
    filterDate()
})
// filter by end date
filterEndDate.addEventListener('change', () => {
    filterDate()
})
const filterDate = () => {
    let filterStartValue: Date = new Date(filterStartDate.value)
    let filterEndValue: Date = new Date(filterEndDate.value)
    let filteredTasks: (Task)[] = allTasks.filter(task => {
        let tskDate: Date = new Date(task.getDeadLine())
        if (tskDate >= filterStartValue && tskDate <= filterEndValue) {
            return task
        }
    })
    showTasks(filteredTasks)
}