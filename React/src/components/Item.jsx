import React from "react";

export default function Item({ item, onDelete, onRatingChange }) {
  return (
    <div className="item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>

      <label>
        Rating:
        <select
          value={item.rating}
          onChange={(e) => onRatingChange(item.id, parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}
