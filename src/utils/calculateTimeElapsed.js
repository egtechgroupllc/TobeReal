export default function calculateTimeElapsed(postedTime) {
  const postedDate = new Date(postedTime);

  const currentDate = new Date();

  const elapsedTime = currentDate - postedDate;

  const seconds = Math.floor(elapsedTime / 1000);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} phút trước`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} giờ trước`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ngày trước`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 4) {
    return `${weeks} tuần trước`;
  }

  const months = Math.floor(weeks / 4);

  if (months < 12) {
    return `${months} tháng trước`;
  }

  const years = Math.floor(months / 12);
  return `${years} năm trước`;
}
