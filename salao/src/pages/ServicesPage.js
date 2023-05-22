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
    const [nome, setNome] = useState('');
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
            label: "Nome",
            render: (value) => value,
            sortValue: (value) => value.ser_nome,
            searchValue: (value) => value.ser_nome
        },
        {
            label: "Preço",
            render: (value) => <div>R$ {value}</div>,
            sortValue: (value) => value.ser_preco,
        },
        {
            label: "Descrição",
            render: (value) => value,
        }
    ];

    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    };
    const handleChangePrice = (event) => {
        if (event.target.value >= 0) {
            setPrice(event.target.value);
        }
        else {
            setPrice(price);
        }
    };
    const handleChangeNome = (event) => {
        setNome(event.target.value);
    }


    const registerPage = <div>
        <div className="form-group mb-2 m-2 w-auto me-1 d-flex flex-row" >
            <div className='me-1'>
                <label className='fs-6 mb-1 me' > Nome </label>
                <input type="text" className="form-control p-2 input" placeholder="Nome" onChange={handleChangeNome} value={nome} />
            </div>
            <div>
                <label className='fs-6 mb-1' > Preço </label>
                <input type="number" className="form-control p-2 input" placeholder='Preço' onChange={handleChangePrice} value={price} />
            </div>
        </div>
        <div className="form-group mb-2 w-auto me-1 m-2" >
            <label className='fs-6 mb-1' > Descricao </label>
            <textarea className="form-control p-2 input" placeholder="Descricao" onChange={handleChangeDesc} value={desc} />
        </div>
    </div>;

    const values = { desc, price, nome, email };
    const resetValues = () => {
        setDesc('');
        setNome('');
        setPrice('');
    };
    return (
        <div className='main'>
            <Title type={type}></Title>
            <Message setMessageShow={setMessageShow} messageShow={messageShow} messageType={messageType} message={message} />
            <SearchTerm data={services} config={config} size={"10000px"} type={type} handleReset={handleReset} />
            <FunctionsBar width={'340px'} resetValues={resetValues} registerPage={registerPage} type={type} values={values} handleReset={handleReset} setMessage={setMessage} setMessageShow={setMessageShow} setMessageType={setMessageType} />

        </div>
    );
};

export default ServicesPage;