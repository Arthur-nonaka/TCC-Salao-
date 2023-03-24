import InputMask from 'react-input-mask';

function PhoneInput({ cpf, onChange }) {
    return (
            <InputMask className='form-control' mask='999.999.999-99' value={cpf} onChange={onChange}>
            </InputMask>
    );
};

export default PhoneInput;