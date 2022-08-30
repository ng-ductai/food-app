import { createContext, useState } from "react";
export const PrevFilterContext = createContext();

const PrevFilterProvider = ({ children }) => {
  const [prevName, setPrevName] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const [prevRate, setPrevRate] = useState(null);
  const [prevSearch, setPrevSearch] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedDrop, setSelectedDrop] = useState("Filter");
  const [nameActive, setNameActive] = useState(null);

  const handlePrevious = (type, value) => {
    switch (type) {
      case "name":
        setPrevName(value);
        setPrevPrice(null);
        setPrevRate(null);
        setSelectedDrop("Filter");
        break;

      case "price":
        setPrevPrice(value);
        setPrevRate(null);
        setSelectedDrop("Filter");
        break;

      case "rate":
        setPrevRate(value);
        setPrevPrice(null);
        setSelectedRadio(null);
        setSelectedDrop("Filter");
        break;

      case "search":
        setPrevName(null);
        setPrevPrice(null);
        setPrevRate(null);
        setSelectedRadio(null);
        setSelectedDrop("Filter");
        setNameActive(null);
        break;

      case "sort":
        setPrevPrice(null);
        setPrevRate(null);
        setSelectedRadio(null);
        setSelectedDrop("Filter");
        break;

      case "pagination":
        setPrevName(null);
        setSelectedDrop("Filter");
        break;

      case "drop":
        setSelectedDrop(value);
        break;
        
      default:
        break;
    }

    return {
      prevName,
      prevPrice,
      prevRate,
      prevSearch,
      selectedRadio,
      selectedDrop,
      nameActive,
      setPrevName,
      setPrevPrice,
      setPrevRate,
      setPrevSearch,
      setSelectedRadio,
      setSelectedDrop,
      setNameActive,
    };
  };

  return (
    <PrevFilterContext.Provider value={{ handlePrevious }}>
      {children}
    </PrevFilterContext.Provider>
  );
}

export default PrevFilterProvider;
