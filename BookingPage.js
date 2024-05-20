import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
const database = getDatabase();
const auth = getAuth(app);

const BookingPage = () => {
  const [requestVisible, setRequestVisible] = useState(false);
  const [hotelIndex, setHotelIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [bookingDate, setBookingDate] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const bookHotel = (index) => {
    const hotel = Hotels[index];
    if (user) {
      push(ref(database, "users/" + user.uid + "/bookings"), {
        hotelName: hotel.name,
        hotelPrice: hotel.price,
        hotelImage: hotel.image,
        bookingDate: bookingDate,
        bookingTime: document.getElementById("book-time").value,
        leaveDate: leaveDate,
        leaveTime: document.getElementById("leave-time").value,
        paymentMethod: paymentMethod,
      });

      setRequestVisible(false);
      navigate("/homepage");
    } else {
      alert("You need to be logged in to book a hotel.");
    }
  };

  const handleBookingDateChange = (e) => {
    const selectedDate = e.target.value;
    setBookingDate(selectedDate);
    if (leaveDate < selectedDate) {
      setLeaveDate(selectedDate);
    }
  };

  const Hotels = [
    {
      name: "Room 1",
      price: "100/hr",
      image:
        "https://i.pinimg.com/564x/51/9d/7d/519d7de9ee0be168cb6f03452e9ee372.jpg",
    },
    {
      name: "Room 2",
      price: "200/hr",
      image:
        "https://i.pinimg.com/564x/39/3e/a6/393ea618a17877121cfecab4b6dac380.jpg",
    },
    {
      name: "Room 3",
      price: "300/hr",
      image:
        "https://i.pinimg.com/564x/c5/7b/3c/c57b3cd14908c90fe35547fa051b9982.jpg",
    },
    {
      name: "Room 4",
      price: "400/hr",
      image:
        "https://i.pinimg.com/564x/7f/eb/63/7feb63a3026ec37bfc7d1d8ffe3dc873.jpg",
    },
    {
      name: "Room 5",
      price: "500/hr",
      image:
        "https://i.pinimg.com/564x/4b/56/2d/4b562d177d49a4174fedff076afd901a.jpg",
    },
    {
      name: "Room 6",
      price: "600/hr",
      image:
        "https://i.pinimg.com/736x/09/8e/2e/098e2e2bf52213d52a132bf5b08edb8e.jpg",
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Book the room that suits your desires
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Hotels.map((hotel, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <p className="text-gray-600">${hotel.price} per hour</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => {
                setRequestVisible(true);
                setHotelIndex(index);
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
      {requestVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
            <div className="mb-4">
              <label htmlFor="book-date" className="block text-gray-700">
                Booking Date
              </label>
              <input
                id="book-date"
                type="date"
                className="w-full border rounded p-2"
                value={bookingDate}
                min={today}
                onChange={handleBookingDateChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="book-time" className="block text-gray-700">
                Booking Time
              </label>
              <input
                id="book-time"
                type="time"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="leave-date" className="block text-gray-700">
                Leave Date
              </label>
              <input
                id="leave-date"
                type="date"
                className="w-full border rounded p-2"
                value={leaveDate}
                min={bookingDate || today}
                onChange={(e) => setLeaveDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="leave-time" className="block text-gray-700">
                Leave Time
              </label>
              <input
                id="leave-time"
                type="time"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 mb-2">Payment Method</span>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={() => setPaymentMethod("Card")}
                  />
                  <span>Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={() => setPaymentMethod("Cash")}
                  />
                  <span>Cash</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => bookHotel(hotelIndex)}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setRequestVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
