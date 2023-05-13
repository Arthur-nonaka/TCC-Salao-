import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

import PhoneInput from '../components/PhoneInput';
import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';
import Message from '../components/Message';
import SearchTerm from '../components/SearchTerm';

function ClientsPage() {
    const [name, setName] = useState('');
    const [fone, setFone] = useState('');
    const [messageShow, setMessageShow] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
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
            .catch(err => {
                setMessageType('error');
                setMessage(err);
                setMessageShow(true);
            });
    }, [reset, email]);


    const config = [
        {
            label: "Nome",
            render: (value) => value,
            sortValue: (value) => value.cli_nome,
            searchValue: (value) => value.cli_nome
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
    const valuesToReset = [setName, setFone];
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Message setMessageShow={setMessageShow} messageShow={messageShow} messageType={messageType} message={message} />
            <SearchTerm data={clients} setClients={setClients} config={config} size={"10000px"} type={type} handleReset={handleReset} />
            <FunctionsBar valuesToReset={valuesToReset} registerPage={registerPage} type={type} values={values} handleReset={handleReset} setMessage={setMessage} setMessageShow={setMessageShow} setMessageType={setMessageType} />

        </div>
    );
};

export default ClientsPage;