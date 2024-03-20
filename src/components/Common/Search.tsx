import React from "react";

const Search = ({ search, setSearch }) => {
  return (
      <input
        type="text"
        name="search"
        placeholder="search for laptop..."
        value={search}
        className="px-2 mx-4 rounded border-lg w-full max-w-[400px] border-slate-500 outline-slate-200 outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
  );
};

export default Search;
