import {useState} from 'react';

import Table from "../components/Table";
import Title from '../components/Title';

function ServicesPage () {
    const [services,setServices] = useState([]);
    const config = [];
    const type= "Serviços";

    return(
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Table data={services} config={config}/>
        </div>
    );
};

export default ServicesPage;