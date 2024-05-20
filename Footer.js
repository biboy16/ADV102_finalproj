import { Link } from "react-router-dom";

const Footer = () => {
    return (  

<footer class="bg-black rounded-lg shadow dark:bg-gray-100 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
        <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">       
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">ADV102</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <Link to='about'>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
            </Link>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a  class="hover:underline">ADV102™</a>. All Rights Reserved.</span>
    </div>
</footer>
    )
}

export default Footer;