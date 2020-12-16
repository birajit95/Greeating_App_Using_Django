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
    for(i in data)
    {
        cardlist.appendChild(cardConfigure(data[i].name, data[i].message))
    }
}

function addData(){    

    let name = document.getElementById('name').value
    let message = document.getElementById('message').value

    sendData = JSON.stringify({
        name: name,
        message: message
    })

    let csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0].value
    let response = fetch("addData/", {
        method: 'POST',
        body: sendData,
        headers: { 
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken },
    })

}