import { Link } from '@reach/router';
import Button from '../components/Button'

function LoginPage() {


    return (
        <div className="container-login" >
            <div className='header-login'>
                <h1>
                    LOGO
                </h1>
            </div>

            <div className='line'></div>

            <div className='main-login'>
                <div className='login-information'>
                    <div className='input-login'>
                        <label>
                            Email
                        </label>
                        <input placeholder='Email'></input>
                    </div>

                    <div className='input-login'>
                        <label>
                            Senha
                        </label>
                        <input placeholder='Senha'></input>
                    </div>
                    <div className='button-repartition'>
                        <Link to='/schedule'><Button css="button-login"> Login </Button></Link>
                    </div>
                </div>

                <div className='line'> </div>

                <div>
                    <Link to="/signup"> <Button css="button-signup">Criar Conta</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;