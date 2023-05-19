import { useState } from "react";

function ComboBox({ data, columnToTake, setData }) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    let content = <div></div>;
    if (input.length >= 1 && isFocused === true) {
        const updatedData = data.filter(value => value[columnToTake].toLowerCase().includes(input.toLowerCase()));
        const values = updatedData.map((value, index) => {
            return <div onClick={() => setData(value[columnToTake])} key={index} className="value">
                {value[columnToTake]}
            </div>
        });

        content = <div className="options-comboBox">
            {values}
        </div>;
    }
    return (
        <div className="comboBox">
            <input onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => { setIsFocused(false) }, 200)} onChange={handleInputChange} value={input} className="form-control p-2 input" id="input" />
            <div>
                {content}
            </div>
        </div>
    );
}

export default ComboBox;