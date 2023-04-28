import {useState} from 'react';

import Table from "../components/Table";
import Title from '../components/Title';

function ProductsPage() {
    const [products,setProducts] = useState([]);
    const config = [];
    const type= "Produtos";

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "column", width: '100vw', height: '100vh' }}>
            <Title type={type}></Title>
            <Table data={products} config={config}/>
        </div>
    );
};

export default ProductsPage;