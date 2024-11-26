// components/SearchBar.tsx
import React, { useState } from "react";
interface SearchBarProps {
  onSearch: (query: string) => void;
  hiddenToggler: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, hiddenToggler }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="p-2 border rounded-l-md w-full"
        placeholder="Search tasks.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={hiddenToggler}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
