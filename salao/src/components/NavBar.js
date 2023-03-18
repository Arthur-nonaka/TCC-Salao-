import { Link } from '@reach/router';

function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" >Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link className='nav-link active ' to='/schedule'> Agenda</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link active' to='/clients'> Clientes</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link active' to='/products'> Produtos</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link active' to='/services'> Serviços</Link>
                        </li>
                    </ul>

                    <div className='navbar-text' >
                        <div class="nav-item">
                            <Link className='nav-link' to='/'> Sair </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;