let addToDo: any | null = document.getElementById('add-task');
// addToDo.style.backgroundColor = 'red'
// console.log( addToDo)
addToDo.addEventListener('click', function () {
    let inputText: HTMLInputElement | null = <HTMLInputElement>document.getElementById('in-text');

    let deaddate: HTMLInputElement | null = <HTMLInputElement>document.getElementById('deadtime');
    createCard(inputText, deaddate.value)
})
function createCard(inputText: HTMLInputElement, deaddate: string) {
    // console.log(inputText.value)
    if (inputText.value !== null && inputText.value !== '') {
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
        name.innerText = inputText.value
        name.classList.add("to-do-name")
        let view: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        view.classList.add('view')
        let ou: string = `<input type="checkbox" value="" />`
        view.innerHTML = ou
        view.appendChild(name)
        //list-card
        let listCard: HTMLDivElement = <HTMLDivElement>document.createElement('div');
        listCard.classList.add('list-card')
        listCard.appendChild(edit)
        listCard.appendChild(view)
        //list
        let list = document.getElementsByClassName('list')[0]
        list.appendChild(listCard)
        inputText.value = ''
    }
}
function deleteCard(event: any) {
    event.parentElement.parentElement.parentElement.remove()
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