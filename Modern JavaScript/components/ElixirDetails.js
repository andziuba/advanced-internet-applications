export const renderElixirDetails = (elixir) => {
    const detailsContainer = document.getElementById('elixir-details');
    detailsContainer.innerHTML = `
    <h2>${elixir.name}</h2>
    <p><b>Effect</b>: ${elixir.effect || "None"}</p>
    <p><b>Side effects</b>: ${elixir.sideEffects || "None"}</p>
    <p><b>Characteristics</b>: ${elixir.characteristics || "None"}</p>
    <p><b>Time</b>: ${elixir.time || "None"}</p>
    <p><b>Difficulty</b>: ${elixir.difficulty || "None"}</p>
    <p><b>Ingredients</b>: ${elixir.ingredients.length ? elixir.ingredients.map(ing => ing.name).join(", ") : "None"}</p>
    <p><b>Inventors</b>: ${elixir.inventors.length ? elixir.inventors.map(inv => `${inv.firstName} ${inv.lastName}`).join(", ") : "Unknown"}</p>
    <p><b>Manufacturer</b>: ${elixir.manufacturer || "Unknown"}</p>
    `;
};
