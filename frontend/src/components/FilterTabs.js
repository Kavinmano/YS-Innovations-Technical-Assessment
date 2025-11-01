import React from "react";

function FilterTabs({ current, onChange }) {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="filters">
      {filters.map((f) => (
        <button
          key={f}
          className={current === f ? "active" : ""}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
