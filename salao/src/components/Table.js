import { useState } from 'react';

import ShowRow from "./ShowRow";

function Table({ data, config, size }) {


    const renderedHeader = config.map((column, index) => {
        return (<th style={{width: size}} scope="col" key={index}>{column.label}</th>);
    });
    const updatedHeader = [...renderedHeader, <th> </th>];


    const renderedRows = data.map((row, index) => {
        return (
            <ShowRow key={index} row={row} index={index} config={config}/>);
    });
    
    return (
        <table className='table table-striped'>
            <thead style={{backgroundColor: "#ecc2c6"}}>
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