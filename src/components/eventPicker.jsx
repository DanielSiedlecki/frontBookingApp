import { Datepicker } from 'flowbite-react';

function EventPicker() {
    return (
        <div className="content text-center">
        <p>Wybierz datę wizyty</p>
        <Datepicker language="pl" className='' labelTodayButton="Dzisiaj" labelClearButton="Wyczyść"
        onSelectedDateChanged={(date) => {
        console.log(date)
    }}/></div>)
}

export default EventPicker;