import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import React from "react";
import useGetViewCount from "../../hooks/profile/useGetViewProfile";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { splitDataAndCalculateCounts } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
const ProfileAnalytics = () => {
  const { data } = useGetViewCount(7);
  const report = data?.report;
  //   const { part1Count, part2Count, chartColor } =
  const { part1Count, part2Count, chartColor } =
    splitDataAndCalculateCounts(report);
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate("/user/profile-analytics")}
        className="flex items-center justify-between group"
      >
        <h1 className="font-medium cursor-pointer flex items-center gap-1">
          <p className="group-hover:underline">Analytics</p>
          <span className="text-gray-600 text-xs">(last 7 days)</span>
        </h1>
        <div className="cursor-pointer w-6 h-6 flex items-center justify-center group-hover:bg-gray-300 rounded-full">
          <ArrowRight size={18} />
        </div>
      </div>
      <div className="flex mt-4">
        <div>
          <h1 className="text-xl flex gap-2">
            <p>{data?.totalCount}</p>
            <div className="flex items-center">
              {part1Count > part2Count ? (
                <>
                  <ArrowDown size={14} className="text-sm text-red-500 mr-1" />
                  <p className="text-[10px] text-red-500">{part1Count}</p>
                </>
              ) : (
                <>
                  <ArrowUp size={14} className="text-sm text-green-500 mr-1" />
                  <p className="text-[10px] text-green-500">{part2Count}</p>
                </>
              )}
            </div>
          </h1>
          <span className="text-xs text-gray-600">Profile Views</span>
        </div>
        <div className="flex-grow" style={{ height: "60px" }}>
          <ResponsiveContainer width="100%" height="100%" className="z-50">
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
              <Line
                type="monotone"
                dataKey="count"
                stroke={chartColor}
                dot={false}
                isAnimationActive={true}
                animationDuration={1500}
                // activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalytics;
