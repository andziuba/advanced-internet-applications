import React from "react";

export default function SearchSort({ search, setSearch, sortOrder, setSortOrder }) {
  return (
    <div className="search-sort">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="name">Sort by name</option>
        <option value="rating">Sort by rating</option>
      </select>
    </div>
  );
}
