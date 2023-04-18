import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import SchedulePage from './pages/SchedulePage';
import SignUpPage from './pages/SignUpPage';
import ClientsPage from './pages/ClientsPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ExpensesPage from "./pages/ExpensesPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
                <Route path="beautyflow/" element={<App />}>
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="clients" element={<ClientsPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="expenses" element={<ExpensesPage />} />
                </Route>




        </Routes>
    </BrowserRouter>

);