const Search = ({ searchChars }) => {
  return (
    <div>
      <input
        className="search"
        onChange={(e) => searchChars(e.target.value)}
        type="text"
        name="search"
        placeholder="Search.."
      />
    </div>
  );
};

export default Search;
