import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    let currentLocation = useLocation();

    return (
        <nav className='navbar navbar-expand-lg fixed-top bg-dark' data-bs-theme='dark'>
            <div className="container-fluid">
                <a className="navbar-brand" >Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={currentLocation.pathname === '/beautyflow/schedule' ?  'nav-link text-primary' : 'nav-link '} to='schedule'> Agenda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={currentLocation.pathname === '/beautyflow/clients' ?  'nav-link text-primary' : 'nav-link '} to='clients'> Clientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={currentLocation.pathname === '/beautyflow/products' ?  'nav-link text-primary' : 'nav-link '} to='products'> Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={currentLocation.pathname === '/beautyflow/services' ?  'nav-link text-primary' : 'nav-link '} to='services'> Serviços</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={currentLocation.pathname === '/beautyflow/expenses' ?  'nav-link text-primary' : 'nav-link '} to='expenses'> Despesas</Link>
                        </li>
                    </ul>

                    <div className='navbar-nav' >
                        <div className='nav-item'>
                            <Link className='nav-link' to='/'> Sair </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;