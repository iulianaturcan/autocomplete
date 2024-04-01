import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { getCountriesByName } from "../../services/getCountriesByName";
import Dropdown from "../Dropdown/Dropdown";
import { useDebounce } from "../../hooks/useDebounce";
import { TimezoneOption } from "../../types";

import "./Autocomplete.css";

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<TimezoneOption[]>([]);
  const [selectedItem, setSelectedItem] = useState<TimezoneOption | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue === "") {
      setLoading(false);
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getCountriesByName(debouncedInputValue);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedInputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInputValue(event.target.value);
    setShowItems(true);
    setFocusedIndex(-1);
  };

  const handleItemClick = (item: TimezoneOption) => {
    setSelectedItem(item);
    setInputValue(item.country);
    setShowItems(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // This handles the keyboard navigation for the dropdown items
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = focusedIndex + direction;
      if (nextIndex >= 0 && nextIndex < data.length) {
        setFocusedIndex(nextIndex);

        // Scroll the next item into view
        const itemElement = document.getElementById(`item-${nextIndex}`);
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < data.length) {
        handleItemClick(data[focusedIndex]);
      }
    }
  };

  const handleInputClear = () => {
    setInputValue("");
    setSelectedItem(null);
    setShowItems(false);
  };

  const handleInputBlur = () => {
    setShowItems(false);
  };

  return (
    <div className="autocomplete" onBlur={handleInputBlur}>
      <input
        type="text"
        placeholder="Search your country..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
        <button className="clear-button" onClick={handleInputClear}>
          &#10006;
        </button>
      )}
      {showItems && (
        <ul className="autocomplete-items">
          <Dropdown
            data={data}
            loading={loading}
            selectedItem={selectedItem}
            focusedIndex={focusedIndex}
            handleItemClick={handleItemClick}
            inputValue={inputValue}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
