import { useState } from 'react';

function Table({ data,config }) {


    const renderedHeader = config.map((header,index) => {
        return (<th key={index}>{header.label}</th>);
    });
    const renderedRows = data.map((row,index) => {
        return(<tr key={index}>
            <td>{row.name}</td>
            <td>{row.fone}</td>
        </tr>);
    });

    return (
        <table className='table'>
            <tbody>
                {renderedHeader}
                {renderedRows}
            </tbody>
        </table>
    );
}


export default Table;