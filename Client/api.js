//Make set, have this in a set making button method params: setName
onSetCreate = (setName) => {
    fetch('/api/sets', {
        method: 'POST', body: JSON.stringify({name: setName}),
        headers: {
            'Content-Type': 'application/json',
        },   
    })
    .then(res => res.json())
    .then(data => console.log(data)) // instead replcae with what we want to do with the data
    .catch(error => console.error('Error:', error));
}

//Make card, have this in a card making button method params: front, back, setid
onCardCreate = (front, back, setId) => {
    fetch('/api/cards', {
        method: 'POST', body: JSON.stringify({front: front, back: back, setId: setId}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => console.log(data)) // instead replcae with what we want to do with the data
    .catch(error => console.error('Error:', error));
}


//Get all sets 
getSet = () => {
    return fetch('localhost:3000/api/sets')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch sets');
            }
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
}


//Get all cards within a certain set
getCardsInSet = (setId) => {
    return fetch(`/api/${setId}/cards`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch cards');
            }
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
    });
}

//Updates a card
onUpdateCard = (cardId, newFront, newBack, newSetId) => {
    fetch(`/api/cards/${cardId}`, {
        method: 'PUT', body: JSON.stringify({front: newFront, back: newBack, setId: newSetId}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => console.log(data)) //do something after updated?
    .catch(error => console.error('Error:', error));
}

//Updates a set
onUpdateSet = (setId, newName) => {
    fetch(`/api/sets/${setId}`, {
        method: 'PUT', body: JSON.stringify({name: newName}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => console.log(data)) //do something after updated?
    .catch(error => console.error('Error:', error));
}

//Deletes a set along with all cards with it (should already be automated from db cascading)
onDeleteSet = (setId) => {
    fetch(`/api/sets/${setId}/delete`, {
        method: 'DELETE'
    })
    .then(data => console.log(data)) //do something after deletion?
    .catch(error => console.error('Error:', error));
}

//Deletes a card
onDeleteCard = (cardId) => {
    fetch(`/api/cards/${cardId}/delete`, {
        method: 'DELETE'
    })
    .then(data => console.log(data)) //do something after deletion?
    .catch(error => console.error('Error:', error));
}