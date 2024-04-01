import Autocomplete from "./components/Autocomplete/Autocomplete";
import "./App.css";

function App() {
  return (
    <>
      <Autocomplete />
      <ul className="autocomplete-features">
        <li>Search for countries</li>
        <li>Real-time filtering as you type</li>
        <li>Keyboard navigation with arrow keys</li>
        <li>Click to select an item</li>
        <li>Clear input with the "X" button</li>
        <li>Display loading indicator while fetching data</li>
      </ul>
    </>
  );
}

export default App;
