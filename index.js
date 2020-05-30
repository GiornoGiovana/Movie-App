const API_KEY = "13ded7d2";

const movie = document.querySelector("[data-input-movie]");
const btn = document.querySelector("[data-button]");
const movieTitle = document.querySelector("[data-title-movie]");
const movieImage = document.querySelector("[data-image-movie]");
const movieYear = document.querySelector("[data-year-movie]");
const moviePlot = document.querySelector("[data-plot-movie]");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  getData(movie.value);
  movie.value = "";
});

window.onload = () => {
  getData();
};

const getData = async (movie = "Joker") => {
  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}&plot`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  movieTitle.innerHTML = data.Title;
  movieImage.setAttribute("src", data.Poster);
  movieYear.innerHTML = data.Year;
  moviePlot.innerHTML = data.Plot;
};
