import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

const Front = () => {
  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
            Welcome to Hotel California!
          </h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            Experience luxury and comfort like never before.
          </p>
          <Link
            to="/bookingpage"
            className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Book Now
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <div className="w-full">
          <div className="w-full border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              centerMode
              centerSlidePercentage={33.33}
            >
              {Hotels.map((hotel, index) => (
                <div key={index}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="object-cover w-full h-96"
                  />
                  <p className="legend">
                    {hotel.name} - {hotel.price}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-900 w-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <h1 className="text-3xl font-bold mb-4">About Our Hotel</h1>
          <p className="text-lg mb-4">
            Welcome to our hotel! We have been providing exceptional hospitality
            services for over 20 years, offering luxurious accommodations and
            outstanding guest experiences.
          </p>
          <p className="text-lg mb-4">
            Our hotel features a wide range of amenities and services to ensure
            a comfortable and memorable stay for our guests. From elegant rooms
            and suites to fine dining restaurants and recreational facilities,
            we strive to exceed your expectations at every turn.
          </p>
          <p className="text-lg mb-4">
            At our hotel, we are committed to delivering personalized service
            and attention to detail. Whether you're here for business or
            leisure, our dedicated staff is here to assist you with any request
            and make your stay truly exceptional.
          </p>
          <p className="text-lg">
            Thank you for choosing our hotel for your accommodation needs. We
            look forward to welcoming you and providing you with an
            unforgettable experience.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/bookingpage">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Book Now
              </button>
            </Link>
            <Link to="/contactpage">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Front;
