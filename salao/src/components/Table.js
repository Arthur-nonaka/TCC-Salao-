import ShowRow from "./ShowRow";

function Table({ data, config, type, handleReset, size, editButtonFocus }) {

    const renderedHeader = config.map((column) => {
        if (column.header) {
            return <th style={{ width: size, padding: '0' }} key={column.label}>{column.header()}</th>
        }

        return (
            <th style={{width: size}} key={column.label}>
                {column.label}
            </th>
        );
    });
    const updatedHeader = [...renderedHeader, <th key={"opcoes"}> </th>];


    const renderedRows = data.map((row, index) => {
        return (
            <ShowRow key={index} row={row} config={config} type={type} handleReset={handleReset} editButtonFocus={editButtonFocus}/>);
    });

    return (
        <table className='table table-striped'>
            <thead style={{ backgroundColor: "#FBACC7" }}>
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