import { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

function ShowRow({ index, row }) {
    const [showEdit, setShowEdit] = useState(false);

    // let cells = cells.entries(row); 
    // cells.forEach(cell => {
    //     console.log(cell);
    // });

    const handleClickEdit = () => {
        setShowEdit(!showEdit);
    };

    let content =
        <tr>
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.fone}</td>
            <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary me-1  " onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => { }}><BsFillTrash3Fill fontSize={13} /></button>
            </td>
        </tr>

    if (showEdit) {
        content =
            <tr>
                <td>{row.code}</td>
                <td><input value={row.name} style={{ height: '23px' }} /></td>
                <td><input value={row.fone} style={{ height: '23px' }} /></td>
                <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary me-1  " onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => { }}><BsFillTrash3Fill fontSize={13} /></button>
                </td>
            </tr>

    }



    return content;

};

export default ShowRow;