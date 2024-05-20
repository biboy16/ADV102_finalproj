import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
          const pastBookings = bookingArray.filter((booking) =>
            isPastBooking(booking.leaveDate)
          );
          setBookings(pastBookings);
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

  const isPastBooking = (leaveDate) => {
    const today = new Date().toISOString().split("T")[0];
    return leaveDate < today;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Booking History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistoryPage;
