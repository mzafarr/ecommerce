import React from "react";

const Sort = ({ sortOption, setSortOption }) => {
  return (
    <select
      className="mx-4 rounded-lg p-2 cursor-pointer font-serif"
      name="format"
      value={sortOption}
      onChange={(e) => {
        setSortOption(e.target.value);
      }}
    >
      <option disabled value="">
        Sort by categories
      </option>
      <option value="D">highest to lowest</option>
      <option value="A">lowest to highest</option>
    </select>
  );
};

export default Sort;
