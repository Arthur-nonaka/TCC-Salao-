import ReactDOM from "react-dom";

function Register() {

    return ReactDOM.createPortal(
        <div className="modal-container" >
            <div className="register">
                Batata
            </div>
        </div>,
        document.querySelector('.modal-page')
    );
};

export default Register;