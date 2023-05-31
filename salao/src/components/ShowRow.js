import { useState, Fragment } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import axios from 'axios';

function ShowRow({ row, config, type, handleReset, editButtonFocus, accordion }) {
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
        setIsOpen(!isOpen);
        axios.post('/pullAccordion', { rowCode, accordion })
            .then(res => {
                setAccordionContent(res.data);
            })
    }

    const handleClickDelete = () => {
        let r = prompt("Digite '" + values[0] + "' para confirmar o DELETE");
        if (r === values[0]) {
            axios.post('/delete', { rowCode, type })
                .then(res => {
                    handleReset();
                })
                .catch(err => {
                    console.log(err);
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
                {column.render(row)}
            </td>
        );
    });
    const renderedCellsEdit = config.map((column, index) => {
        return (
            <td key={index} onClick={handleClickOpen}>
                <input value={column.render(row)} />
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
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
                </div>
            </td>
        </tr>;


    // const renderedRow = row.map((value, index) => {
    //     const renderedCells = config.map((column, index) => {
    //         return (
    //             <td key={index} onClick={handleClickOpen}>
    //                 {column.render(value)}
    //             </td>
    //         );
    //     });

    //     return (
    //         <tr key={index} className='accordion'>
    //             {renderedCells}
    //             <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
    //                 <div className='btn-group' style={{ height: '29px' }}>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
    //                 </div>
    //             </td>
    //             {isOpen && <td className='accordion-content'>{renderedAccordionContent}</td>}
    //         </tr>
    //     );
    // });



    // const renderedRowEdit = row.map((value, index) => {
    //     const renderedCells = config.map((column, index) => {
    //         return (
    //             <td key={index} onClick={handleClickOpen}>
    //                 <input style={{ height: '29px', width: '140px' }} value={column.render(value)} />
    //             </td>
    //         );
    //     })
    //     return (
    //         <tr key={index}>
    //             {renderedCells}
    //             <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
    //                 <div className='btn-group' style={{ height: '29px' }}>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
    //                 </div>
    //             </td>
    //         </tr>
    //     );

    // });
    //-----------------------------------------------------------------------------------------------------------------

    // const renderedRowEdit = values.map((value, index) => {
    //     let x = <div></div>
    //     config.forEach((column) => {
    //         x = <td key={index}>
    //             <input style={{ height: '29px', width: '140px' }} value={column.render(value)} />
    //         </td>
    //     });
    //     return x;
    // });



    // let content =
    //     <tr className='accordion'>
    //         {renderedRow}
    //         <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
    //             <div className='btn-group' style={{ height: '29px' }}>
    //                 <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-primary" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
    //                 <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
    //             </div>
    //         </td>
    //         {isOpen && <td className='accordion-content'>{renderedAccordionContent}</td>}
    //     </tr>
    // if (showEdit) {
    //     content =
    //         <tr>
    //             {renderedRowEdit}
    //             <td style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
    //                 <div className='btn-group' style={{ height: '29px' }}>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-success" onClick={() => handleClickEdit()}><BsPencilFill fontSize={13} /> </button>
    //                     <button style={{ display: "flex", alignItems: 'center', justifyContent: "center" }} className="btn btn-danger" onClick={() => handleClickDelete()}><BsFillTrash3Fill fontSize={13} /></button>
    //                 </div>
    //             </td>
    //         </tr>
    // }


    return showEdit ? renderedRowEdit : renderedRow;

};

export default ShowRow;