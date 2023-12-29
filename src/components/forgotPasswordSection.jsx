import { useState } from "react";
import { requestPassword } from "../services/authService";

async function changePasswordRequest(inputEmail){

  try {
    const eventData = {
      email: inputEmail,
    };

    const req = new requestPassword()
    await req.post(eventData)

   return { success: true };

   }
  
  catch (error) {
    console.log(error)
  }

}


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsEmpty(value.trim() === "");
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty) {
      alert("Please enter your email address.");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address.");
    } else {
      try {
        const result = await changePasswordRequest(email);
        if (result.success) {
          setIsModalOpen(true);
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error("An error occurred during password reset:", error);
        alert("An error occurred. Please try again.");
      }
    }
  }

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
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="email"
                    value={email}
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
                  Zresetuj hasło
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
              Wiadomość email z linkiem do zmiany hasła została wysłana
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

export default ForgotPassword;
