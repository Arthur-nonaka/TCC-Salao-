import { useState } from 'react';

import PhoneInput from '../components/PhoneInput';
import Table from "../components/Table";
import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';

function ClientsPage() {
    const type = "Clientes";
    const [name, setName] = useState('');
    const [fone, setFone] = useState('');

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

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeFone = (event) => {
        setFone(event.target.value);
    };

    // const handleClickRegister = () => {
    //     axios.post('/register', { name, fone, type })
    //         .then(res => {
    //             console.log(res);
    //             //fechar modal
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             //decidindo oq fazer
    //         })
    // };

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

    const registerPage = <div>
        <div className="form-group  m-2 w-auto me-1" >
            <label className='fs-6 mb-1' > Nome </label>
            <input type="text" className="form-control p-2 input" placeholder="Nome" onChange={handleChangeName} value={name} />
        </div>
        <div className="form-group  m-2 w-auto me-1">
            <label className='fs-6 mb-1'  > Telefone </label>
            <PhoneInput value={fone} onChange={handleChangeFone}/>
        </div>
    </div>;


    const values = { name, fone };
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>

            <Table data={clients} config={config} size={"10000px"} />
            <FunctionsBar registerPage={registerPage} type={type} values={values} />

        </div>
    );
};

export default ClientsPage;