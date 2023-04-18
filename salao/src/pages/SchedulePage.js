import {useState} from 'react';

import Table from "../components/Table";

function SchedulePage() {
    const [schedule,setExpenses] = useState([]);
    const config = [];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Table data={schedule} config={config}/>
        </div>
    );
};

export default SchedulePage;