import { useState } from 'react';

import ShowRow from "./ShowRow";

function Table({ data, config }) {


    const renderedHeader = config.map((column, index) => {
        return (<th scope="col" key={index}>{column.label}</th>);
    });
    const updatedHeader = [...renderedHeader, <th> </th>];


    const renderedRows = data.map((row, index) => {

        return (
            <ShowRow key={index} row={row} index={index} />);
    });
    
    return (
        <table className='table table-striped table-primary container-sm'>
            <thead>
                <tr>
                    {updatedHeader}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table >
    );
}


export default Table;