export const filterElixirsByDifficulty = (elixirs, difficulty) => {
    if (!difficulty) return elixirs;

    return elixirs.filter(elixir => elixir.difficulty === difficulty);
};
