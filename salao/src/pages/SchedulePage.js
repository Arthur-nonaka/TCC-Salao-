import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Table from "../components/Table";
import Title from '../components/Title';
import FunctionsBar from '../components/FunctionsBar';

function SchedulePage() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [client, setClient] = useState('');
    const [schedule, setSchedule] = useState([]);
    const currentLocation = useLocation();
    const email = currentLocation.state.email;
    const type = "Agenda";

    const handleSelectDate = (event) => {
        setDate(event.target.value);
    };
    const handleSelectTime = (event) => {
        setTime(event.target.value);
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
            .catch(err => console.log(err));
    }, [reset]);


    const config = [
        {
            label: "Cliente",
            render: (value) => value,
        },
        {
            label: "Horario",
            render: (value) => value,
        },
        {
            label: "Data",
            render: (value) => value,
        }
    ];
    const registerPage = <div>
        <div className='form-group m2 w-auto me-1'>
            <label className='fs-6 mb-1' > Cliente </label>
            <select className="form-control p-2 input" onInput={handleSelectDate}>
                <option>A</option>
                <option>B</option>
            </select>
        </div>
        <div className="form-group  m-2 w-auto me-1" >
            <label className='fs-6 mb-1' > Dia </label>
            <input type="date" className="form-control p-2 input" onInput={handleSelectDate} />
        </div>
        <div className="form-group  m-2 w-auto me-1">
            <label className='fs-6 mb-1'  > Horario </label>
            <input type="time" className="form-control p-2 input" onInput={handleSelectTime} />
        </div>
    </div>;

    const values = { date, time, client, email }
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Table data={schedule} config={config} />
            <FunctionsBar registerPage={registerPage} type={type} values={values} handleReset={handleReset} />
        </div>
    );
};

export default SchedulePage;