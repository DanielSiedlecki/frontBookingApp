import { useState } from "react";
import { loginUser } from "../services/authService";

async function login(data) {
  try {
    const eventData = {
      email: data.email,
      password: data.password,
    };

    const log = new loginUser();
    const response = await log.post(eventData);
    return { success: true, data: response.data.user };
  } catch (err) {
    if (err.response && err.response.status === 409) {
      return { success: false, error: "Email is already in use" };
    }

    console.error(err);
    return { success: false, error: "Registration failed" };
  }
}

function LoginSection() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isEmpty, setIsEmpty] = useState({
    email: false,
    password: false,
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
    } else {
      try {
        const result = await login(formData);
        if (result.success) {
          const userId = result.data?._id
          console.log("Login successful! User ID:", userId);
        } else {
          alert(result.error || "Złe dane");
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logowanie</h3>
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isEmpty.email ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Hasło
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    isEmpty.password ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col  items-center justify-end mt-4">
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="/forgotpassword"
              >
                Zapomniałem hasła
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
              >
                Zaloguj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSection;
