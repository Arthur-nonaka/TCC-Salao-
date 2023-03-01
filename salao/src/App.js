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

    const handleInput = () => {

    };

    return (
        <div>
            <button onClick={handleClick}>
                {batata}
            </button>
            <input on={handleInput} value={text}>
            </input>
        </div>
    );
};

export default App;
