import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDeleteContext = createContext();

function EditDeleteProvider({ children }) {
    const navigate = useNavigate();

    const handleDelete = (code, type) => {
        axios.post("http://localhost:8000/delete", { type, code })
            .then(res => {
                if (type === "client") {
                    navigate('/clients');
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    return <EditDeleteContext.Provider value={{ handleDelete, handleEdit }}>
        {children}
    </EditDeleteContext.Provider>
};

export { EditDeleteProvider };
export default EditDeleteContext;
