import { Link } from '@reach/router';
import Button from '../components/Button'

import '../Login.css';

function LoginPage() {


  return (
    <div className='container-fluid d-flex flex-column'>
      <main class="form-signin w-100 m-auto">
        <form className="border p-5 w-100 ">
          <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />

          <div class="form-floating">
            <input type="email" class="form-control fs-6" id="floatingInput " placeholder="name@example.com" />
            <label class="fs-5" for="floatingInput">Email </label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control fs-6" id="floatingPassword " placeholder="Senha" />
            <label class="fs-5" for="floatingPassword">Senha</label>
          </div>

          <Link to='/schedule'>
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