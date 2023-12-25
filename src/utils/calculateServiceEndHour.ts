function calculateServiceEndHour(startHour, duration) {
  if (startHour != null) {
    const [startHourStr, startMinuteStr] = startHour.split(":");

    const startHourInt = parseInt(startHourStr);
    const startMinuteInt = parseInt(startMinuteStr);

    const durationInt = parseInt(duration);

    let endHourInt =
      startHourInt + Math.floor((startMinuteInt + durationInt) / 60);
    let endMinuteInt = (startMinuteInt + durationInt) % 60;

    const endHourStr =
      endHourInt < 10 ? `0${endHourInt}` : endHourInt.toString();
    const endMinuteStr =
      endMinuteInt < 10 ? `0${endMinuteInt}` : endMinuteInt.toString();

    const endHour = `${endHourStr}:${endMinuteStr}`;
    return startHour + "-" + endHour;
  }
}

export { calculateServiceEndHour };
