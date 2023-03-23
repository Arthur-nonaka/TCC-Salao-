import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';


import { Outlet } from "react-router-dom";


function App() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/message")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default App;
