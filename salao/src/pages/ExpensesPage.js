import {useState} from 'react';

import Table from "../components/Table";
import Title from '../components/Title';

function ExpensesPage() {
    const [expenses,setExpenses] = useState([]);
    const config = [];
    const type = "Despesas";


    return(
        <div className='main'>
            <Title type={type}></Title>
            <Table data={expenses} config={config}/>
        </div>
    );
}

export default ExpensesPage;