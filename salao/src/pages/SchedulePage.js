import {useState} from 'react';

import Table from "../components/Table";
import Title from '../components/Title';

function SchedulePage() {
    const [schedule,setExpenses] = useState([]);
    const config = [];
    const type="Agenda";

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Table data={schedule} config={config}/>
        </div>
    );
};

export default SchedulePage;