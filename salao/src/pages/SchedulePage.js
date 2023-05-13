import { BsFillPlusCircleFill } from "react-icons/bs";

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';
import Message from '../components/Message';
import SearchTerm from '../components/SearchTerm';

function SchedulePage() {
    const [date, setDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [clientSelected, setClientSelected] = useState('');
    const [servicesSelected, setServicesSelected] = useState([{}]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    // const [servicesQuantity, setServicesQuantity] = useState(0);
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
    const handleSelectClient = (event) => {
        setClientSelected(event.target.value);
    };
    const handleSelectService = (event) => {
        setServicesSelected([...servicesSelected, { code: event.target.value }]);
    };
    // const handleNewClick = (event) => {
    //     event.preventDefault();
    //     setServicesSelected([...servicesSelected, {}]);
    // };

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
    const optionsClient = clients.map((client) => {
        return <option key={client.cli_codigo} value={client.cli_codigo}>
            {client.cli_nome}
        </option>
    });

    const listServices = servicesSelected.map((serviceSelected) => {
        const teste = services.map((service) => {
            return (
                <option key={service.ser_codigo} value={service.ser_codigo}>
                    {service.ser_nome}
                </option>
            );
        });
        return (
            <select className="form-control p-2 input" onInput={handleSelectService}>
                {teste}
            </select>
        );
    });

    const registerPage = <div>
        <div className='form-group m-2 w-auto me-1'>
            <label className='fs-6 mb-1' > Cliente </label>
            <select className="form-control p-2 input" onInput={handleSelectClient}>
                {optionsClient}
            </select>
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
            {listServices}
            {/* <button className="btn mt-2" style={{ color: "#FBACC7" }} onClick={handleNewClick}> <BsFillPlusCircleFill /> </button> */}
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