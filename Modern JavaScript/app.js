import { fetchElixirs } from "./services/api.js";
import { renderElixirsList } from "./components/ElixirsList.js";
import { searchElixirs } from "./components/SearchBar.js";
import { filterElixirsByDifficulty } from "./components/DifficultyFilter.js";


const loadElixirs = async () => {
    const elixirs = await fetchElixirs();
    const searchBar = document.getElementById('search-bar');
    const difficultyFilter = document.getElementById('difficulty-filter');

    const filterAndSearchElixirs = () => {
        const searchTerm = searchBar.value;
        const difficulty = difficultyFilter.value;

        let filteredElixirs = searchElixirs(elixirs, searchTerm);
        filteredElixirs = filterElixirsByDifficulty(filteredElixirs, difficulty);

        renderElixirsList(filteredElixirs);
    };

     searchBar.addEventListener('input', filterAndSearchElixirs);
        difficultyFilter.addEventListener('change', filterAndSearchElixirs);

    filterAndSearchElixirs();
};

document.addEventListener("DOMContentLoaded", () => {
    loadElixirs();
});
