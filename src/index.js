let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const cardContainer = document.querySelector('#toy-collection')
  const allToysUrl = "http://localhost:3000/toys";

  fetch(allToysUrl)
    .then(res => res.json())
      .then(array => {
        for (const object in array) {
        console.log(array[object]);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        console.log(cardDiv);
        const h2 = document.createElement('h2');
        h2.textContent = array[object].name;
        const img = document.createElement('img');
        img.src = array[object].image;
        img.classList.add('toy-avatar');
        const p = document.createElement('p');
        p.textContent = `${array[object].likes} Likes`;
        const btn = document.createElement('button');
        console.log(array[object].id);
        btn.id = array[object].id;
        console.log(btn.id);
        btn.classList.add('like-btn');
        btn.textContent = "Like ❤️"
        cardDiv.append(h2, img, p, btn);
        cardContainer.appendChild(cardDiv);
      }});

  


  // cardDiv.appendChild('foo');
});
