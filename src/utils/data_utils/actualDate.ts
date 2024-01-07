export const actualDate = (): string => {
    const monthsInPolish = [
        "Stycznia",
        "Lutego",
        "Marca",
        "Kwietnia",
        "Maja",
        "Czerwca",
        "Lipca",
        "Sierpnia",
        "Września",
        "Października",
        "Listopada",
        "Grudnia",
    ];

    const currentDate = new Date();
    const monthName = monthsInPolish[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();

    const dateInPolish = dayOfMonth + " " + monthName;
    return dateInPolish;
};
