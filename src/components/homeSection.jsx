import { useState } from 'react';
import EventPicker
    from './eventPicker';

function HomeSection() {

    const [isSectionVisible, setIsSectionVisible] = useState(false);

    const handleButtonClick = () => {
        setIsSectionVisible(!isSectionVisible);
    }

    return (
        <div className="content flex justify-center items-center flex-col w-11/12 h-96 lg:w-5/12 lg:h-72 bg-white rounded-lg">
            <h1 className='mb-10'>Barber Shop</h1>

            {isSectionVisible ? (
                <button className='w-40' onClick={handleButtonClick}>
                    Umów wizytę
                </button>
            ) : (
                <div className="additional-section">
                   <EventPicker></EventPicker>
                </div>
            )}
        </div>
    )
}

export default HomeSection;