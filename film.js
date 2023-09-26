// let nameH1;
let title;
let releaseDate;
let episodeSpan;
let openingScrawl;
// let characterDiv;
// let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  director = document.querySelector('span#director');
  releaseDate = document.querySelector('span#release_date');
  episodeSpan = document.querySelector('span#episode_id');
  characterUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  openingCrawl = document.querySelector('#opening_crawl');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.planets = await fetchPlanets(id)
    film.characters = await fetchCharacters(id)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;//
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/films/${id}/characters`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  titleH1.textContent = film?.title;
  director.textContent = film?.director;
  releaseDate.textContent = film?.release_date;
  episodeSpan.textContent = film?.episode_id;
//   homeworldSpan.innerHTML = `<a href="/planet.html?id=${film?.homeworld.id}">${character?.homeworld.name}</a>`;
  const planetLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetLis.join("");
  const characterLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  characterUl.innerHTML = characterLis.join("");
  openingCrawl.textContent = film?.opening_crawl;
}
