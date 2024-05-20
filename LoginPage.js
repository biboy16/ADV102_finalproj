import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDetk7hyCMP3B18OSPzvEh5c5gOJV-uERw",
  authDomain: "hoteldatabase-74b07.firebaseapp.com",
  databaseURL: "https://hoteldatabase-74b07-default-rtdb.firebaseio.com",
  projectId: "hoteldatabase-74b07",
  storageBucket: "hoteldatabase-74b07.appspot.com",
  messagingSenderId: "683238749519",
  appId: "1:683238749519:web:348086fa10f5e9aa88c13a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful");
      navigate("/homepage");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        setErrorMessage(
          "The account with this email doesn't exist. Please sign up first."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-md my-20 mx-auto p-6 border border-gray-300 rounded-lg text-center bg-white">
      <form
        className="mt-8 space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-black">
          Sign In to Hotel California
        </h2>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <p className="mt-6 text-black">
          Don't have an account?{" "}
          <Link to="/registerpage" className="text-blue-500">
            Sign up
          </Link>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
