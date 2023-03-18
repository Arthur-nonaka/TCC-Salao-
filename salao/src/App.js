import { useState, useEffect } from 'react';
import { Router, Link } from '@reach/router';

import LoginPage from './pages/LoginPage';
import SchedulePage from './pages/SchedulePage';
import SignUpPage from './pages/SignUpPage';
import ClientsPage from './pages/ClientsPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';


import './App.css'

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/message")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <Router>
                <LoginPage path="/" />
                <SignUpPage path="/signup" />
                <SchedulePage path="/schedule" />
                <ClientsPage path="/clients" />
                <ProductsPage path="/products" />
                <ServicesPage path="/services" />
            </Router>
        </div>
    );
};

export default App;
