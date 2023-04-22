import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Table from "../components/Table";
import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';

function ClientsPage() {
    const navigate = useNavigate();
    const type = "Clientes";

    const [clients, setClients] = useState([
        { code: 1, name: 'Arthur', fone: '18997963229' },
        { code: 2, name: 'Pochita', fone: '69343882822' },
        { code: 3, name: 'Jackson', fone: '10789565575' },
        { code: 4, name: 'Erick', fone: '15345433248' },
        { code: 5, name: 'Jonas', fone: '15423445368' },
    ]);

    const config = [
        {
            label: "#",
            render: (value) => value
        },
        {
            label: "Nome",
            render: (value) => value

        },
        {
            label: "Telefone",
            render: (value) => value
        },
    ];

    // const handleDelete = (code, type) => {
    //     console.log(code);
    //     axios.post("http://localhost:8000/delete", { code, type })
    //         .then(res => {
    //             console.log(res);
    //             navigate('/beautyflow/clients');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };



    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>

            <Table data={clients} config={config} size={"10000px"}/>
            <FunctionsBar />

        </div>
    );
};

export default ClientsPage;