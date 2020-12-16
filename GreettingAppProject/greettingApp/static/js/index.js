let cardlist = document.getElementById('cardlist')
function cardConfigure(name, message){
    let cardHTML = `
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${message}</p>
                <a href="#" class="btn btn-secondary">Edit</a>
                <a href="#" class="btn btn-danger">Delete</a>
                </div>
            `
    let child = document.createElement('div')
    child.className = 'card';
    child.innerHTML = cardHTML;
    return child
}

function loadData(data){  //Loading data
    cardlist.innerHTML = "";
    for(i in data)
    {
        cardlist.appendChild(cardConfigure(data[i].name, data[i].message))
    }
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
    }).catch(e=>{
        console.log("Error")
    })
}