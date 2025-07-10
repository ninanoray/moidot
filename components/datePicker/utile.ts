function getDateString(date: Date | undefined) {
  if (date) return date.toLocaleDateString("sv-SE");
  else return "";
}

function getTimeString(date: Date | undefined) {
  if (date) {
    return date.toLocaleTimeString("sv-SE", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  } else return "";
}

function getDateTimeString(date: Date | undefined) {
  const dateString = getDateString(date);
  const timeString = getTimeString(date);
  if (dateString && timeString) return dateString + " " + timeString;
  else return "";
}

export { getDateString, getDateTimeString, getTimeString };
