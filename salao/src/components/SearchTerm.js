import { useState } from 'react';

import SortableTable from './SortableTable';

function SearchTerm({ data, config, size, type, handleReset, accordion}) {
    const [SearchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    let updatedData = data;
    config.forEach((column) => {
        if (!column.searchValue)
            return;
        updatedData = data.filter(value => column.searchValue(value).toLowerCase().includes(SearchTerm.toLowerCase()));
    });

    return (
        <div>
            Search:
            <input value={SearchTerm} onChange={handleInputChange}></input>
            <SortableTable data={updatedData} config={config} size={size} type={type} handleReset={handleReset} accordion={accordion}/>
        </div>
    );
};

export default SearchTerm;