import React, { useEffect, useState } from "react";
import Sidebar from "../components/utils/Sidebar";
// import ComponentHeader from "../components/utils/ComponentHeader";
// import Rightsidebar from "../components/utils/Rightsidebar";
// import GradientCard from "../components/utils/GradientCard";
// import GradientCard2 from "../components/utils/GradientCard2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useGetViewCount from "../hooks/profile/useGetViewProfile";
import { useSelector } from "react-redux";
import RightSheet from "../components/utils/RightSheet";
import { Loader2 } from "lucide-react";
import Dropdown from "../components/utils/ui/Dropdown";
const options = ["Last 7 days", "Last 30 days", "Last 3 months"];
const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [daysAgo, setDaysAgo] = useState(7); // Initialize daysAgo state

  useEffect(() => {
    if (selectedOption === "Last 7 days") {
      setDaysAgo(7);
    } else if (selectedOption === "Last 30 days") {
      setDaysAgo(30);
    } else if (selectedOption === "Last 3 months") {
      setDaysAgo(90); // Changed to 90 days (3 months)
    }
  }, [selectedOption]);

  console.log("datsAgo => ", daysAgo);
  const { data, isLoading, refetch } = useGetViewCount(daysAgo);
  useEffect(() => {
    refetch(); // Refetch data when daysAgo changes
  }, [daysAgo, refetch]);
  const report = data?.report;
  const { user } = useSelector((store) => store.user);
  const [showSheet, setShowSheet] = useState(false);

  console.log("data => ", data);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log("Selected:", option);
  };
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[998px] w-full">
          <div>
            <div className="w-full bg-white z-30 fixed top-0 flex items-center justify-between border-r border-b border-gray-300 py-2.5 px-6 font-medium h-[56px]">
              <div className="flex items-center gap-2">
                {user && (
                  <div
                    onClick={() => setShowSheet(!showSheet)}
                    className="cursor-pointer block md:hidden"
                  >
                    <img
                      src={user.profileImageUrl}
                      className="w-8 h-8 rounded-full object-cover"
                      alt=""
                    />
                  </div>
                )}

                <h1>User Analytics</h1>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col border-r md:px-10 px-4 py-8 border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="font-medium capitalize">Profile Views</p>
                <p className="text-2xl">{data?.totalCount}</p>
              </div>
              <div>
                <Dropdown
                  selected={selectedOption}
                  options={options}
                  onSelect={handleSelectOption}
                />
              </div>
            </div>
            <div
              style={{ height: "400px" }}
              className="border rounded-2xl border-gray-300 py-3 mt-6"
            >
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="text-green-600 animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="z-50"
                >
                  <LineChart
                    width={500}
                    height={300}
                    data={report}
                    margin={{
                      top: 5,
                      right: 20,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis className="text-xs" dataKey="date" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="green"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        {/* <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4 px-6">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar> */}
      </div>
      {showSheet && (
        <RightSheet showSheet={showSheet} setShowSheet={setShowSheet} />
      )}
    </Sidebar>
  );
};

export default Analytics;
