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

  fetchData();
  renderNewToy();
});

function fetchData() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((json) => renderData(json));
}

function renderData(toys) {
  toys.forEach((toy) => {
    // console.log(toy)
    //create elements
    let card = document.createElement("div");
    let name = document.createElement("h2");
    let image = document.createElement("img");
    let likes = document.createElement("p");
    let button = document.createElement("button");

    //give content and info
    name.textContent = toy.name;
    image.src = toy.image;
    likes.textContent = `${toy.likes} likes`;

    card.className = "card";
    image.className = "toy-avatar";
    button.className = "like-btn";
    button.textContent = "like";
    button.id = "toy_id";

    button.addEventListener("click", () => {
      likes.textContent = `${(toy.likes += 1)} likes`;
    });

    // //append
    card.append(name, image, likes, button);
    document.querySelector("#toy-collection").append(card);
  });
}

function renderNewToy() {


  //I am writing something that will render new data when the form is submitted. 

  //Everything works, however I am having trouble passing in the like number so it can behave the same way as the other buttons.
  
  document.querySelector(".add-toy-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //
    let newToy = e.target.name.value;
    let newToyImage = e.target.image.value;

    //create elements
    let newCard = document.createElement("div");
    let newName = document.createElement("h2");
    let newImage = document.createElement("img");
    let newLikes = document.createElement("p");
    let newButton = document.createElement("button");

    newCard.className = "card";
    newImage.className = "toy-avatar";
    newButton.className = "like-btn";
    newButton.textContent = "like";
    newButton.id = "toy_id";

    newImage.src = newToyImage;
    newName.textContent = newToy;

    let defaultLike = "0"
    newLikes.textContent = `${defaultLike} likes`
 

    newButton.addEventListener("click", () => {
      newLikes.textContent = `${defaultLike++} likes`;
    });

    //append
    newCard.append(newName, newImage, newLikes, newButton);
    document.querySelector("#toy-collection").append(newCard);
  });
}
