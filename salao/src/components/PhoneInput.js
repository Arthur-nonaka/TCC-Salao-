import InputMask from "react-input-mask";

function PhoneInput({  phone, onChange, classname}) {
  return (
    <InputMask
      className= {classname}
      mask="(99)99999-9999"
      value={phone}
      onChange={onChange}
    ></InputMask>
  );
}

export default PhoneInput;
