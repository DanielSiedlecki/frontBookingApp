import { useState } from "react";

function ChangePassword() {
  const [formData, setFormData] = useState({password: "", confirm_password:""});
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
  setIsEmpty(value.trim() === "");
};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
      if (formData.confirm_password != formData.password) {
          alert("Hasła się od siebie różnią");
      }
      else if (formData.password < 6){
          alert("Hasło jest za krótkie");
      }
      else {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {!isModalOpen && (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <a href="/">
              <h3 className="text-xl md:text-4xl font-bold text-purple-600">
                Odzyskiwanie hasła
              </h3>
            </a>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nowe hasło
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                      isEmpty ? "border-red-500" : ""
                    }`}
                  />
                </div>
                          </div>
                          <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Powtórz hasło
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                      isEmpty ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-end mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                >
                  Zmień hasło
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="w-screen h-96 flex items-center justify-center">
          <div className="modal-overlay justify-center items-center flex flex-col gap-2 ">
            <i className="bi bi-check text-green-400 text-6xl"></i>
            <p className="text-center">
              Hasło zostało zmienione
            </p>
            <a href="/login">
              <button className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900">
                Zaloguj się
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
