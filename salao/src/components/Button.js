function Button({children, css, onClick}) {


    return (
            <button className={css} onClick={onClick}>
                {children}
            </button>
    );
};

export default Button;