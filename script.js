const seatsColumns = 8;
const seatsRows = 6;
const seatsCount = seatsColumns * seatsRows;
const movies = [
  {
    name: "The Forgotten Movie",
    price: "10",
    seats: [],
    htmlSeats: [],
  },
  {
    name: "The Last Samurai",
    price: "12",
    seats: [],
    htmlSeats: [],
  },
  {
    name: "Brain On Fire",
    price: "13",
    seats: [],
    htmlSeats: [],
  },
  {
    name: "Carrie Pilby",
    price: "9",
    seats: [],
    htmlSeats: [],
  },
];
let selectedMovieIndex = 0;
let selectedSeatsCount = 0;
let amount = 0;
let count = 0;

function generateMoviesHtml() {
  const movieSelectEl = document.getElementById("movie-select");

  movies.forEach((movie, index) => {
    const option = document.createElement("option");
    option.text = `${movie.name} (€${movie.price})`;
    option.value = index;

    movieSelectEl.appendChild(option);
  });
}

function generateSeats() {
  for (let movieIndex = 0; movieIndex < movies.length; movieIndex += 1) {
    for (let seatPosition = 0; seatPosition < seatsCount; seatPosition += 1) {
      movies[movieIndex].seats.push({
        position: seatPosition,
        taken: false,
        selected: false,
      });
    }
  }
}

function generateSeatsHtml() {
  const seatsEl = document.getElementById("seats");

  for (let movieIndex = 0; movieIndex < movies.length; movieIndex += 1) {
    const takenSeatsCount = Math.floor(Math.random() * 10);

    // generate taken seats
    for (let seatIndex = 0; seatIndex < takenSeatsCount; seatIndex += 1) {
      const takenSeatPosition = Math.floor(Math.random() * seatsCount);

      movies[movieIndex].seats[takenSeatPosition].taken = true;
    }

    // generate html
    for (let row = 0; row < seatsRows; row += 1) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("row");

      for (let column = 0; column < seatsColumns; column += 1) {
        const seatEl = document.createElement("div");
        const seatPosition = column + (seatsColumns * row);
        seatEl.classList.add("seat", `seat-${seatPosition}`);

        if (movies[movieIndex].seats[seatPosition].taken) {
          seatEl.classList.add("taken");
        }

        rowEl.appendChild(seatEl);
      }

      movies[movieIndex].htmlSeats.push(rowEl);
    }
  }

  movies[0].htmlSeats.forEach((html) => seatsEl.appendChild(html));
}

function selectMovie(movieIndex) {
  const seatsEl = document.getElementById("seats");

  selectedMovieIndex = movieIndex;
  seatsEl.innerHTML = "";
  movies[movieIndex].htmlSeats.forEach((html) => seatsEl.appendChild(html));
}

function selectSeat(seat) {
  const recapEl = document.getElementById("select-recap");
  const seatPosition = seat.classList.value.match(/\d+/)[0];
  const price = Number(movies[selectedMovieIndex].price);
  
  if (!movies[selectedMovieIndex].seats[seatPosition].taken) {
    if (movies[selectedMovieIndex].seats[seatPosition].selected) {
      selectedSeatsCount -= 1;
      amount -= price;
      count -= 1;
    } else {
      selectedSeatsCount += 1;
      amount += price;
      count += 1;
    }

    seat.classList.toggle("selected");
    movies[selectedMovieIndex].seats[seatPosition].selected = !movies[selectedMovieIndex].seats[seatPosition].selected;
  }

  recapEl.innerHTML = `You picked ${count} ${count > 1 ? "seats" : "seat"} for €${amount}`;

  if (selectedSeatsCount) recapEl.style.visibility = "visible";
  else recapEl.style.visibility = "hidden";
}

generateMoviesHtml();
generateSeats();
generateSeatsHtml();

document.getElementById("movie-select").addEventListener("change", (e) => selectMovie(e.target.value));

document.querySelectorAll(".seats-container .seat").forEach((el) => {
  el.addEventListener("click", (e) => selectSeat(e.target));
});
