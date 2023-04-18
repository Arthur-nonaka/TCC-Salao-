import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';


import { Outlet } from "react-router-dom";


function App() {

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default App;
