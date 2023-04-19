import { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

function ShowRow({ index, row, config }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleClickEdit = () => {
        setShowEdit(!showEdit);
    };

    let values = Object.values(row);
    let cells = Object.values(config);

    const renderedRow = values.map((value, index) => {

        return (
            <td key={index}>
                {cells[index].render(value)}
            </td>
        );
    });

    const renderedRowEdit = values.map((value, index) => {

        if (index === 0) {
            return <td key={index}>{cells[index].render(value)}</td>
        }
        return (
            <td key={index}>
                <input style={{height: '23px'}} value={cells[index].render(value)} />
            </td>
        );
    });


    let content =
        <tr>
            {renderedRow}
            <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <div className='btn-group'>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => { }}><BsFillTrash3Fill fontSize={13} /></button>
                </div>
            </td>
        </tr>

    if (showEdit) {
        content =
            <tr>
                {renderedRowEdit}
                <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <div className='btn-group'>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-success" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => { }}><BsFillTrash3Fill fontSize={13} /></button>
                    </div>
                </td>
            </tr>

    }



    return content;

};

export default ShowRow;