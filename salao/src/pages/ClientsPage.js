import EditDeleteContext from '../context/EditDelete';
import { useState, useContext } from 'react';

import Table from "../components/Table";

function ClientsPage() {
    const { handleEdit, handleDelete } = useContext(EditDeleteContext);

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
                <div>
                    <button onClick={handleChangeEdit}>Editar</button>
                    <button onClick={() => handleDelete(client.code, type)}>Excluir</button>
                </div>
            }
        }
    ];


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>

            <Table data={clients} config={config} />


        </div>
    );
};

export default ClientsPage;