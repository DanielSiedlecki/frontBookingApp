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