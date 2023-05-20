import { BsFillPlusCircleFill } from "react-icons/bs";

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';
import Message from '../components/Message';
import SearchTerm from '../components/SearchTerm';
import ComboBox from "../components/ComboBox";

function SchedulePage() {
    const [date, setDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [clientSelected, setClientSelected] = useState('');
    const [servicesSelected, setServicesSelected] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [messageShow, setMessageShow] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const currentLocation = useLocation();
    const email = currentLocation.state.email;
    const type = "Agenda";

    const handleSelectDate = (event) => {
        setDate(event.target.value);
    };
    const handleSelectTimeStart = (event) => {
        setTimeStart(event.target.value);
    };
    const handleSelectTimeEnd = (event) => {
        setTimeEnd(event.target.value);
    };

    const handleDeleteClick = (value) => {
        setServicesSelected(oldValues => {
            return oldValues.filter(service => service !== value)
        })
    };

    const [reset, setReset] = useState(false);
    const handleReset = () => {
        setReset(!reset);
    }

    useEffect(() => {
        axios.post('/pull', { email, type })
            .then(res => {
                setSchedule(res.data);
            })
            .catch(err => {
                setMessageType('error');
                setMessage(err);
                setMessageShow(true);
            });
        axios.post('/pull', { email, type: "Clientes" })
            .then(res => {
                setClients(res.data);
            })
            .catch(err => {
                setMessageType('error');
                setMessage(err);
                setMessageShow(true);
            });
        axios.post('/pull', { email, type: "Serviços" })
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
            label: "Cliente",
            render: (value) => value,
        },
        {
            label: "Data",
            render: (value) => value,
        },
        {
            label: "Horario",
            render: (value) => <div>{value.age_horario} : {value.age_horarioTermino}</div>,
        },
    ];


    const listServices = servicesSelected.map((service, index) => {
        return (
            <div onClick={() => handleDeleteClick(service)} className="option-selected" key={index}>
                {service} <label>X</label>
            </div>
        );
    });

    let client = <ComboBox data={clients} columnToTake={"cli_nome"} setDataSelected={setClientSelected} dataSelected={clientSelected} />;
    if (clientSelected !== '') {
        client = <div onClick={() => setClientSelected('')} className="option-selected"> {clientSelected} <label>X</label></div>;
    }

    const registerPage = <div>
        <div className='form-group m-2 w-auto me-1'>
            <label className='fs-6 mb-1' > Cliente </label>
            {client}
        </div>
        <div className="form-group w-auto d-flex flex-row justify-content-between m-2">
            <div className="form-group w-auto me-1" >
                <label className='fs-6 mb-1' > Dia </label>
                <input type="date" className="form-control p-2 input" onInput={handleSelectDate} />
            </div>
            <div>
                <label className='fs-6 mb-1'  > Começo </label>
                <input type="time" className="form-control p-2 input" onInput={handleSelectTimeStart} />
            </div>
            <div>
                <label className='fs-6 mb-1'  > Termino </label>
                <input type="time" className="form-control p-2 input" onInput={handleSelectTimeEnd} />
            </div>
        </div>
        <div className='form-group m-2 w-auto me-1'>
            <label className='fs-6 mb-1' > Serviços </label>
            <ComboBox data={services} columnToTake={"ser_nome"} setDataSelected={setServicesSelected} dataSelected={servicesSelected} />
            {listServices}
        </div>
    </div>;

    const values = { date, timeStart, timeEnd, clientSelected, servicesSelected, email };
    const valuesToReset = { setDate, setTimeStart, setTimeEnd, setClientSelected, setServicesSelected };
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Message setMessageShow={setMessageShow} messageShow={messageShow} messageType={messageType} message={message} />
            <SearchTerm data={schedule} config={config} size={"10000px"} type={type} handleReset={handleReset} />
            <FunctionsBar width={'420px'} valuesToReset={valuesToReset} registerPage={registerPage} type={type} values={values} handleReset={handleReset} setMessage={setMessage} setMessageShow={setMessageShow} setMessageType={setMessageType} />
        </div>
    );
};

export default SchedulePage;