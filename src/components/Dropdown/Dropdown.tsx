import { TimezoneOption } from "../types";

interface DropdownProps {
  data: TimezoneOption[];
  loading: boolean;
  selectedItem: TimezoneOption | null;
  focusedIndex: number;
  handleItemClick: (item: TimezoneOption) => void;
  inputValue: string;
}

const Dropdown = ({
  data,
  loading,
  selectedItem,
  focusedIndex,
  handleItemClick,
  inputValue,
}: DropdownProps) => {
  if (loading) {
    return <span className="loader"></span>;
  }

  if (data.length === 0) {
    return <div className="empty-message">No results found.</div>;
  }

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightText = (country: string, query: string): JSX.Element[] => {
    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, "ig");

    if (query.trim() === "") {
      return [<span>{country}</span>];
    }

    const textFragments = country.split(regex);
    return textFragments.map((part, index) =>
      regex.test(part) ? (
        <strong key={index}>{part}</strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <>
      {data.map((item, index) => {
        const itemClasses = [
          "autocomplete-item",
          selectedItem?.id === item.id ? "selected" : "",
          focusedIndex === index ? "focused" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li
            className={itemClasses}
            onMouseDown={() => handleItemClick(item)}
            id={`item-${index}`}
            key={item.id}
          >
            {highlightText(item.country, inputValue)}
          </li>
        );
      })}
    </>
  );
};

export default Dropdown;
