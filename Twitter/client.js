const form = document.querySelector('form'); 
const loadingElement = document.querySelector('.loading');
const cheepsElement = document.querySelector('.cheeps');
const API_URL = 'http://localhost:5000/cheep';

loadingElement.style.display = 'none';

listAllCheeps();

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const cheep = {
        name,
        content
    }
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(cheep),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdCheep => {
          form.reset();
          listAllCheeps();
          form.style.display = '';
          loadingElement.style.display = 'none';
      })
})
function listAllCheeps() {
    cheepsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(cheeps => {
            cheeps.reverse();
            cheeps.forEach(cheep => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = cheep.name;

                const contents = document.createElement('p');
                contents.textContent = cheep.content; 
               
                const date = document.createElement('small');
                date.textContent = new Date(cheep.createdCheep); 

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date); 

                cheepsElement.appendChild(div);
            })
        })
}