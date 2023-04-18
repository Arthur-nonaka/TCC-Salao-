import { useState } from 'react';
import axios from 'axios';

import Table from "../components/Table";
import { Navigate, useNavigate } from 'react-router-dom';

function ClientsPage() {
    const navigate = useNavigate();
    const type = "client";

    const [clients, setClients] = useState([
        { code: 1, name: 'Arthur', fone: '18997963229' },
        { code: 2, name: 'Pochita', fone: '69343882822' },
        { code: 3, name: 'Jackson', fone: '107895655745' },
    ]);
    const config = [
        {
            label: "Código",
            render: (client) => client.code
        },
        {
            label: "Nome",
            render: (client) => client.name
        },
        {
            label: "Telefone",
            render: (client) => client.fone
        },
        {
            label: "***",
            render: (client) => {
                return (
                    <div className=''>
                        <button className="" onClick={() => handleEdit(client.code, type)}>Editar</button>
                        <button className="" onClick={() => handleDelete(client.code, type)}>Excluir</button>
                    </div>
                );

            }
        }
    ];

    const handleEdit = (code, type) => {

    };

    const handleDelete = (code, type) => {
        axios.post("http://localhost:8000/delete", { code, type })
            .then(res => {
                console.log(res);
                navigate('/beautyflow/clients');
            })
            .catch(err => {
                console.log(err);
            })
    };



    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>

            <Table data={clients} config={config} />


        </div>
    );
};

export default ClientsPage;