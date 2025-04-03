export const searchElixirs = (elixirs, searchTerm) => {
    return elixirs.filter(elixir =>
        elixir.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};
