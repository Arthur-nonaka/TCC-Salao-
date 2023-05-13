import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';
import Message from '../components/Message';
import SearchTerm from '../components/SearchTerm';


function ServicesPage() {
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [tipo, setTipo] = useState('');
    const [messageShow, setMessageShow] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const currentLocation = useLocation();
    const email = currentLocation.state.email;

    const type = "Serviços";

    const [reset, setReset] = useState(false);
    const handleReset = () => {
        setReset(!reset);
    }

    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.post('/pull', { email, type })
            .then(res => {
                setServices(res.data);
            })
            .catch(err => {
                setMessageType('error');
                setMessage(err);
                setMessageShow(true);
            });
    }, [reset, email]);

    const config = [
        {
            label: "Descricao",
            render: (value) => value,
            sortValue: (value) => value.ser_descricao,
            searchValue: (value) => value.ser_descricao
        },
        {
            label: "Preço",
            render: (value) => <div>R$ {value}</div>,
            sortValue: (value) => value.ser_preco,
        },
        {
            label: "Tipo",
            render: (value) => value,
            equal: (value) => value.ser_tipo.toLowerCase(),
        }
    ];

    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    }


    const registerPage = <div>
        <div className="form-group m-2me-1 " >
            <div>
                <label className='fs-6 mb-1' > Descricao </label>
                <input type="text" className="form-control p-2 input" placeholder="Descricao" onChange={handleChangeDesc} value={desc} />
            </div>
        </div>
        <div className="form-group mb-2 w-auto me-1 d-flex flex-row">
            <div className='me-1 '>
                <label className='fs-6 mb-1' > Tipo </label>
                <input type="text" className="form-control p-2 input" placeholder="Tipo" onChange={handleChangeTipo} value={tipo} />
            </div>
            <div>
                <label className='fs-6 mb-1' > Preco </label>
                <input type="number" className="form-control p-2 input" onChange={handleChangePrice} value={price} />
            </div>
        </div>
    </div>;

    const values = { desc, price, tipo, email };
    const valuesToReset = [setDesc, setTipo, setPrice];
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Message setMessageShow={setMessageShow} messageShow={messageShow} messageType={messageType} message={message} />
            <SearchTerm data={services} setClients={setServices} config={config} size={"10000px"} type={type} handleReset={handleReset} />
            <FunctionsBar valuesToReset={valuesToReset} registerPage={registerPage} type={type} values={values} handleReset={handleReset} setMessage={setMessage} setMessageShow={setMessageShow} setMessageType={setMessageType} />

        </div>
    );
};

export default ServicesPage;