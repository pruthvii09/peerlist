export const timeAgo = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const diffMs = now - createdAt;

  // Convert milliseconds to seconds
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  // Convert seconds to minutes
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  // Convert minutes to hours
  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  // Convert hours to days
  const days = Math.floor(hours / 24);
  return `${days}d`;
};
export function formatDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options = { month: "short", day: "numeric" };
  const startFormatted = start.toLocaleDateString("en-US", options);
  const endDay = end.getDate();

  return `${startFormatted.split(" ")[0]} ${
    startFormatted.split(" ")[1]
  } - ${endDay}`;
}
export function formatChatTime(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} ${month}, ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}
export const getCurrentWeekNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000;

  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const dayOfWeek = startOfYear.getDay() || 7;

  return Math.ceil((pastDaysOfYear + dayOfWeek - 1) / 7);
};
export const splitDataAndCalculateCounts = (data) => {
  const half = Math.ceil(data?.length / 2);
  const part1 = data?.slice(0, half);
  const part2 = data?.slice(half);

  const totalCount = (part) => part?.reduce((sum, item) => sum + item.count, 0);

  const part1Count = totalCount(part1);
  const part2Count = totalCount(part2);
  return {
    part1Count,
    part2Count,
    chartColor: part1Count > part2Count ? "red" : "green",
  };
};
