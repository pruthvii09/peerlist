import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WeekSlider = ({ currentWeek }) => {
  const [weeks, setWeeks] = useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    const startWeek = currentWeek - 10;
    const endWeek = currentWeek + 5;
    const weekArray = [];

    for (let i = startWeek; i <= endWeek; i++) {
      weekArray.push(`Week ${i}`);
    }

    setWeeks(weekArray);

    // Set the initial scroll position to the current week
    setTimeout(() => {
      if (sliderRef.current) {
        const currentWeekIndex = weekArray.findIndex(
          (week) => week === `Week ${currentWeek}`
        );
        const scrollPosition = currentWeekIndex * 200; // Assuming each week item is 200px wide
        sliderRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 0);
  }, [currentWeek]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="mt-[55px] flex items-center justify-between px-4 py-2">
        <div onClick={scrollLeft} className="cursor-pointer">
          <ChevronLeft size={18} />
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            ref={sliderRef}
            className="flex flex-1 overflow-x-auto w-[570px] scrollbar-hide whitespace-nowrap scroll-smooth"
          >
            {weeks.map((week, index) => {
              const weekNumber = parseInt(week.split(" ")[1]);
              const isCurrentWeek = weekNumber === currentWeek;
              const isFutureWeek = weekNumber > currentWeek;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 px-2 py-1 text-xs mx-1 ${
                    isCurrentWeek
                      ? "bg-green-100 text-green-600 rounded-full"
                      : ""
                  } ${isFutureWeek ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => {
                    if (!isFutureWeek) {
                      console.log(week);
                    }
                  }}
                >
                  {week}
                </div>
              );
            })}
          </div>
        </div>
        <div onClick={scrollRight} className="cursor-pointer">
          <ChevronRight size={18} />
        </div>
      </div>
    </>
  );
};

// Utility function to get the current week number

export default WeekSlider;
