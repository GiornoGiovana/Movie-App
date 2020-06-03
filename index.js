const API_KEY = "13ded7d2";

const movieInput = document.querySelector("[data-movie-input]");
const movieOption = document.querySelector("[data-movie-option]");
const movieBtn = document.querySelector("[data-movie-btn]");

const temp = document.querySelector("[data-movie-item]");
const movieList = document.querySelector("[data-movie-list]");

const moreInfoMovieTemp = document.querySelector("[data-more]");

movieBtn.addEventListener("click", () => {
  const title = movieInput.value;
  const type = movieOption.options[movieOption.selectedIndex].value;

  if (movieInput.value !== "") {
    fetchData(title, type).then((movie) => {
      if (movie.Response === "False") {
        alert("Movie or Series not found, please try again!");
      } else {
        sendDataTemplate(movie);
        dropMovieInfo(movieList);
      }
    });
  } else {
    alert("Type a movie or series!");
  }

  movieInput.value = "";
});

const sendDataTemplate = (movie) => {
  movieList.innerHTML = "";

  movie.forEach((movieData, index) => {
    if (movieData.Poster !== "N/A" && index < 8) {
      const moviCont = temp.content.cloneNode(true); //clonar los elemento del template

      moviCont.getElementById("movieID").innerHTML = movieData.imdbID;
      moviCont.querySelector("[data-movie-title]").innerHTML = movieData.Title;
      moviCont
        .querySelector("[data-movie-image]")
        .setAttribute("src", movieData.Poster);
      moviCont.querySelector("[data-movie-year]").innerHTML = movieData.Year;

      movieList.appendChild(moviCont);
    }
  });
};

const dropMovieInfo = (movies) => {
  if (movies.hasChildNodes()) {
    for (let i = 0; i < movies.childElementCount; i++) {
      const movie = movies.children[i];
      let isClicked = false;
      let showContent = false;

      movie.addEventListener("click", () => {
        let myMovieID = movie.children[0].textContent;

        if (!isClicked) {
          isClicked = true;
          fetchSelectedMovie(myMovieID).then((mov) => {
            const moreInfo = movie.lastElementChild;
            const movieMore = moreInfoMovieTemp.content.cloneNode(true);
            movieMore.querySelector("[data-movie-actors]").innerHTML =
              "Actors: " + mov.Actors;
            movieMore.querySelector("[data-movie-director]").innerHTML =
              "Director(s): " + mov.Director;
            movieMore.querySelector("[data-movie-plot]").innerHTML =
              "Synopsis: " + mov.Plot;

            moreInfo.appendChild(movieMore);
          });
        }

        if (!showContent) {
          showContent = true;
          movie.lastElementChild.classList.add("show");
        } else {
          showContent = false;
          movie.lastElementChild.classList.remove("show");
        }
      });
    }
  }
};

const fetchData = async (title = "", type = "") => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&plot&type=${type}`
  );
  const data = await response.json();
  return data.Response === "True" ? data.Search : data;
};

const fetchSelectedMovie = async (id) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  const data = await response.json();
  return data;
};
