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
