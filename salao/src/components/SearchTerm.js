import { useState } from 'react';

import SortableTable from './SortableTable';

function SearchTerm({ data, config, size, type, handleReset }) {
    const [SearchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const updatedData = data.filter(value => value.cli_nome.toLowerCase().includes(SearchTerm.toLowerCase()));

    return (
        <div>
            Search:
            <input value={SearchTerm} onChange={handleInputChange}></input>
            <SortableTable data={updatedData} config={config} size={size} type={type} handleReset={handleReset} />
        </div>
    );
};

export default SearchTerm;