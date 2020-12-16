let cardlist = document.getElementById('cardlist')
function cardConfigure(year){
    let cardHTML = `
                <div class="card-body">
                <h5 class="card-title">Birajit Nath</h5>
                <p class="card-text">Wishing you all a very happy new year ${year}</p>
                <a href="#" class="btn btn-secondary">Edit</a>
                <a href="#" class="btn btn-danger">Delete</a>
                </div>
            `
    let child = document.createElement('div')
    child.className = 'card';
    child.innerHTML = cardHTML;
    return child
}

for(i = 2010; i < 2021; i++){
    cardlist.appendChild(cardConfigure(i))
}


