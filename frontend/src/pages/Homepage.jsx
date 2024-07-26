import { useContext } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";


const Homepage = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={` ${darkMode ? 'dark' : ''}`}>
            {/* First section with home1 background */}
            <div className={`bg-cover bg-fixed bg-center w-full h-full`} style={{ backgroundImage: `url(${home1})` }}>

                <div>
                    <div className='pt-40 lg:pt-44 h-fit bg-black bg-opacity-15'>
                        <h1 className="text-3xl lg:text-5xl text-center lg:text-start lg:ml-40 text-white lg:text-white font-bold font-font1  lg:w-2/3 pb-10">Information Flow</h1>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between lg:justify-center gap-20 mt-72 h-auto'>
                        <div className='flex-grow-3 w-full lg:w-4/5 bg-black bg-opacity-25 lg:ml-10 lg:mt-24 flex flex-row lg:flex-col rounded-3xl h-fit mx-auto p-12'>
                            <p className='text-white text-2xl lg:text-4xl font-font5 my-auto'>It saves time to get the content you are looking for at a faster rate. This Repository of Hyperlinks and documents may help in collecting and managing information</p>
                        </div>
                    </div>

                    <div className="w-full h-28 bg-transparent"></div>

                </div>
            </div>

            {/* Second section with home2 background */}
            <div className={`bg-cover bg-fixed bg-center w-full h-full`} style={{ backgroundImage: `url(${home2})` }}>

                <div>

                    <div className='flex flex-col lg:flex-row justify-between lg:justify-around gap-24 pt-72 h-auto '>
                        <div className='flex-grow-3 w-full lg:w-3/5 lg:mr-10 flex flex-row lg:flex-col lg:justify-end'>
                            <p className='text-white text-2xl lg:text-4xl font-font4 font-extrabold p-12 bg-black bg-opacity-25 rounded-3xl mb-32'>Supports dynamic Search methods to filter the content and favourites tab for your likely stuff</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between lg:justify-start h-auto p-10 pt-20 '>
                        <div className='flex flex-col justify-around mt-20'>
                            <p className='text-white mx-auto text-sm'>&quot;Website Finder&quot; is dedicated to providing a platform for organizing and storing important Hyperlinks and Documents for personal use only. While we strive to offer a convenient service for our users, please note that the images used may be sourced from the internet or other offline sources, We do not claim ownership of any images they are used for illustrative purposes only. Any unauthorized use or reproduction of the content is not recommended
                            </p>
                            <p className='text-white text-sm mx-auto mt-10'>
                                Copyright © 2025 WebsiteFinder. All rights reserved
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-28 bg-transparent"></div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
