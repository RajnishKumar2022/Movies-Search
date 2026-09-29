const inputField = document.getElementById("search");
const btn = document.getElementById("btn");
const wishlistBtn = document.getElementById("wishlist");
const gotoWishlistBtn = document.getElementById("gotoWishlist");

const rating = document.querySelector(".rating");
const releaseYear = document.querySelector(".release-year");
const title = document.querySelector(".title");
const posterImage = document.getElementById("poster-image");

const url = "http://www.omdbapi.com/?i=tt3896198&apikey=<api_key>";

let movieTitle = "";
let imdbID = "";

function showToastMessage() {
  const div = document.createElement("div");
  div.classList.add("toast");
  div.style.display = "block";
  div.innerHTML = `Movie - ${movieTitle} successfully added to wishlist. `;
  document.body.appendChild(div);
  setTimeout(() => {
    div.style.display = "none";
  }, 2000);
}

wishlistBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (movieTitle == "") return alert("Please search movie");
  showToastMessage();

  localStorage.setItem(imdbID, movieTitle);
});

gotoWishlistBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "wishlist.html"
})


const handleSubmit = async (e) => {
  e.preventDefault();
  // Fix: Changed .ariaValueMax to .value to get typed text
  // console.log(inputField.value.trim());

  let moviesName = inputField.value.trim();

  if (!moviesName) {
    alert("Please enter movie name");
  }

  //    `https://omdbapi.com{encodeURIComponent(movieTitle)}&apikey=${API_KEY}`

  const response = await fetch(`${url}&t=${moviesName}`);

  inputField.value = "";

  const data = await response.json();

  rating.innerHTML = `Rating On IMDB is : ${data?.imdbRating}`;
  posterImage.src = `${data?.Poster}`;
  title.innerHTML = `Movie Title : ${data?.Title}`;
  releaseYear.innerHTML = `Release Year : ${data?.Year}`;

  movieTitle = `${data?.Title}`;
  imdbID = `${data?.imdbID}`;

  console.log(data);
  //   console.log("Poster URL is :", data?.Poster);
  //   console.log("Rating is: ", data?.Ratings[0]?.Value);
  //   console.log("IMDB Rating is: ", data?.imdbRating);
  //   console.log("Release Year :", data?.Year);
};

// 2. Trigger on button click
btn.addEventListener("click", handleSubmit);

// 3. Trigger when pressing 'Enter' inside the input box
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});
