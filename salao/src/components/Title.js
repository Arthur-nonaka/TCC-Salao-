function Title({ type }) {
  return (
    <div
      style={{
        width: "max",
        height: "auto",
        margin: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
      }}
    >
      {type}
    </div>
  );
}

export default Title;
