import { useState } from "react";

function LoadingScreen() {
  const [content, setContent] = useState();

  setTimeout(() => {
    setContent(
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    );
  }, 500);

  return content;
}

export default LoadingScreen;
