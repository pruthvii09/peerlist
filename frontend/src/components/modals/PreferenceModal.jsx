import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import Button from "../utils/ui/Button";
import { topics } from "../../utils/data";
import { X } from "lucide-react";
const PreferenceModal = () => {
  const { hideModal } = useModal();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicClick = (topicId) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topicId)
        ? prevSelectedTopics.filter((id) => id !== topicId)
        : [...prevSelectedTopics, topicId]
    );
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="bg-white sm:w-[600px] w-[600px]  rounded-lg shadow-lg flex flex-col items-center relative">
        <div className="flex py-6 px-4 items-center flex-col">
          <img
            height={80}
            width={80}
            src="https://dqy38fnwh4fqs.cloudfront.net/website/scroll-topics.webp"
            alt=""
          />
          <h1 className="text-lg font-semibold mb-2">Pick your interests</h1>
          <p className="text-center text-sm text-gray-600">
            Select the topics that interest you so we can curate the feed
            accordingly.
          </p>
        </div>
        <div className="mb-4 py-6 px-4 justify-center flex flex-wrap gap-3 ">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              className={`font-semibold text-xs py-1 px-2 border border-gray-200 rounded-full cursor-pointer ${
                selectedTopics.includes(topic.id) ? "bg-black text-white" : ""
              }`}
            >
              {topic.name}
            </div>
          ))}
        </div>
        <div className="px-4 py-3 flex items-end justify-end border-t border-gray-300 w-full">
          <Button
            title="Save Preferences"
            className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
          />
        </div>
        <div className="absolute top-3 right-3">
          <X
            onClick={() => {
              hideModal();
            }}
            className="cursor-pointer"
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferenceModal;
