import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button';

import '../Login.css';

function SignUpPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorShow, setErrorShow] = useState(false);
    
    const navigate = useNavigate();


    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleClick = (event) => {
        if(password !== confirmPassword) {
            event.preventDefault();
            setErrorShow(true);
            setPassword('');
            setConfirmPassword('');
        } else {
            navigate('../beautyflow');
        }
    };

    const handleCloseError = () => {
        setErrorShow(false);
    };

    const content = <div className="border p-4 bg-danger d-flex justify-content-between align-items-center mb-2 rounded" style={{color: 'rgb(100, 31, 31)'}} >
        Valores das senhas estavam incorretos 
        <div className='Xbutton' onClick={handleCloseError}>
            X
        </div>
    </div>;

    return (
        <div className='container-fluid d-flex  align-items-center h-100'>
            <main className=" m-auto" style={{ width: "1000px" }}>
                <div>
                    {errorShow && content}
                </div>
                <form className="border p-4 rounded">
                    <div class="form-group  m-2 w-auto me-1">
                            <label className='fs-6 mb-1'> Nome </label>
                            <input type="text" className="form-control p-2 " placeholder="Nome" />
                    </div>
                    <div className="form-row d-flex">
                        <div className="form-group ms-2 w-50">
                                <label className='fs-6 mb-1'> Senha</label>
                                <input type="password" className="form-control p-2" placeholder='Senha' value={password} onChange={handleChangePassword}/>
                        </div>
                        <div className="form-group ps-1 w-50 me-1">
                                <label className='fs-6 mb-1'> Confirmar Senha</label>
                                <input type="password" className="form-control p-2" placeholder='Confirmar Senha'  value={confirmPassword} onChange={handleChangeConfirmPassword} />
                        </div>
                    </div>
                    <div class="form-group  m-2 w-auto me-1">
                            <label className='fs-6 mb-1' > Email </label>
                            <input type="text" className="form-control " id="floatingEmail " placeholder="user@gmail.com" />
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