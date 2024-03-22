import FilterHeading from "../filter/FilterHeading";
import FilterOptions from "../filter/FilterOptions";

export default function SearchFilter() {
  return (
    <div className="search-contents__filter">
      <FilterHeading />
      <FilterOptions />
    </div>
  );
}
