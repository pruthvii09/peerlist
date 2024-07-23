import React from "react";

const Upvote = ({ upvote }) => {
  return (
    <div className="group cursor-pointer">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform transform group-hover:-translate-y-0.5 block"
        style={{
          fill: upvote ? "#34D399" : "#fff", // Darker green when clicked
          stroke: upvote ? "#059669" : "#333", // Even darker green when clicked
        }}
      >
        <path
          d="M17.5 10L10 2.5L2.5 10H6.25V17.5H13.75V10H17.5Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

export default Upvote;
