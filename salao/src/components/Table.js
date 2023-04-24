import ShowRow from "./ShowRow";

function Table({ data, config, size, type, handleReset }) {


    const renderedHeader = config.map((column, index) => {
        return (<th style={{width: size}} scope="col" key={index}>{column.label}</th>);
    });
    const updatedHeader = [...renderedHeader, <th> </th>];


    const renderedRows = data.map((row, index) => {
        return (
            <ShowRow key={index} row={row} index={index} config={config} type={type} handleReset={handleReset}/>);
    });
    
    return (
        <table className='table table-striped'>
            <thead style={{backgroundColor: "#FBACC7"}}>
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