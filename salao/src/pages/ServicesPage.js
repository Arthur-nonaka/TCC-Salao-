import {useState} from 'react';

import Table from "../components/Table";

function ServicesPage () {
    const [services,setExpenses] = useState([]);
    const config = [];

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Table data={services} config={config}/>
        </div>
    );
};

export default ServicesPage;