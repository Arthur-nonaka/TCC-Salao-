import { useState, useEffect } from 'react';

function App() {
    const [batata, setBatata] = useState("batata");
    const [text, setText] = useState();
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);
    console.log(message);



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
                {message}
            </h1>
        </div>
    );
};

export default App;
