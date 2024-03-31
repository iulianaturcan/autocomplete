import { useState, useEffect, ChangeEvent, KeyboardEvent, useRef  } from 'react';
import { getCountriesByName } from '../../services/getCountriesByName';
import useDebounce from '../../hooks/useDebounce';

import './Autocomplete.css';

interface TimezoneOption {
  id: number;
  country: string;
  timeZone: string;
}

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<TimezoneOption[]>([]);
  const [selectedItem, setSelectedItem] = useState<TimezoneOption | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedInputValue === '') {
      setData([]);
      return;
    }

    const fetchData = async () => {
      const data = await getCountriesByName(debouncedInputValue);
      setData(data);
    };

    fetchData();
  }, [debouncedInputValue]);
  
  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if(event.target.value === '') {
      setSelectedItem(null);
    }

    setFocusedIndex(-1);
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const highlightText = (text: string, query: string): JSX.Element[] => {
    if (text === `${selectedItem?.country} (${selectedItem?.timeZone})`) {
      return [<span>{text}</span>];
    }

    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, 'ig');
    if (query.trim() === '') {
      return [<span>{text}</span>];
    }

    const textFragments = text.split(regex);
    return textFragments.map((part) =>
      regex.test(part) ? <strong>{part}</strong> : <span>{part}</span>
    );
  };

  const handleItemClick = (item: TimezoneOption) => {
    setSelectedItem(item);
    setInputValue(`${item.country} (${item.timeZone})`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (focusedIndex < data.length - 1) {
        setFocusedIndex(focusedIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (focusedIndex > 0) {
        setFocusedIndex(focusedIndex - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < data.length) {
        handleItemClick(data[focusedIndex]);
      }
    }
  };

  const handleInputClear = () => {
    setInputValue('');
    setSelectedItem(null);
  };

  return (
    <div className="autocomplete" onBlur={() => setFocusedIndex(-1)}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search your country or timezone..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {inputValue && (
          <button className="clear-button" onClick={handleInputClear}>
            &#10006;
          </button>
        )}
      </div>
      <ul className="autocomplete-list">
        {data.length === 0 ? (
          <li className="empty-message">No results found.</li>
        ) : 
        data.map((item, index) => {
            const itemClasses = [
              'autocomplete-item',
              selectedItem?.id === item.id ? 'selected' : '',
              focusedIndex === index ? 'focused' : '',
            ].filter(Boolean).join(' ');

            return (
              <li
                key={item.id}
                className={itemClasses}
                onClick={() => handleItemClick(item)}
              >
                {highlightText(`${item.country} (${item.timeZone})`, inputValue)}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Autocomplete;
