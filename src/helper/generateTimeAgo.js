//time ago generator function
export default function generateTimeAgo(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };
  for (let key in intervals) {
    let value = Math.floor(seconds / intervals[key]);
    if (value > 0) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }
}
