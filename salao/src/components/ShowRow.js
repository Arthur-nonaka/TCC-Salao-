import { useState, Fragment } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import axios from 'axios';

function ShowRow({ row, config, type, handleReset, editButtonFocus, accordion, handleSetEditId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [accordionContent, setAccordionContent] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    let values = Object.values(row);
    let rowCode = values.shift();


    const handleClickEdit = () => {
        setShowEdit(!showEdit);
        editButtonFocus();
    };
    const handleClickOpen = () => {
        if (accordion) {
            setIsOpen(!isOpen);
            axios.post('/pullAccordion/' + accordion, { rowCode })
                .then(res => {
                    setAccordionContent(res.data);
                })
        };
    }

    const handleClickDelete = () => {
        let r = prompt("Digite '" + values[0] + "' para confirmar o DELETE");
        if (r === values[0]) {
            axios.post('/delete/' + type, { rowCode, type })
                .then(res => {
                    handleReset();
                })
                .catch(err => {
                    alert("DELETE o agendamento PRIMEIRO");
                });
        } else {
            alert("Nao ocorreu o DELETE");
        }
    };

    const renderedAccordionContent = accordionContent.map((accordionValue, index) => {
        return <div key={index}>{Object.values(accordionValue)}</div>
    });


    const renderedCells = config.map((column, index) => {
        return (
            <td key={index} onClick={handleClickOpen}>
                <label style={{ width: '180px' }}>
                    {column.render(row)}
                </label>
            </td >
        );
    });


    const renderedCellsEdit = config.map((column, index) => {
        return (
            <td key={index}>
                <input value={column.value(row)} className='form-control input' style={{ width: '180px', padding: '1px' }} />
            </td>
        );
    });

    const renderedRow =
        <Fragment>
            <tr className='accordion'>
                {renderedCells}
                <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <div className='btn-group' style={{ height: '29px' }}>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                        <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
                    </div>
                </td>
            </tr>
            {isOpen && <div className='accordion-content'>{renderedAccordionContent}</div>}
        </Fragment>




    const renderedRowEdit =
        <tr className='accordion'>
            {renderedCellsEdit}
            <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <div className='btn-group' style={{ height: '29px' }}>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-success" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
                </div>
            </td>
        </tr>;


    return showEdit ? renderedRowEdit : renderedRow;

};

export default ShowRow;