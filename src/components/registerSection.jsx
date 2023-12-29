import { registerUser } from "../services/authService";
import { useState } from "react";

async function register(data) {
  try {
    const eventData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password:data.password
    };
    const reg = new registerUser()
    await reg.post(eventData);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function RegisterSection() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [isEmpty, setIsEmpty] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    password_confirmation: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsEmpty({
      ...isEmpty,
      [name]: value.trim() === "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isAnyFieldEmpty = false;

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        setIsEmpty((prevIsEmpty) => ({
          ...prevIsEmpty,
          [key]: true,
        }));
        isAnyFieldEmpty = true;
      } else {
        setIsEmpty((prevIsEmpty) => ({
          ...prevIsEmpty,
          [key]: false,
        }));
      }
    });

    if (isAnyFieldEmpty) {
      alert("Uzupełnij wszystkie wymagane pola");
    } else if (formData.password !== formData.password_confirmation) {
      alert("Hasła się od siebie różnią");
    } else if (formData.password.length < 6) {
      alert("Hasło jest za krótkie");
    } else {
      const registrationSuccessful = await register(formData);
      console.log(formData)
      if (registrationSuccessful) {
        console.log("Pomyślnie zarejestrowany", formData);
        
      } else {
        console.log("Błąd podczas rejestracji");
      }
    }
  };


  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Rejestracja</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="fullname flex gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imię
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                      isEmpty.name ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nazwisko
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                      isEmpty.surname ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isEmpty.email ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="mt-4">
              <label>Hasło</label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isEmpty.email ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Powtórz hasło
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isEmpty.name ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/login"
              >
                Jesteś zarejestrowany?
              </a>
              <button
                onClick={handleSubmit}
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
              >
                Zarejestruj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterSection;
