import { useEffect, useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ search, setSearch, delay = 400 }) => {
  const [localValue, setLocalValue] = useState(search);

  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, delay, setSearch]);

  return (
    <div className="searchbar-sticky">
      <input
        className="form-control search-input"
        placeholder="Search by title or category..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
