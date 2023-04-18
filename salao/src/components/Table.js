import { useState } from 'react';

function Table({ data }) {

    return (
        <table>
            <tbody>
                {data.map((row, index) => {
                    console.log(row);
                    return (
                        <tr key={index}>
                            <td>{row.name}</td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}


export default Table;