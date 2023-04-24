import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

import Message from '../components/Message';
import PhoneInput from '../components/PhoneInput';
import Table from "../components/Table";
import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';

function ClientsPage() {
    const [name, setName] = useState('');
    const [fone, setFone] = useState('');
    const currentLocation = useLocation();
    const email = currentLocation.state.email;
    const type = "Clientes";
    
    const [reset, setReset] = useState(false);
    const handleReset = () => {
        setReset(!reset);
    }

    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.post('/pull', { email, type })
            .then(res => {
                setClients(res.data);
            })
            .catch(err => console.log(err));
    }, [reset, email]);


    const config = [
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

    const registerPage = <div>
        <div className="form-group  m-2 w-auto me-1" >
            <label className='fs-6 mb-1' > Nome </label>
            <input type="text" className="form-control p-2 input" placeholder="Nome" onChange={handleChangeName} value={name} />
        </div>
        <div className="form-group  m-2 w-auto me-1">
            <label className='fs-6 mb-1'  > Telefone </label>
            <PhoneInput value={fone} onChange={handleChangeFone} />
        </div>
    </div>;


    const values = { name, fone, email };
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Table data={clients} config={config} size={"10000px"} type={type} handleReset={handleReset}/>
            <FunctionsBar registerPage={registerPage} type={type} values={values} handleReset={handleReset}/>

        </div>
    );
};

export default ClientsPage;