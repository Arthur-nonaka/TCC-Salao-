import PhoneInput from '../components/PhoneInput';
import CPFInput from '../components/CPFInput';

import { useState } from 'react';
import { Link } from 'react-router-dom'

import '../Login.css';

function SignUpPage() {
    const [phone, setPhone] = useState('');
    const [cpf, setcpf] = useState('');


    const handleChangePhone = (event) => {
        setPhone(event.target);
    };

    const handleChangeCPF = (event) => {
        setcpf(event.target);
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
                                <input type="text" className="form-control " id="floatingPassword " placeholder="user@gmail.com" />
                                <label for="floatingEmail"> Email</label>
                            </div>
                        </div>
                        <div className="form-group ps-1 w-50 me-1">
                            <div className="form-floating">
                                <input type="password" className="form-control " id="floatingPassword " placeholder="Senha" />
                                <label for="floatingPassword"> Senha</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group m-2 me-1">
                        <div className="form-floating">
                            <PhoneInput value={phone} onChange={handleChangePhone}>
                            </PhoneInput>
                            <label for="floatingEmail"> Telefone </label>
                        </div>
                    </div>
                    <div className="form-group m-2 me-1 mb-3">
                        <div className="form-floating">
                            <CPFInput value={cpf} onChange={handleChangeCPF}>
                            </CPFInput>
                            <label for="floatingEmail"> CPF </label>
                        </div>
                    </div>
                    <div className="form-row me-1 d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary p-2 fs-5">Sign in</button>
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