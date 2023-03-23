import { Link } from 'react-router-dom'

import '../Login.css';

function SignUpPage() {


    return (
        <div className='container-fluid d-flex flex-column align-items-center h-100'>
        <main class="form-signin w-100 m-auto">
            <form className="border p-5 w-100 ">
                A 
                <Link to='/'>Voltar</Link>
            </form>
        </main>
        </div>
    );
};

export default SignUpPage;