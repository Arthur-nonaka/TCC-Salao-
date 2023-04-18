import {useState} from 'react';

import Table from "../components/Table";

function ProductsPage() {
    const [products,setExpenses] = useState([]);
    const config = [];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Table data={products} config={config}/>
        </div>
    );
};

export default ProductsPage;