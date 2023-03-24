import PhoneInput from '../components/PhoneInput';
import CPFInput from '../components/CPFInput';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import '../Login.css';

function SignUpPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleChangePassword = (event) => {
        setPassword(event.target);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target);
    };

    const handleClick = () => {
        if(password !== confirmPassword) {
            alert('Batata');
        } else {
            navigate('schedule');
        }
    };

    return (
        <div className='container-fluid d-flex  align-items-center h-100'>
            <main className=" m-auto" style={{ width: "1000px" }}>
                <form className="border p-5 ">
                    <div class="form-group  m-2 w-auto me-1">
                        <div className="form-floating">
                            <input type="text" className="form-control " id="floatingPassword " placeholder="First Name" />
                            <label for="floatingEmail"> Nome </label>
                        </div>
                    </div>
                    <div className="form-row d-flex">
                        <div className="form-group ms-2 w-50">
                            <div className="form-floating">
                                <input type="password" className="form-control " id="floatingPassword " placeholder="Senha" value={password} onChange={handleChangePassword}/>
                                <label for="floatingPassword"> Senha</label>
                            </div>
                        </div>
                        <div className="form-group ps-1 w-50 me-1">
                            <div className="form-floating">
                                <input type="password" className="form-control " id="floatingPassword " placeholder="Senha" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                                <label for="floatingPassword"> Confirmar Senha</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group  m-2 w-auto me-1">
                        <div className="form-floating">
                            <input type="text" className="form-control " id="floatingPassword " placeholder="user@gmail.com" />
                            <label for="floatingEmail"> Email </label>
                        </div>
                    </div>
                    <div className="form-row me-1 d-flex justify-content-end">
                        <button onClick={handleClick} type="submit" class="btn btn-primary p-2 fs-5">Sign in</button>
                    </div>
                </form>

                <div className='mt-2'>
                    <Link to='/'>Voltar</Link>
                </div>
            </main>
        </div>
    );
};

export default SignUpPage;