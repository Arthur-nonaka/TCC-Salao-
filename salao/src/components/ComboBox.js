import { useState } from "react";

function ComboBox({ data, columnToTake, setDataSelected, dataSelected }) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleValueClick = (value) => {
        if (typeof (dataSelected) !== "string") {
            const x = dataSelected.find(data => data === value);
            if (x)
                setDataSelected([...dataSelected]);
            else
                setDataSelected([...dataSelected, value]);
        }
        else
            setDataSelected(value);
        setInput('');
    };

    let content = <div></div>;
    if (isFocused === true) {
        const updatedData = data.filter(value => value[columnToTake].toLowerCase().includes(input.toLowerCase()));
        const sortedData = [...updatedData].sort((a, b) => {

            return a[columnToTake] > b[columnToTake] ? 1 : -1;
        });
        const values = sortedData.map((value, index) => {
            return <div onClick={() => handleValueClick(value[columnToTake])} key={index} className="value">
                {value[columnToTake]}
            </div>
        });

        content = <div className="options-comboBox">
            {values}
        </div>;
    }
    return (
        <div className="comboBox">
            <input onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => { setIsFocused(false) }, 200)} onChange={handleInputChange} value={input} className="form-control p-2 input" id="input" autoComplete="off" />
            <div>
                {content}
            </div>
        </div>
    );
}

export default ComboBox;