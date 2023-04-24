import { useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';

function FunctionsBar({ registerPage, type, values, handleReset }) {
    const [showRegister, setShowRegister] = useState(false);

    const handleShowRegister = () => {
        setShowRegister(!showRegister);
    };

    let doAnother;

    const register = () => {
        axios.post('/register', { values, type })
            .then(res => {
                if (doAnother === true) {
                } else {
                    handleShowRegister();
                    handleReset();
                }
            })
            .catch(err => {
                if(err.response.status === 400) {
                    alert(err.response.data.errorMessage);
                }
                handleShowRegister();
            });
    }

    const handleClickRegisterAgain = (event) => {
        event.preventDefault();
        doAnother = true;
        register();
    };

    const handleClickRegister = (event) => {
        event.preventDefault();
        doAnother = false;
        for (let x = 0; x < Object.values(values).length; x++) {
            if (Object.values(values)[x] === "") {
                alert("informe todos os valores");
                return;
            }
        }
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
                                    <button onClick={handleClickRegisterAgain} type='submit' className="btn p-2 fs-7 button ms-2">Cadastrar Outro !Beta!</button>
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