let cardlist = document.getElementById('cardlist')
function cardConfigure(recordID, name, message){
    let cardHTML = `
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${message}</p>
                <button type="button" class="btn btn-secondary">Edit</button>
                <button type="button" onclick="deleteRecord(this)" class="btn btn-danger">Delete</button>
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
        callNotify('success', "Your greeting is </b> added")
    }).catch(e=>{
        callNotify('danger', "Error occurd")
    })
}

function deleteRecord(e){
    let url = "delete_record/?recordid="+e.parentNode.parentNode.id
    fetch(url).then(response=>{
        console.log(response);
    })
}