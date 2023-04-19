import { useState } from 'react';
import axios from 'axios';

import Table from "../components/Table";
import { useNavigate } from 'react-router-dom';

function ClientsPage() {
    const navigate = useNavigate();
    const type = "client";

    const [editShow, setEditShow] = useState(false);

    const [clients, setClients] = useState([
        { code: 1, name: 'Arthur', fone: '18997963229' },
        { code: 2, name: 'Pochita', fone: '69343882822' },
        { code: 3, name: 'Jackson', fone: '107895655745' },
    ]);

    const showInput = (client) => {
        if (editShow) {
            return <input value={client.name} />

        }
        return client.name;

    }

    const config = [
        {
            label: "#",
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
    ];

    const handleEdit = (code, type) => {
        setEditShow(!editShow);
    };

    const handleDelete = (code, type) => {
        console.log(code);
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