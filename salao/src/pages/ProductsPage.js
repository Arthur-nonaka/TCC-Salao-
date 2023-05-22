import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';
import Message from '../components/Message';
import SearchTerm from '../components/SearchTerm';
import ComboBox from "../components/ComboBox";

function ProductsPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');


    const [products, setProducts] = useState([]);

    const [messageShow, setMessageShow] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const currentLocation = useLocation();
    const email = currentLocation.state.email;
    const type = "Produtos";


    const [reset, setReset] = useState(false);
    const handleReset = () => {
        setReset(!reset);
    };

    useEffect(() => {
        axios.post('/pull', { email, type })
            .then(res => {
                setProducts(res.data);
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
            sortValue: (value) => value.pro_nome,
            SearchTerm: (value) => value.pro_nome
        },
        {
            label: "Preço",
            render: (value) => value,
            sortValue: (value) => value.pro_preco
        },
        {
            label: "Quantidade",
            render: (value) => value,
            sortValue: (value) => value.pro_quantidade
        }
    ];

    const handlePriceChange = (event) => {
        if (event.target.value >= 0) {
            setPrice(event.target.value)
        }
        else {
            setPrice(price)
        }
    };
    const handleAmountChange = (event) => {
        if (event.target.value >= 0) {
            setAmount(event.target.value)
        }
        else {
            setAmount(amount);
        }
    };

    const registerPage = <div>
        <div className="form-group  m-2 w-auto me-1" >
            <label className='fs-6 mb-1' > Nome </label>
            <input type="text" className="form-control p-2 input" placeholder="Nome" onChange={(event) => setName(event.target.value)} value={name} />
        </div>
        <div className="form-group mb-2 m-2 w-auto me-1 d-flex flex-row">
            <div className='me-1'>
                <label className='fs-6 mb-1'> Preço </label>
                <input type="number" className="form-control p-2 input" placeholder='Preço' onChange={handlePriceChange} value={price} />
            </div>
            <div>
                <label className='fs-6 mb-1'> Quantidade </label>
                <input type="number" className="form-control p-2 input" placeholder='Quantidade' onChange={handleAmountChange} value={amount} />
            </div>
        </div>
        <div className="form-group  m-2 w-auto me-1" >
            <label className='fs-6 mb-1' > Descrição </label>
            <textarea type="text" className="form-control p-2 input" placeholder="Descrição" onChange={(event) => setDesc(event.target.value)} value={desc} />
        </div>
    </div>;

    const values = { name, price, amount, desc }
    const resetValues = () => {
        setName('');
        setPrice('');
        setAmount('');
        setDesc('');
    };
    return (
        <div className='main'>
            <Title type={type}></Title>
            <Message setMessageShow={setMessageShow} messageShow={messageShow} messageType={messageType} message={message} />
            <SearchTerm data={products} config={config} size={"10000px"} type={type} handleReset={handleReset} />
            <FunctionsBar width={""} registerPage={registerPage} resetValues={resetValues} values={values} type={type} handleReset={handleReset} setMessageType={setMessageType} />
        </div>
    );
};

export default ProductsPage;