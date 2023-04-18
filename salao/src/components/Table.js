function Table({ data, config }) {


    const renderedHeader = config.map((column, index) => {
        return (<th key={index}>{column.label}</th>);
    });

    const renderedRows = data.map((row, index) => {
        const renderedCells = config.map((cell, index) => {
            return (
                <td key={index}>{cell.render(row)}</td>
            );

        })
        return (<tr key={index}>
            {renderedCells}
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