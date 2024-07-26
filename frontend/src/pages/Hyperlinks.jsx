import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react'
import DarkModeContext from '../contexts/DarkModeContext'
import { Link } from 'react-router-dom';
import TrashLogo from '../assets/trash.svg'
import cancelLogo from '../assets/cancel.svg'
import heartLogo from '../assets/heart.svg'
import hyperlinkDetailLogo from '../assets/hyperlink_detail.svg'
import filledHeartLogo from '../assets/filledheart.svg'
import overlayLogo from '../assets/overlay.svg'
import AddImageLogo from '../assets/addimage.svg'
import formLogo from '../assets/form.svg'


const Hyperlinks = () => {
    const { darkMode } = useContext(DarkModeContext); // Destructure darkMode from context
    const [search, setSearch] = useState('');
    const [content, setContent] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const [expandedItem2, setExpandedItem2] = useState(null);

    const toggleItem = (index) => {
        setExpandedItem((prevExpandedItem) => (prevExpandedItem === index ? null : index));
    };

    const toggleItem2 = (index) => {
        setExpandedItem2((prevExpandedItem2) => (prevExpandedItem2 === index ? null : index));
    };

    const handleClose = () => {
        setExpandedItem(null);
        setExpandedItem2(null);
    };

    const handleDelete = async (postId, item_name) => {
        // Display confirmation dialog
        const isConfirmed = window.confirm(`Are you SURE about the DELETION of       →        ${item_name} `);

        // Check if user confirmed deletion
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/carpool/${postId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Post deleted successfully');
                    // Optionally, you can perform additional actions after successful deletion
                    window.location.reload(); // Reload the page after deleting the post
                } else {
                    console.error('Failed to delete post');
                    // Optionally, handle the failure scenario
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                // Handle any errors that occur during the deletion process
            }
        }
    };

    // the code for the form begins here

    const [formData, setFormData] = useState({
        name: '',
        domain: '',
        heading: '',
        subheading: '',
        extra: ''
    });
    const [image, setImage] = useState(null);
    const [isCustomHeading, setIsCustomHeading] = useState(false);
    const [isCustomSubheading, setIsCustomSubheading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'heading' && value === 'other') {
            setIsCustomHeading(true);
        } else if (name === 'subheading' && value === 'other') {
            setIsCustomSubheading(true);
        } else {
            setIsCustomHeading(false);
            setIsCustomSubheading(false);
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCustomHeading = (e) => {
        setFormData({ ...formData, heading: e.target.value });
    };

    const handleCustomSubheading = (e) => {
        setFormData({ ...formData, subheading: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('domain', formData.domain);
            formDataToSend.append('heading', isCustomHeading ? formData.heading : formData.heading);
            formDataToSend.append('subheading', isCustomSubheading ? formData.subheading : formData.subheading);
            formDataToSend.append('extra', formData.extra);
            formDataToSend.append('image', image);

            const response = await fetch('http://localhost:4000/api/carpool/post', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Failed to add data');
            }

            // Reset form data after successful submission
            setFormData({
                name: "",
                domain: "",
                heading: "",
                subheading: "",
                extra: ""
            });
            setImage(null);
            setIsCustomHeading(false); // Reset custom heading flag
            setIsCustomSubheading(false); // Reset custom subheading flag
            // Assuming fetchContent is a function to refetch data
            fetchContent();
            console.log('Data added successfully');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    // the code for the form ends here

    const fetchContent = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:4000/api/carpool/every-post');
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }, []);

    useEffect(() => {
        fetchContent(); // Initial fetch when component mounts
    }, [fetchContent]); // useEffect depends on fetchContent

    const handleFavourite = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/carpool/favourite/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to toggle favourite');
            }

            // If the request is successful, refetch the content
            fetchContent();
        } catch (error) {
            console.error('Error toggling favourite:', error);
            // Handle error if needed
        }
    };

    const filterContent = (searchText) => {
        return content.filter((item) => {
            const fieldsToSearch = ['name', 'domain', 'heading', 'subheading', 'extra', 'createdAt', 'updatedAt'];
            for (const field of fieldsToSearch) {
                if (item[field] && item[field].toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
    };

    const filteredContent = filterContent(search);

    return (
        <div className={`p-1  ${darkMode ? 'dark dark:bg-black' : 'bg-gradient-to-b from-color3 via-color3 to-color3'}`}>

            <div className='pt-4 flex flex-row items-center justify-between'>
                <div className='w-3/5 relative'>
                    <h1 className=" text-xl lg:text-3xl font-font6 font-extrabold text-black dark:text-color1 text-center lg:text-start ml-3 mb-3 lg:mb-0 lg:ml-24 p-1 lg:p-4 rounded-2xl">Useful Domains should be Saved</h1>
                </div>

                <div className="relative w-1/5 flex justify-end">
                    <button type="button" onClick={toggleItem2}>
                        {!expandedItem2 && <img src={formLogo} alt="form button" className="w-7 lg:w-9 h-7 lg:h-9 mx-auto dark:filter dark:invert " />}
                    </button>
                    {expandedItem2 && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div className="absolute bg-color5 rounded-3xl p-3 flex flex-col dark:bg-black w-4/5 lg:w-2/5 shadow-2xl dark:ring-8 dark:ring-color5">

                                <div className='flex flex-row justify-around'>
                                    <p className='text-md lg:text-2xl font-font3 font-semibold text-white my-auto'>Enter Details</p>

                                    <button className="text-gray-600 p-1 my-auto dark:filter dark:invert" onClick={handleClose}>
                                        <img src={cancelLogo} alt="Trash" className={`w-10 h-10 shadow-2xl dark:filter dark:invert`} />
                                    </button>
                                </div>

                                <div className=''>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 rounded-xl" >
                                        <div className='flex flex-row justify-around gap-1 h-fit'>
                                            <div className="flex flex-col justify-center gap-2 h-fit p-1">
                                                <label htmlFor="name" className="text-sm lg:text-lg text-center font-font3 font-semibold text-white mx-auto p-1 w-fit">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder=""
                                                    className="text-black text-md lg:text-lg font-font3 font-medium w-2/3 lg:w-fit text-center p-1 rounded-md bg-gray-300 mx-auto h-6"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-center gap-2 h-fit p-1">
                                                <label htmlFor="domain" className="text-sm lg:text-lg text-center font-font3 font-semibold text-white mx-auto p-1 w-fit">Domain</label>
                                                <input
                                                    type="text"
                                                    id="domain"
                                                    name="domain"
                                                    value={formData.domain}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder=" "
                                                    className="text-black text-md lg:text-lg font-font3 font-medium w-2/3 lg:w-fit text-center p-1 rounded-md bg-gray-300 mx-auto h-6"
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-around gap-1 h-fit'>
                                            <div className="flex flex-col justify-center gap-2 h-fit p-1 w-1/2">
                                                <label htmlFor="extra" className="text-sm lg:text-lg text-center font-font3 font-semibold text-white mx-auto p-1 w-fit">Extra - Info</label>
                                                <input
                                                    type="text"
                                                    id="extra"
                                                    name="extra"
                                                    value={formData.extra}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className="text-black text-md lg:text-lg font-font3 font-medium w-4/5 lg:w-4/5 text-center p-1 rounded-md bg-gray-300 mx-auto h-6"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-center gap-2 h-fit p-1 w-1/2 my-auto">
                                                <label htmlFor="image" className="w-fit mx-auto">
                                                    <img src={AddImageLogo} alt="Add Image" className={`w-8 lg:w-10 h-8 lg:h-10 ${darkMode ? 'filter invert' : 'filter invert'}`} />
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className='flex flex-row justify-around gap-1 h-fit'>
                                            <div className="flex flex-col justify-center gap-2 h-fit p-1 w-1/2">
                                                <label htmlFor="heading" className="text-sm lg:text-lg text-center font-font3 font-semibold text-white mx-auto p-1 w-fit">Heading</label>
                                                <select
                                                    id="heading"
                                                    name="heading"
                                                    value={formData.heading}
                                                    onChange={handleChange}
                                                    className="text-black text-md lg:text-lg font-font3 font-medium w-4/5 lg:w-4/5 text-center rounded-md bg-gray-300 mx-auto h-6"
                                                >
                                                    <option value=""></option>
                                                    <option value="technical-documentation">Technical Documentation</option>
                                                    <option value="cybersecurity-and-ethical-hacking">Cybersecurity</option>
                                                    <option value="educational-resources">Educational Resources</option>
                                                    <option value="open-source-projects">Open Source Projects</option>
                                                    <option value="forums-and-community-sites">Forums and Community Sites</option>
                                                    <option value="other" className='text-blue-600 font-font3 text-center font-semibold'>Custom</option>
                                                </select>
                                                {isCustomHeading && (
                                                    <input
                                                        type="text"
                                                        placeholder="----Text---"
                                                        value={formData.heading}
                                                        onChange={handleCustomHeading}
                                                        className="text-black text-md lg:text-lg font-font3 font-medium w-4/5 lg:w-4/5 text-center p-1 rounded-md bg-gray-300 mx-auto h-6"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col justify-center gap-2 h-fit p-1 w-1/2">
                                                <label htmlFor="subheading" className="text-sm lg:text-lg text-center font-font3 font-semibold text-white mx-auto p-1 w-fit">Sub - Heading</label>
                                                <select
                                                    id="subheading"
                                                    name="subheading"
                                                    value={formData.subheading}
                                                    onChange={handleChange}
                                                    className="text-black text-md lg:text-lg font-font3 font-medium w-4/5 lg:w-4/5 text-center rounded-md bg-gray-300 mx-auto h-6"
                                                >
                                                    <option value=""></option>
                                                    <option value="code-repositories">Code Repositories</option>
                                                    <option value="penetration-testing">Penetration Testing</option>
                                                    <option value="incident-response">Incident Response</option>
                                                    <option value="research-databases">Research Databases</option>
                                                    <option value="tech-news-and-blogs">Tech News and Blogs</option>
                                                    <option value="other" className='text-blue-600 font-font3 text-center font-semibold'>Custom</option>
                                                </select>
                                                {isCustomSubheading && (
                                                    <input
                                                        type="text"
                                                        placeholder="----Text---"
                                                        value={formData.subheading}
                                                        onChange={handleCustomSubheading}
                                                        className="text-black text-md lg:text-lg font-font3 font-medium w-4/5 lg:w-4/5 text-center p-1 rounded-md bg-gray-300 mx-auto h-6"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-row justify-center">
                                            <button type="submit" className="text-sm lg:text-lg p-1 text-center font-font2 font-semibold w-20 dark:text-white bg-blue-600 text-white rounded-lg hover:bg-blue-400 my-auto">ADD</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='w-2/5 lg:w-1/5 relative lg:p-1'>
                    <form className="flex justify-end">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder='Search Blocks'
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-4/5 bg-black text-white lg:w-3/5 lg:h-6 rounded-lg text-center font-font3 font-bold text-sm mr-5 lg:mr-10'
                        />
                    </form>
                </div>
            </div>

            <div className="flex flex-row flex-wrap gap-5 justify-evenly lg:p-4">
                {filteredContent.map((item, index) => (
                    <div key={index} className={`mt-2 p-3 relative overflow-hidden h-fit lg:h-fit rounded-3xl shadow-2xl w-fit ${item.favourite ? 'bg-color4 shadow-2xl' : 'bg-color2 shadow-2xl'}`}
                    >
                        <div className='flex flex-col items-center gap-0 w-auto'>
                            {item.imageUrl && (
                                <div className="w-12 h-12 lg:w-full lg:h-14 overflow-hidden rounded-xl">
                                    <a href={item.domain} target='_blank'>
                                        <img
                                            src={`http://localhost:4000/${item.imageUrl}`}
                                            alt="Image"
                                            className="transition-transform transform scale-150 hover:scale-110 w-10 h-10 lg:w-full lg:h-16 rounded-lg mx-auto my-auto"
                                        />
                                    </a>
                                </div>
                            )}

                            <div className='items-center'>
                                <a href={item.domain} target='_blank'>
                                    <h3 className={`text-lg lg:text-xl text-center font-semibold pt-2 pb-1 ${item.favourite ? 'text-color1' : 'text-black'}`}>{item.name}</h3>
                                </a>
                            </div>

                        </div>

                        <div className='flex flex-row gap-4 lg:gap-4 justify-around'>
                            <div className='flex flex-grow-8 flex-col gap-1 mt-2 lg:mt-1'>
                                <div className='flex flex-grow-3'>
                                    <p className={`text-md text-black font-medium ${item.favourite ? 'text-color1' : 'text-black'}`}>{item.heading}</p>
                                </div>

                                <div className={`flex rounded-sm p-1 w-fit ${item.subheading ? '' : ''}  ${item.favourite ? 'border-2 border-t-white border-l-transparent border-r-transparent border-b-transparent' : 'border-2 border-t-black border-l-transparent border-r-transparent border-b-transparent'}`}>
                                    <p className={`text-sm text-black font-semibold mx-auto ${item.favourite ? 'text-color1' : 'text-black'}`}>{item.subheading}</p>
                                </div>
                            </div>

                            <div className='flex-grow-3 flex flex-row gap-1 lg:gap-2 justify-center mt-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex'>
                                        <button type="button" className="flex" onClick={() => handleFavourite(item._id, fetchContent)}>
                                            {item.favourite ? (
                                                <img src={filledHeartLogo} alt="Filled Heart" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />
                                            ) : (
                                                <img src={heartLogo} alt="Heart" className="w-6 h-6" />
                                            )}
                                        </button>
                                    </div>
                                    <div className='flex'>
                                        <button type="button" className="flex" onClick={() => handleDelete(item._id, item.name)}>
                                            <img src={TrashLogo} alt="Trash" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className="flex">
                                        <button type="button" className="text-color8 font-font2" onClick={() => toggleItem(index)}>
                                            {expandedItem === index ? ' ' : <img src={overlayLogo} alt="Overlay" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />}
                                        </button>
                                        {expandedItem === index && (
                                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                                                <div className="absolute flex flex-col lg:flex-row justify-between gap-4 lg:gap-10 bg-color1 dark:bg-black border-4 border-gray-400 rounded-3xl p-4 w-4/5 lg:w-3/5 shadow-2xl">
                                                    <pre className='text-sm lg:text-lg font-font2 font-semibold my-auto dark:text-gray-300 w-full lg:w-5/6 lg:p-3 text-wrap h-96 overflow-y-auto' dangerouslySetInnerHTML={{ __html: item.extra }} />

                                                    <button className='w-full lg:w-1/6 filter invert mx-auto' onClick={handleClose}>  <img src={cancelLogo} alt="Trash" className="w-10 lg:w-13 h-10 lg:h-13 dark:filter dark:invert mx-auto" /></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex'>
                                        <button type="button" className="flex">
                                            <Link to={`/hyperlinkdetail/${item._id}`} className="text-xl font-font3 text-color8 font-bold underline"><img src={hyperlinkDetailLogo} alt="Trash" className={`w-6 h-6 ${item.favourite ? '' : 'filter invert'}`} /></Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-full h-80 bg-transparent'></div>
            {/* <div className='w-full h-96 bg-transparent'></div> */}
        </div>
    );
}

export default Hyperlinks;
