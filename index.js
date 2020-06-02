const API_KEY = "13ded7d2";

const movieInput = document.querySelector("[data-movie-input]");
const movieOption = document.querySelector("[data-movie-option]");
const movieBtn = document.querySelector("[data-movie-btn]");

const temp = document.querySelector("[data-movie-item]");
const movieList = document.querySelector("[data-movie-list]");

movieBtn.addEventListener("click", () => {
  const title = movieInput.value;
  const type = movieOption.options[movieOption.selectedIndex].value;

  if (movieInput.value !== "") {
    fetchData(title, type).then((movie) => {
      if (movie.Response === "False") {
        alert("Movie or Series not found, please try again!");
      } else {
        sendDataTemplate(movie);
      }
    });
  } else {
    alert("Type a movie or series!");
  }

  movieInput.value = "";
});

const fetchData = async (title = "", type = "") => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&plot&type=${type}`
  );
  const data = await response.json();
  console.log(data);
  return data.Response === "True" ? data.Search : data;
};

const sendDataTemplate = (movie) => {
  movieList.innerHTML = "";
  movie.forEach((movieData, index) => {
    if (movieData.Poster !== "N/A" && index < 8) {
      const moviCont = temp.content.cloneNode(true); //clonas los elemento del template
      moviCont.querySelector("[data-movie-title]").innerHTML = movieData.Title;
      moviCont
        .querySelector("[data-movie-image]")
        .setAttribute("src", movieData.Poster);
      moviCont.querySelector("[data-movie-year]").innerHTML = movieData.Year;

      movieList.appendChild(moviCont);
    }
  });
};
