
function ReservationNotify({ type }) {
    let message = '';
    let styleClass = '';

    if (type === 'success') {
        message = 'Rezerwacja została pomyślnie utworzona. Sprawdź swoją skrzynke mailową';
        styleClass = 'text-green-600';
    } else if (type === 'error') {
        message = 'Wystąpił błąd podczas tworzenia rezerwacji.';
        styleClass = 'text-red-600';
    }

    return (
        <div className={`reservation-notify ${styleClass}`}>
            <p>{message}</p>
        </div>
    );
}

export default ReservationNotify;