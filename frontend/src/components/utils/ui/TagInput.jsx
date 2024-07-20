import { X } from "lucide-react";
import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { useSkillSearch } from "../../../hooks/skills/useGetSkills";
import "react-toastify";
import { toast } from "react-toastify";
const TagInput = ({ skills, onChange, label }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 300);

  const { data, isLoading, isError } = useSkillSearch(debouncedInputValue);
  const suggestions = data?.data;

  const addTag = (skill) => {
    if (skills.length >= 10) {
      toast.error("Maximum 10 skills allowed");
      return;
    }
    if (!skills.some((tag) => tag.id === skill.id)) {
      const newSkills = [...skills, skill];
      onChange(newSkills);
      setInputValue("");
    }
  };

  const removeTag = (id) => {
    if (skills.length <= 3) {
      toast.error("Minimum 3 skills required");
      return;
    }
    const newSkills = skills.filter((tag) => tag.id !== id);
    onChange(newSkills);
  };

  return (
    <div className="relative w-full mt-4">
      <label className="pb-0.5 text-xs">{label}</label>
      <div className="flex flex-wrap gap-1 p-2 rounded border border-gray-300 transition-all duration-100 hover:border-gray-500">
        {skills.map((tag) => (
          <div
            className="flex items-center gap-1 bg-black text-white text-sm w-fit px-2 py-0.5 rounded-full"
            key={tag.id}
          >
            <img src={tag.logo} alt={tag.name} className="w-4 h-4" />
            <p className="text-xs">{tag.name}</p>
            <X
              size={15}
              onClick={() => removeTag(tag.id)}
              className="cursor-pointer"
            />
          </div>
        ))}
        <input
          placeholder="Enter Skill"
          type="text"
          className="outline-none text-xs flex-grow"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={skills.length >= 10}
        />
      </div>
      {isLoading && <div className="mt-2">Loading...</div>}
      {isError && (
        <div className="mt-2 text-red-500">Error fetching skills</div>
      )}
      {suggestions && suggestions.length > 0 && skills.length < 10 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((skill) => (
            <li
              key={skill.id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addTag(skill)}
            >
              <img src={skill.logo} alt={skill.name} className="w-6 h-6 mr-2" />
              {skill.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
