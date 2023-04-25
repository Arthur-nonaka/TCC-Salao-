function Message({ setMessageShow, messageShow, message, messageType }) {

    const handleCloseError = () => {
        setMessageShow(false);
    };
    let content =
        <div className={messageType === 'error' ? "text-danger border-danger bg-danger border p-4 d-flex justify-content-between align-items-center mb-2 rounded  bg-opacity-25" : "text-success border-success bg-success border p-4 d-flex justify-content-between align-items-center mb-2 rounded  bg-opacity-25" }>
            {message}
            <div className='Xbutton' onClick={handleCloseError}>
                X
            </div>
        </div>
        ;

    return (
        <div>
            {messageShow && content}
        </div>
    );
}

export default Message;