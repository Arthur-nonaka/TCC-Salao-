import { useState } from 'react';

function App() {
    const [batata, setBatata] = useState("batata");
    const [text, setText] = useState();


    const handleClick = () => {
        if (batata === "batata")
            setBatata("beterraba");
        else {
            setBatata("batata");
        }
    };

    const handleChange = (event) => {

        setText(event.target.value);
    };

    return (
        <div>
            <button onClick={handleClick}>
                {batata}
            </button>
            <input onChange={handleChange} value={text} >
            </input>
            <h1>
                {text}
            </h1>
        </div>
    );
};

export default App;
