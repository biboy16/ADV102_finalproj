import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from '../Assets/main-menu.png';
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const auth = getAuth();

    const toggleSidebar = (e) => {
        e.stopPropagation();
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
        closeSidebar(); 
    };

    useEffect(() => {
        const handleClick = (e) => {

            if (isSidebarOpen && !e.target.closest('.fixed')) {
                closeSidebar();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isSidebarOpen]);

    const handleSidebarItemClick = () => {
        closeSidebar(); 
    };

    return (
        <header>
            <nav className="bg-blue-800 border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">                  
                    <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
                        <img src={Menu} alt="Menu" className="h-8 w-auto" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white ml-2">Hotel California</span>
                    </div>
                    <div className={`fixed top-0 left-0 h-full bg-blue-800 w-64 z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <ul className="flex flex-col mt-4 font-medium space-y-2">
                            <li>
                                <Link to='/currentbookingpage' onClick={handleSidebarItemClick}>
                                    <span className="block py-1.5 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-none border-transparent">Current Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/bookinghistorypage' onClick={handleSidebarItemClick}>
                                    <span className="block py-1.5 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-none border-transparent">Booking History</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <span className="block py-1.5 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-none" onClick={handleLogout}>Log Out</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to='/homepage'>
                                    <span className="block py-1.5 pr-6 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-white focus:ring-2 focus:ring-white border border-transparent">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/aboutpage'>
                                    <span className="block py-1.5 pr-6 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-white focus:ring-2 focus:ring-white border border-transparent">About</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/contactpage'>
                                    <span className="block py-1.5 pr-6 pl-6 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700 focus:outline-white focus:ring-2 focus:ring-white border border-transparent">Contacts</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
