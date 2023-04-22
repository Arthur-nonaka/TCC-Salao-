import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import ErrorMessage from '../components/ErrorMessage';

import '../Login.css';

function SignUpPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorShow, setErrorShow] = useState(false);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };



    const handleClick = (event) => {
        event.preventDefault();
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setErrorShow(true);
            setText('Preencha todos os campos');
        } else if (password !== confirmPassword) {
            setErrorShow(true);
            setText('Valores invalidos na senha');
        }

        else {
            const type = "user";
            axios.post('/register', {type, name, email, password})
                .then(res => {
                    setText('');
                    setErrorShow(false);
                    navigate('/');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setText(err.response.data.errorMessage);
                        setErrorShow(true);
                    } else {

                        setText(err.message);
                        setErrorShow(true);
                    }
                });
        }
    };


    return (
        <div className='container-fluid d-flex  align-items-center h-100' >
            <main className=" m-auto" style={{ width: "500px"}}>
                <div>
                    {errorShow && <ErrorMessage setErrorShow={setErrorShow}>{text}</ErrorMessage>}
                </div>
                <form className="border p-4 rounded" style={{backgroundColor: "white"}}>
                    <div className="form-group  m-2 w-auto me-1" >
                        <label className='fs-6 mb-1' > Nome </label>
                        <input type="text" className="form-control p-2 input" placeholder="Nome" onChange={handleChangeName} value={name} />
                    </div>
                    <div className="form-row d-flex">
                        <div className="form-group ms-2 w-50">
                            <label className='fs-6 mb-1'> Senha</label>
                            <input type="password" className="form-control p-2 input" placeholder='Senha' value={password} onChange={handleChangePassword} />
                        </div>
                        <div className="form-group ps-1 w-50 me-1">
                            <label className='fs-6 mb-1'> Confirmar Senha</label>
                            <input type="password" className="form-control p-2 input" placeholder='Confirmar' value={confirmPassword} onChange={handleChangeConfirmPassword} />
                        </div>
                    </div>
                    <div className="form-group  m-2 w-auto me-1">
                        <label className='fs-6 mb-1'  > Email </label>
                        <input type="text" className="form-control input" id="floatingEmail " placeholder="user@gmail.com" onChange={handleChangeEmail} value={email} />
                    </div>
                    <div className="form-row me-1 d-flex justify-content-end" >
                        <button onClick={handleClick} type="submit" className="btn p-2 fs-6 button">Cadastrar</button>
                    </div>
                </form>

                <div className='mt-2'>
                    <Link to='/' className='link'>Voltar</Link>
                </div>
            </main>
        </div>
    );
};

export default SignUpPage;