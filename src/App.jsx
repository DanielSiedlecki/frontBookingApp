import './App.css';
import EventPicker from './components/EventPicker';

function App() {
  return (
    <div className="h-screen w-screen bg-image flex items-center justify-center">
      <div className="content hidden justify-center items-center flex-col w-11/12 h-96 lg:w-5/12 lg:h-72 bg-white rounded-lg">
        <h1 className='mb-10'>Barber Shop</h1>
        <button className='w-40'>Umów wizytę</button>
      </div>
      <EventPicker />
    </div>
  );
}

export default App;