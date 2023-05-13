import { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import axios from 'axios';

function ShowRow({ row, config, type, handleReset, editButtonFocus }) {
    const [showEdit, setShowEdit] = useState(false);
    let values = Object.values(row);
    let rowCode = values.pop();
    let cells = Object.values(config);

    const handleClickEdit = () => {
        setShowEdit(!showEdit);
        editButtonFocus();
    };

    const handleClickDelete = () => {
        let r = prompt("Digite '" + values[0] + "' para confirmar o DELETE");
        if (r === values[0]) {
            axios.post('/delete', { rowCode, type })
                .then(res => {
                    handleReset();
                })
                .catch(err => {
                });
        } else {
            alert("Nao ocorreu o DELETE");
        }
    };

    const renderedRow = values.map((value, index) => {  
        return (
            <td key={index}>
                {cells[index].render(value)}
            </td>
        );
    });

    const renderedRowEdit = values.map((value, index) => {
        return (
            <td key={index}>
                <input style={{ height: '29px', width: '140px' }} value={cells[index].render(value)} />
            </td>
        );
    });


    let content =
        <tr>
            {renderedRow}
            <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                <div className='btn-group' style={{ height: '29px' }}>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
                </div>
            </td>
        </tr>
    if (showEdit) {
        content =
            <tr>
                {renderedRowEdit}
                <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <div className='btn-group' style={{ height: '29px' }}>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-success" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
                    </div>
                </td>
            </tr>

    }



    return content;

};

export default ShowRow;