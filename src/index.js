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
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const h2 = document.createElement('h2');
        h2.textContent = array[object].name;
        const img = document.createElement('img');
        img.src = array[object].image;
        img.classList.add('toy-avatar');
        const p = document.createElement('p');
        p.textContent = `${array[object].likes} Likes`;
        const btn = document.createElement('button');
        btn.id = array[object].id;
        btn.classList.add('like-btn');
        btn.textContent = "Like ❤️";
        btn.addEventListener('click', likeButtonClickHandler);
        cardDiv.append(h2, img, p, btn);
        cardContainer.appendChild(cardDiv);
      }});
  
  let toyForm = document.querySelector('.container .add-toy-form');
  toyForm.addEventListener('submit', handleToySubmitData);

  const submitData = (toyNameString, toyImageUrlString) => {
    let formData = {
      name: toyNameString,
      image: toyImageUrlString,
      likes: 0,
    };

    const configPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:3000/toys", configPost)
      .then(res => res.json())
        .then(object => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('card');
          const h2 = document.createElement('h2');
          h2.textContent = object.name;
          const img = document.createElement('img');
          img.src = object.image;
          img.classList.add('toy-avatar');
          const p = document.createElement('p');
          p.textContent = '0 Likes';
          const btn = document.createElement('button');
          btn.id = object.id;
          btn.classList.add('like-btn');
          btn.textContent = "Like ❤️";
          btn.addEventListener('click', likeButtonClickHandler);
          cardDiv.append(h2, img, p, btn);
          cardContainer.appendChild(cardDiv);
        })
  };


  function handleToySubmitData(e){
    e.preventDefault();
    let toyNameString = toyForm.name.value;
    let toyImageUrlString = toyForm.image.value;
    submitData(toyNameString, toyImageUrlString);
    toyForm.reset();
  };

  function likeButtonClickHandler(e){
    console.log(`I've been clicked by Button ${e.target.id}`);
    let btnId = e.target.id;
    fetchUrl = `http://localhost:3000/toys/${btnId}`;
    // let likes = e.paerentNode
    console.log(e);
    console.log(e.target.parentNode);
    let card = e.target.parentNode;
    let likeText = card.querySelector('p').textContent;
    let likeNumber = parseInt(likeText);
    console.log(likeText);
    console.log(likeNumber);
    let newLikeNumber = likeNumber + 1;
    console.log(newLikeNumber);
    likeText = `${newLikeNumber} Likes`;
    console.log(likeText);
    card.querySelector('p').textContent = likeText;
    console.log(card.querySelector('p').textContent);

    let newLikeData = {
      likes: newLikeNumber,
    };

    const configPatch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newLikeData),
    };

    fetch(fetchUrl, configPatch)
      .then(res => res.json())
        .then(object => {
          console.log(object)
          
        })

  
  };
});