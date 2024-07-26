import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';
import hamburgerLogo from '../assets/hamburger.svg'
import lightModeLogo from '../assets/lightmode.svg'
import darkModeLogo from '../assets/darkmode.svg'


const Navbar = () => {

    const { toggleDarkMode, darkMode } = useContext(DarkModeContext); // Destructure darkMode from context

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className={`mb-0 bg-black dark:bg-black ${darkMode ? 'dark' : ''}`}>

            <button className="block lg:hidden top-0 m-0 bg-black text-white p-2 rounded-3xl" onClick={toggleNav}>
                <img src={hamburgerLogo} alt="Trash" className="w-6 h-6 mx-auto dark:filter invert" />
            </button>
            <nav className={`lg:bg-black lg:rounded-bl-3xl lg:rounded-br-3xl p-4 lg:p-2 dark:bg-black ${darkMode ? 'dark' : ''} ${showNav ? 'block' : 'hidden'} lg:block`}>
                <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5'>
                    <div className='flex flex-col md:flex-row md:space-x-10 md:items-center gap-5'>
                        <Link to='/' className='text-blue-300 hover:text-gray-200 active:text-color5 dark:text-blue-400'>Home</Link>
                        <Link to='/hyperlinks' className='text-white hover:text-gray-300 active:text-color5'>HyperLinks</Link>
                        <Link to='/fav_hyperlinks' className='text-white hover:text-gray-300 active:text-color5'>Favourite URL&apos;s</Link>
                        <Link to='/notes' className='text-white hover:text-gray-300 active:text-color5'>Notes</Link>
                        <Link to='/favourite-notes' className='text-white hover:text-gray-300 active:text-color5'>Bookmarked Notes</Link>
                        <Link to='/help' className='text-white hover:text-gray-300 active:text-color5'>Help</Link>
                    </div>

                    <div className="flex items-center mt-4 lg:mt-0">
                        <button className='text-white dark:text-white p-2' onClick={toggleDarkMode}>
                            {darkMode ? (
                                <img src={darkModeLogo} alt="Light Mode" className="w-6 h-6 mx-auto" />
                            ) : (
                                <img src={lightModeLogo} alt="Dark Mode" className="w-6 h-6 mx-auto" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;
