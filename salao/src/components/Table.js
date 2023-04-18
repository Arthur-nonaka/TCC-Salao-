import { useState } from 'react';

function Table({ data, config }) {


    const renderedHeader = config.map((column, index) => {
        return (<th key={index}>{column.label}</th>);
    });

    const renderedRows = data.map((row, index) => {
        return (<tr key={index}>
            <td>{row.name}</td>
            <td>{row.fone}</td>
        </tr>);
    });

    return (
        <table className='table'>
            <thead>
                <tr>
                    {renderedHeader}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table >
    );
}


export default Table;