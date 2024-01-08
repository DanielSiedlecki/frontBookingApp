function extractHourAndMinuteFromUTCDateString(utcDateString) {
    const date = new Date(utcDateString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export default extractHourAndMinuteFromUTCDateString;
