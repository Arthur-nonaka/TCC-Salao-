import { useState } from "react";

import SortableTable from "./SortableTable";

function SearchTerm({
  data,
  config,
  size,
  type,
  handleReset,
  accordion,
  setYear,
  setMonth,
  year,
  month,
}) {
  const [SearchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  let updatedData = data;
  config.forEach((column) => {
    if (!column.searchValue) return;
    updatedData = data.filter((value) =>
      column.searchValue(value).toLowerCase().includes(SearchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="search">
        <input value={SearchTerm} onChange={handleInputChange}></input>
      </div>
      <SortableTable
        data={updatedData}
        config={config}
        size={size}
        type={type}
        handleReset={handleReset}
        accordion={accordion}
        setYear={setYear}
        setMonth={setMonth}
        year={year}
        month={month}
      />
    </div>
  );
}

export default SearchTerm;
