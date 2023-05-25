import { useState } from "react";
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import ShowRow from "./ShowRow";


function Table({ data, config, type, handleReset, size, editButtonFocus, accordion }) {
    const [pageNumber, setPageNumber] = useState(1);

    const handleLeftClick = () => {
        setPageNumber(pageNumber - 1);
    };
    const handleRightClick = () => {
        setPageNumber(pageNumber + 1);
    };

    const handleInputChange = (event) => {
            setPageNumber(event.target.value);

    };

    const renderedHeader = config.map((column) => {
        if (column.header) {
            return <th style={{ width: size, padding: '0' }} key={column.label}>{column.header()}</th>
        }

        return (
            <th style={{ width: size }} key={column.label}>
                {column.label}
            </th>
        );
    });
    const updatedHeader = [...renderedHeader, <th key={"opcoes"}> </th>];


    const renderedRows = data.map((row, index) => {
        let content = <ShowRow key={index} row={row} config={config} type={type} handleReset={handleReset} editButtonFocus={editButtonFocus} accordion={accordion}/>;
        return content;
    });
    return (
        <div>
            <table className='table table-striped' style={{ margin: '0' }}>
                <thead style={{ backgroundColor: "#FBACC7" }}>
                    <tr>
                        {updatedHeader}
                    </tr>
                </thead>
                <tbody>
                    {renderedRows}
                </tbody>
            </table >
            <div className="page">
                <button onClick={handleLeftClick} className="buttonWithSymbol">
                    <BsCaretLeftFill size={19}/>
                </button>
                <input type="number" onChange={handleInputChange} style={{ width: '47px', height: '25px', fontSize: '20px',margin: '2px'}} value={pageNumber} />
                <button onClick={handleRightClick} className="buttonWithSymbol">
                    <BsCaretRightFill size={19}/>

                </button>
            </div>
        </div>
    );
}


export default Table;