import { renderElixirDetails } from './ElixirDetails.js';

export const renderElixirsList = (elixirs) => {
    const listContainer = document.getElementById('elixirs-list');
    listContainer.innerHTML = '';
    const elxirDetails = document.getElementById('elixir-details');
    elxirDetails.style.display = 'none';

    let selected = null;

    elixirs.forEach((elixir) => {
        const elixirItem = document.createElement('div');
        elixirItem.className = "elixir-item";
        elixirItem.textContent = elixir.name;

        elixirItem.addEventListener('click', () => {
            if (selected) {
                selected.classList.remove('selected');
            }
            elixirItem.classList.add('selected');
            selected = elixirItem;

            elxirDetails.style.display = 'flex';
            renderElixirDetails(elixir)
        });

        listContainer.appendChild(elixirItem);
    });
};
