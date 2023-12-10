import { Datepicker } from 'flowbite-react';

function EventPicker() {
    return <Datepicker language="pl" labelTodayButton="Dzisiaj" labelClearButton="Wyczyść"
        onSelectedDateChanged={(date) => {
        console.log(date)
    }}/>;
}

export default EventPicker;