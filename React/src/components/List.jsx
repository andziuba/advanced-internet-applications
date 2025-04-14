import React from "react";
import Item from "./Item";

export default function List({ items, onDelete, onRatingChange }) {
  return (
    <div className="list">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDelete={onDelete}
          onRatingChange={onRatingChange}
        />
      ))}
    </div>
  );
}
