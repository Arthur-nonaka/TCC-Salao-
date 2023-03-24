import InputMask from 'react-input-mask';

function PhoneInput({ phone, onChange }) {
    return (
            <InputMask className='form-control' mask='(99)99999-9999' value={phone} onChange={onChange}>
            </InputMask>
    );
};

export default PhoneInput;