function translateStatusToPolish(status) {
    const statusMapping = {
        Pending: 'Oczekująca',
        Ended: 'Zakończona',
        Canceled: 'Anulowana',

    };

    return statusMapping[status] || 'Nieznany status';
}

export default translateStatusToPolish;