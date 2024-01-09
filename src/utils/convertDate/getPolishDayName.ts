export const getPolishDayName = (date) => {
    const daysOfWeek = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
    ];
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
};

export const translateDayToPolishName = (dayName) => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const polishDays = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
    ];

    const index = daysOfWeek.indexOf(dayName);

    if (index !== -1) {
        return polishDays[index];
    } else {
        // Jeśli nie znaleziono dopasowania, możesz zwrócić oryginalną nazwę
        return dayName;
    }
};
