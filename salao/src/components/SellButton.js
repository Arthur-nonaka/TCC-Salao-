import { BiMoney } from "react-icons/bi";
import axios from "axios";

function SellButton({ schedule, services }) {
  const handleButtonClick = () => {
    console.log(schedule.cli_nome);
    console.log(services);
    
    // axios
    //   .post("pull/VendaInfo", { schedule })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "10px",
        padding: "7px",
      }}
      className="btn btn-success"
      onClick={handleButtonClick}
    >
      <BiMoney fontSize={16} />
    </button>
  );
}

export default SellButton;
