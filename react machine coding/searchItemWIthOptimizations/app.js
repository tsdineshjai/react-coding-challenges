import React from "react";
import "./styles.css";
const items = [
  "Apple",
  "Banana",
  "Carrot",
  "Mango",
  "Spinach",
  "Tomato",
  "Orange",
  "Potato",
  "Grapes",
  "Onion",
  "Pineapple",
  "Broccoli",
  "Cucumber",
  "Papaya",
  "Peas",
  "Strawberry",
  "Radish",
  "Watermelon",
  "Lettuce",
  "Guava",
  "Pumpkin",
  "Kiwi",
  "Cauliflower",
  "Beetroot",
  "Lemon",
];

const style = {
  display: "grid",
  placeItems: "center",
};

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);

  const cbFilterItems = React.useCallback((newSearchTerm) => {
    const filterdOnes = items.filter((item) =>
      item.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredItems(filterdOnes);
  }, []); //will be called only once

  const debouncedRef = React.useRef(debounce(cbFilterItems, 1000)); //only called once

  const debouncedFn = debouncedRef.current;

  const cbHandleSearchChange = useCallback(
    (e) => {
      const newSearchTerm = e.target.value; // Get the current value from the event
      setSearchTerm(newSearchTerm);
      if (!newSearchTerm) {
        setFilteredItems(items);
        debouncedFn.cancel();
        return;
      }
      debouncedFn(newSearchTerm);
    },
    [setSearchTerm, setFilteredItems, debouncedFn]
  );

  React.useEffect(() => {
    return () => {
      debouncedFn.remove();
    };
  }, [debouncedFn]);

  return (
    <div style={style}>
      <input
        type="search"
        name=""
        id=""
        value={searchTerm}
        onChange={cbHandleSearchChange}
      />

      {filteredItems?.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </div>
  );
}

function debounce(fn, delay) {
  let timerID;

  const debounce = (...args) => {
    clearTimeout(timerID);

    timerID = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  debounce.cancel = () => {
    clearTimeout(timerID);
  };
  return debounce;
}
