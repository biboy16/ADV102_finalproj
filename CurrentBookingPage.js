import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
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
const auth = getAuth();

const CurrentBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestVisible, setRequestVisible] = useState(false);
  const [hotelIndex, setHotelIndex] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Card");

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBookings(user.uid);
      } else {
        setUser(null);
        setBookings([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchBookings = (userId) => {
    const dbRef = ref(database, `users/${userId}/bookings`);
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const bookingArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            hotelName: value.hotelName,
            hotelImage: value.hotelImage,
            hotelPrice: value.hotelPrice,
            bookingDate: value.bookingDate,
            leaveDate: value.leaveDate,
            bookingTime: value.bookingTime,
            leaveTime: value.leaveTime,
            paymentMethod: value.paymentMethod || "Card",
          }));
          setBookings(bookingArray);
        } else {
          setBookings([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    );
  };

  const handleUpdate = (id) => {
    const bookingRef = ref(database, `users/${user.uid}/bookings/${id}`);
    onValue(bookingRef, (snapshot) => {
      const bookingData = snapshot.val();
      if (bookingData) {
        const selected = {
          id: id,
          hotelName: bookingData.hotelName,
          hotelImage: bookingData.hotelImage,
          hotelPrice: bookingData.hotelPrice,
          bookingDate: bookingData.bookingDate,
          leaveDate: bookingData.leaveDate,
          bookingTime: bookingData.bookingTime,
          leaveTime: bookingData.leaveTime,
          paymentMethod: bookingData.paymentMethod || "Card",
        };
        setSelectedBooking(selected);
        setHotelIndex(
          Hotels.findIndex((hotel) => hotel.name === bookingData.hotelName)
        );
        setBookingId(id);
        setPaymentMethod(selected.paymentMethod);
        setRequestVisible(true);
      }
    });
  };

  const handleDelete = (id) => {
    const bookingRef = ref(database, `users/${user.uid}/bookings/${id}`);
    remove(bookingRef)
      .then(() => {
        console.log("Booking deleted successfully");
        fetchBookings(user.uid);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const handleRequestUpdate = () => {
    const hotel = Hotels[hotelIndex];
    const bookingRef = ref(database, `users/${user.uid}/bookings/${bookingId}`);
    const newBookingData = {
      hotelImage: hotel.image,
      hotelName: hotel.name,
      hotelPrice: "$" + hotel.price,
      bookingDate: document.getElementById("bookingDate").value,
      bookingTime: document.getElementById("bookingTime").value,
      leaveDate: document.getElementById("leaveDate").value,
      leaveTime: document.getElementById("leaveTime").value,
      paymentMethod: paymentMethod,
    };
    set(bookingRef, newBookingData)
      .then(() => {
        console.log("Booking updated successfully");
        setRequestVisible(false);
        fetchBookings(user.uid);
      })
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div className="container mx-auto py-8 font-sans">
      {requestVisible && selectedBooking ? (
        <div className="mt-4 flex justify-center">
          <div className="border-2 border-yellow-500 rounded-md p-4 w-96">
            <h2 className="text-xl mb-4 font-semibold text-center">
              Update Booking
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <tbody>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <label
                      className="block font-semibold"
                      htmlFor="bookingDate"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      id="bookingDate"
                      className="mt-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={selectedBooking.bookingDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <label
                      className="block font-semibold"
                      htmlFor="bookingTime"
                    >
                      Check-in Time
                    </label>
                    <input
                      type="time"
                      id="bookingTime"
                      className="mt-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={selectedBooking.bookingTime}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <label className="block font-semibold" htmlFor="leaveDate">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      id="leaveDate"
                      className="mt-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={selectedBooking.leaveDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <label className="block font-semibold" htmlFor="leaveTime">
                      Check-out Time
                    </label>
                    <input
                      type="time"
                      id="leaveTime"
                      className="mt-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      defaultValue={selectedBooking.leaveTime}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <span className="block font-semibold">Payment Method</span>
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
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border">
                    <div className="flex justify-between">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={handleRequestUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => setRequestVisible(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Current Bookings</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Hotel Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Hotel Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Hotel Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Check-in Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Check-out Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings
                  .filter((booking) => new Date(booking.leaveDate) > new Date())
                  .map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.hotelName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        <img
                          src={booking.hotelImage}
                          alt="Hotel"
                          className="w-20 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.hotelPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.bookingDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.leaveDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        {booking.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border">
                        <button
                          onClick={() => handleUpdate(booking.id)}
                          className="bg-orange-500 text-white px-3 py-1 rounded-md mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentBookingPage;
