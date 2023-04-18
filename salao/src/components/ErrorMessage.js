function ErrorMessage({children, setErrorShow}) {

    const handleCloseError = () => {
        setErrorShow(false);
      };    

    return (
        <div className="border p-4 d-flex justify-content-between align-items-center mb-2 rounded text-danger border-danger bg-danger bg-opacity-25">
        {children}
        <div className='Xbutton' onClick={handleCloseError}>
            X
        </div>
    </div>
    );
}

export default ErrorMessage;