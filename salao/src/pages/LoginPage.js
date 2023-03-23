import { Link } from "react-router-dom";
import Button from '../components/Button'

import '../Login.css';

function LoginPage() {


  return (
    <div className='container-fluid d-flex flex-column align-items-center h-100'>
      <main className="form-signin w-100 m-auto">
        <form className="border p-5 w-100 ">
          <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />

          <div className="form-floating">
            <input type="email" className="form-control fs-6" id="floatingInput " placeholder="name@example.com" />
            <label className="fs-5" for="floatingInput">Email </label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control fs-6" id="floatingPassword " placeholder="senha" />
            <label className="fs-5" for="floatingPassword">Senha </label>
          </div>

          <Link to='beautyflow'>
            <Button css="w-100 btn btn-lg btn-primary mt-2 fs-5" type="submit">Login</Button>
          </Link>

        </form>

        <div className='d-flex flex-row-reverse border mt-2 p-4 fs-6'>
          <Link to='/signup'>
            Criar Conta
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;