import { useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';

function FunctionsBar({ registerPage, type, values }) {
    const [showRegister, setShowRegister] = useState(false);

    const handleShowRegister = () => {
        setShowRegister(!showRegister);
    };

    let doAnother;

    const register = () => {
        axios.post('/register', { values, type })
            .then(res => {
                console.log(res);
                if (doAnother === true) {
                    setShowRegister(true);
                } else {
                    setShowRegister(false);
                }
            })
            .catch(err => {
                console.log(err);
                setShowRegister(false);
            })
    }

    const handleClickRegisterAgain = (event) => {
        event.preventDefault();
        doAnother = true;
        register();
    };

    const handleClickRegister = (event) => {
        event.preventDefault();
        doAnother = false;
        register();
    };

    return (
        <div className="sidebar ">

            {showRegister &&
                ReactDOM.createPortal(
                    <div className='background-modal'>
                        <div className="modal-container" onClick={handleShowRegister}>
                        </div>
                        <div className="register">
                            <form className="border p-4 rounded" style={{ backgroundColor: "white", borderColor: "#E68AA5", width: "300px" }}>
                                {registerPage}
                                <div className="form-row d-flex justify-content-between" >
                                    <button onClick={handleClickRegisterAgain} type='submit' className="btn p-2 fs-7 button ms-2">Cadastrar Outro</button>
                                    <button onClick={handleClickRegister} type='submit' className="btn p-2 fs-7 button me-1">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    ,
                    document.querySelector('.modal-page')
                )
            }

            <ul className="navbar-nav mb-lg-0">
                <button onClick={handleShowRegister} className="options ">
                    Cadastrar
                </button>
            </ul>

        </div>
    );

};

export default FunctionsBar;