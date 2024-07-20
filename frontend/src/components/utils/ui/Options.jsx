import React, { useState } from "react";

const Options = ({ options }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    if (!tags.includes(option)) {
      setTags([...tags, option]);
    }
    setInputValue("");
    setShowOptions(false);
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap gap-1 items-center border border-gray-300 rounded p-1 h-[50px]">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-black text-white text-sm px-2 py-0.5 rounded-full"
          >
            <span>{tag}</span>
            <button
              className=" text-gray-500 hover:text-white"
              onClick={() => handleTagRemove(tag)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow focus:outline-none"
          placeholder="Add a tag"
        />
      </div>
      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Options;
