import React from "react";

const Search = ({ search, setSearch, searchOption, setSearchOption }) => {
  return (
    <>
      <input
        type="text"
        name="search"
        placeholder="search for laptop..."
        value={search}
        className="px-2 mx-4 rounded border-lg w-2/5 border-slate-500 outline-slate-200 outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <select
        className="mx-4 rounded-lg p-2 cursor-pointer font-serif"
        name="format"
        value={searchOption}
        onChange={(e) => {
          setSearchOption(e.target.value);
        }}
      >
        <option disabled value="">
          Search by
        </option>
        <option value="Name">Name</option>
        <option value="Description">Description</option>
        <option value="Price">Price</option>
      </select>
    </>
  );
};

export default Search;
