import React, { useState } from "react";

// import Accordion from "./views/components/Accordion";
// import SearchBar from "./views/components/SearchBar";
import Dropdown from "./views/components/Dropdown";

// const items = [
//   {
//     title: "What is React?",
//     content: "React is a front end javascript framework",
//   },
//   {
//     title: "Why use React?",
//     content: "Because React is amazing and good for front end development",
//   },
//   {
//     title: "How do you use React?",
//     content: "You can use it by creating components",
//   },
// ];

const options = [
  { label: "The Color Red", value: "red" },
  { label: "The Color Green", value: "green" },
  { label: "The Color Blue", value: "blue" },
];

function App() {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <br />
      {/* <Accordion items={items} /> */}
      {/* <SearchBar /> */}
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      {showDropdown ? (
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      ) : null}
    </div>
  );
}

export default App;
