let cardlist = document.getElementById('cardlist')
function cardConfigure(recordID, name, message){
    let cardHTML = `
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${message}</p>
                <button type="button" onclick="updatePopup(this)" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#updateModal">Edit </button>
                <button type="button" onclick="deletePopup(this)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">Delete</button>
                </div>
            `
    let child = document.createElement('div')
    child.className = 'card';
    child.id = recordID;
    child.innerHTML = cardHTML;
    return child
}

function loadData(data){  //Loading data
    cardlist.innerHTML = "";
    for(i in data)
    {
        cardlist.appendChild(cardConfigure(data[i].id, data[i].name, data[i].message))
    }
}

function callNotify(messageType, message){
    let notifyDivHTML = `<p class="text-${messageType}"><strong>${message}</strong></p>`
    let childDiv = document.createElement('div')
    childDiv.classList.add("notification-bar")
    childDiv.classList.add("notify-animate")
    childDiv.innerHTML = notifyDivHTML
    notifyDiv = document.getElementById('notify')
    notifyDiv.appendChild(childDiv)
}


function addData(){    
    let name = document.getElementById('name')
    let message = document.getElementById('message')
    document.getElementById("modalCancelId").click()
    sendData = JSON.stringify({
        name: name.value,
        message: message.value
    })

    let csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0].value
    let response = fetch("addData/", {
        method: 'POST',
        body: sendData,
        headers: { 
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken },
    })
    response.then(response=>{
        return response.json()
    }).then(data=>{
        name.value = ""
        message.value = ""
        loadData(data)
        callNotify('success', "Your greeting is</br> added")
    }).catch(e=>{
        callNotify('danger', "Error occurd")
    })
}

let deleteCardID = null;

function deletePopup(e){
    deleteCardID = e.parentNode.parentNode.id;
}


function deleteRecord(){
    document.getElementById("deletConfirmModalCancelId").click();
    let csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0].value
    let url = "delete/"+deleteCardID;  //using global variable
    fetch(url,{
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken }
    }).then(response=>{
        return response.json();
    }).then(data=>{
        loadData(data)
        callNotify('warning', "Greeting is deleted")
    })
}

card_id = null // global 

function updatePopup(e, updateStatus=null){
    card_id = e.parentNode.parentNode.id
    let card = document.getElementById(card_id)
    cardName = card.firstElementChild.children[0].innerText
    cardMessage = card.firstElementChild.children[1].innerText
    document.getElementById('update_name').value = cardName
    document.getElementById('update_message').value = cardMessage

}

function updateRecord(){
    let csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0].value
    let url = "update/"+card_id;   // using the global variable
    Name = document.getElementById('update_name')
    Message = document.getElementById('update_message')

    formData = JSON.stringify({
        name: Name.value,
        message: Message.value
    })
    fetch(url,{
        method:"PUT",
        body:formData,
        headers:{
            'Content-Type':'application/json',
            "X-CSRFToken": csrftoken 
        }
    }).then(response=>{
        return response.json()
    }).then(data=>{
        Name.value = ""
        Message.value = ""
        document.getElementById("updateModalCancelId").click()
        loadData(data)
        callNotify('success', "Card is updated")
    }).catch(e=>{
        callNotify('danger', "Update Failed!")
    })

}