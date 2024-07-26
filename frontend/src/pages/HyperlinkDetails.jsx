import { useState, useEffect } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import photoLogo from '../assets/photo.svg'
import AddImageLogo from '../assets/addimage.svg'

const HyperlinkDetails = () => {
    const { darkMode } = useContext(DarkModeContext); // Destructure darkMode from context
    const { id } = useParams(); // Get the hyperlinkId from URL parameters
    const [hyperlink, setHyperlink] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        domain: '',
        heading: '',
        subheading: '',
        extra: '',
        imageUrl: '' // Updated to single imageUrl
    });

    const [image, setImage] = useState(null); // State to hold uploaded image

    useEffect(() => {
        const fetchHyperlink = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/carpool/specific-hyperlink/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hyperlink');
                }
                const data = await response.json();
                setHyperlink(data);
                setFormData({
                    name: data.name,
                    domain: data.domain,
                    heading: data.heading,
                    subheading: data.subheading,
                    extra: data.extra,
                    imageUrl: data.imageUrl // Updated to single imageUrl
                });
            } catch (error) {
                console.error('Error fetching hyperlink:', error);
            }
        };

        fetchHyperlink();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store selected file in state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('domain', formData.domain);
            formDataToSend.append('heading', formData.heading);
            formDataToSend.append('subheading', formData.subheading);
            formDataToSend.append('extra', formData.extra);

            // Append the single file
            if (image) {
                formDataToSend.append('image', image);
            }

            const response = await fetch(`http://localhost:4000/api/carpool/update-hyperlink/${id}`, {
                method: 'PATCH', // or 'PUT' if doing a full update
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            // Reset form data after successful submission
            setFormData({
                name: '',
                domain: '',
                heading: '',
                subheading: '',
                extra: '',
                imageUrl: ''
            });
            setImage(null);

            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!hyperlink) {
        return <div>Loading... the data is empty</div>; // Add a loading indicator
    }

    // Utility function to format the date and time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()); // Get day
        const month = date.toLocaleString('en-US', { month: 'long' }); // Get month in long format
        const year = String(date.getFullYear()); // Get full year

        const gap = `    🕒`; // Custom gap with spaces

        const options = { hour: '2-digit', minute: '2-digit', hour12: true }; // Format time with AM/PM
        const time = date.toLocaleTimeString(undefined, options);

        return `${day} ${month} ${year} ${gap} ${time}`;
    };

    return (
        <div className={`w-full h-auto bg-gray-300 dark:bg-black ${darkMode ? 'dark' : ''}`}>

            <div className='w-full h-20 bg-transparent'></div>

            <div className='flex flex-col mb-20 w-10/12 lg:w-8/12 rounded-3xl mx-auto'>
                <div className='flex flex-col lg:flex-row justify-around gap-5 lg:gap-28 p-3 lg:p-6 w-full mx-auto'>
                    <p className='dark:text-color1 text-md lg:text-lg font-font2 my-auto text-center'>Title</p>
                    <a href={hyperlink.domain} target='_blank'><p className='dark:text-color1 text-md lg:text-lg p-4 rounded-3xl my-auto text-center'>{hyperlink.name}</p></a>
                </div>
                <div className='flex flex-col lg:flex-row justify-around gap-5 lg:gap-28 p-3 lg:p-6 w-full mx-auto border-2 border-b-slate-400 border-l-transparent border-r-transparent border-t-transparent'>
                    <p className='dark:text-color1 text-md lg:text-lg font-font2 my-auto text-center'>Domain / Hosting</p>
                    <a href={hyperlink.domain} target='_blank'><p className='dark:text-color1 text-md lg:text-lg p-4 rounded-3xl my-auto text-center'>{hyperlink.domain.length > 10 ? `${hyperlink.domain.slice(0, 30)}...` : hyperlink.domain}</p></a>
                </div>
                <div className='flex flex-col lg:flex-row justify-around gap-5 lg:gap-28 p-3 lg:p-6 w-full mx-auto'>
                    <p className='dark:text-color1 text-md lg:text-lg font-font2 my-auto text-center'>Heading</p>
                    <p className='dark:text-color1 text-md lg:text-lg p-4 rounded-3xl my-auto text-center'>{hyperlink.heading}</p>
                </div>
                <div className='flex flex-col lg:flex-row justify-around gap-5 lg:gap-28 p-3 lg:p-6 w-full mx-auto
                border-2 border-b-slate-400 border-l-transparent border-r-transparent border-t-transparent'>
                    <p className='dark:text-color1 text-md lg:text-lg font-font2 my-auto text-center'>Sub - Heading</p>
                    <p className='dark:text-color1 text-md lg:text-lg p-4 rounded-3xl my-auto text-center'>{hyperlink.subheading}</p>
                </div>
                <div className='flex flex-col flex-wrap justify-center gap-5 p-3 mt-6 lg:p-6 w-full mx-auto'>
                    <p className='dark:text-color1 text-md lg:text-xl font-font2 my-auto text-center'>Extra Info</p>
                    <pre className='dark:text-color1 text-md lg:text-lg p-4 rounded-3xl my-auto text-wrap' dangerouslySetInnerHTML={{ __html: hyperlink.extra }} />
                </div>
            </div>

            <div className='mt-10 lg:mt-20'>
                <div className='p-4 w-fit mx-auto'>
                    <pre className="text-sm font-font5 text-black dark:text-color1 text-center">
                        &#128197; {formatDate(hyperlink.createdAt)} <br /><br />&#128221; {formatDate(hyperlink.updatedAt)}
                    </pre>
                </div>
            </div>


            <p className='text-black dark:text-color1 text-xl lg:text-3xl font-font4 font-bold mt-10 p-4 w-fit mx-auto'>Images</p>

            <div className='flex flex-col gap-1 pb-10 mt-14'>
                {hyperlink.imageUrl ? (
                    <div className="w-full h-full rounded-xl p-10">
                        <img
                            src={`http://localhost:4000/${hyperlink.imageUrl}`}
                            alt="Image"
                            className="rounded-xl mx-auto"
                        />
                        {/* Download link */}
                        <a
                            href={`http://localhost:4000/${hyperlink.imageUrl}`}
                            download="Image.png"
                            className="text-green-400 hover:text-green-700 mt-10 block font-font2 font-semibold text-lg text-center"
                        >
                            Download Image
                        </a>
                        <p className='text-black-500 dark:text-white mt-2 block font-font3 font-semibold text-lg text-center'>
                            ID of Image is - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {hyperlink.imageUrl.slice(9)}
                        </p>
                    </div>
                ) : (
                    <div className={`w-10 h-10 overflow-hidden rounded-3xl mx-auto ${darkMode ? 'filter invert' : ''}`}>
                        <img
                            src={photoLogo}
                            alt="Empty Photo"
                            className="w-full h-full m-auto"
                        />
                    </div>
                )}
            </div>

            <hr className='w-10/12 mx-auto' />


            <div className={`w-5/6 lg:w-5/6 rounded-3xl mx-auto h-auto p-5 mt-8`}>
                <p className='text-center text-lg lg:text-2xl font-font3 font-semibold p-3 mb-10 dark:text-color1'>Update Your Document</p>
                <form onSubmit={handleSubmit} className='space-y-8 lg:space-y-20 '>
                    <div>
                        <label htmlFor='name' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1'>
                            Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='mt-4 p-2 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                        />
                    </div>
                    <div>
                        <label htmlFor='domain' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1'>
                            Domain
                        </label>
                        <input
                            type='text'
                            name='domain'
                            id='domain'
                            value={formData.domain}
                            onChange={handleChange}
                            className='mt-4 p-2 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                        />
                    </div>
                    <div>
                        <label htmlFor='heading' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1'>
                            Heading
                        </label>
                        <input
                            type='text'
                            name='heading'
                            id='heading'
                            value={formData.heading}
                            onChange={handleChange}
                            className='mt-4 p-2 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                        />
                    </div>
                    <div>
                        <label htmlFor='subheading' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1'>
                            Sub-Heading
                        </label>
                        <input
                            type='text'
                            name='subheading'
                            id='subheading'
                            value={formData.subheading}
                            onChange={handleChange}
                            className='mt-4 p-2 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                        />
                    </div>
                    <div>
                        <label htmlFor='extra' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1'>
                            Extra
                        </label>
                        <textarea
                            name='extra'
                            id='extra'
                            value={formData.extra}
                            onChange={handleChange}
                            rows='10'
                            className='mt-4 p-4 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: darkMode ? '#c0c0c0 #000' : '#b310fe #fff', /* Purple thumb with White track */
                            }}
                        />
                    </div>

                    <div className='flex flex-row justify-around gap-10'>
                        <div className="my-auto">
                            <label htmlFor="image" className="flex items-center cursor-pointer">
                                <img src={AddImageLogo} alt="Add Image" className={`w-9 h-9 mx-auto ${darkMode ? 'filter invert' : ''}`} />
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="sr-only" // Hide the file input element
                                />
                            </label>
                        </div>
                        <div className=''>
                            <button type='submit' className='px-6 py-2 font-font6 text-sm lg:text-lg font-bold bg-blue-500 dark:bg-blue-800 hover:bg-blue-900 text-color1 rounded-lg'>
                                Update Hyperlink
                            </button>
                        </div>
                    </div>
                </form>
            </div>


            <div className='w-46 h-56'></div>
        </div>
    );
}

export default HyperlinkDetails;