import React, { useState } from "react";
import data from "./data/collection.json";
import List from "./components/List";
import SearchSort from "./components/SearchSort";
import AddItem from "./components/AddItem";

export default function App() {
  const [items, setItems] = useState(data);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const getSortedItems = (itemsToSort) => {
    return [...itemsToSort].sort((a, b) => {
      if (sortOrder === "name") return a.name.localeCompare(b.name);
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0;
    });
  };

  const handleDelete = (id) => {
    setItems(prev => getSortedItems(prev.filter(item => item.id !== id)));
  };

  const handleAdd = (newItem) => {
    setItems(prev => getSortedItems([...prev, { ...newItem, id: Date.now() }]));
  };

  const handleRatingChange = (id, newRating) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, rating: newRating } : item
      )
    );
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const filteredItems = getSortedItems(
    items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container">
      <div className="header">
        <h1>My Collection</h1>
        <SearchSort
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={handleSortChange}
        />
      </div>
      <AddItem onAdd={handleAdd} />
      <List
        items={filteredItems}
        onDelete={handleDelete}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
}