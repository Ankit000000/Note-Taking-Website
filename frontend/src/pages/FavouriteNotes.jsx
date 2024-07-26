import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react'
import DarkModeContext from '../contexts/DarkModeContext'
import { Link } from 'react-router-dom';
import TrashLogo from '../assets/trash.svg'
import emptybookLogo from '../assets/emptybook.svg'
import closebookLogo from '../assets/closebook.svg'
import detailLogo from '../assets/detail.svg'
import closeLogo from '../assets/close.svg'
import formLogo from '../assets/form.svg'
import AddImageLogo from '../assets/addimage.svg'

const FavouriteNotes = () => {
    const { darkMode } = useContext(DarkModeContext); // Destructure darkMode from context
    const [search, setSearch] = useState('');
    const [content, setContent] = useState([]);
    const [expandedItem2, setExpandedItem2] = useState(null);

    const toggleItem2 = (index) => {
        setExpandedItem2((prevExpandedItem2) => (prevExpandedItem2 === index ? null : index));
    };

    const handleClose = () => {
        setExpandedItem2(null);
    };

    const handleDelete = async (postId, item_title) => {
        // Display confirmation dialog
        const isConfirmed = window.confirm(`Are you SURE about the DELETION of       →        ${item_title} `);

        // Check if user confirmed deletion
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/notes/deletenote/${postId}`, {
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

    const fetchContent = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:4000/api/notes/every-note');
            if (!response.ok) {
                throw new Error('Failed to fetch content');
            }
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }, []);

    // form code begins here
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const [image, setImage] = useState(null);
    console.log(image, 10)

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special case for select element
        const newValue = e.target.type === 'select-one' ? e.target.selectedOptions[0].value : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleImageChange = (e) => {
        setImage([...e.target.files]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('body', formData.body);

            // Append each file individually
            if (image && image.length > 0) {
                for (let i = 0; i < image.length; i++) {
                    formDataToSend.append('image', image[i]);
                }
            }

            const response = await fetch('http://localhost:4000/api/notes/newnote', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Failed to add data');
            }

            // Reset form data after successful submission
            setFormData({
                title: "",
                body: "",
            });
            setImage(null);
            fetchContent(); // reloads the whole page after successfull submission of form
            console.log('Data added successfully');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    // form code ends here

    useEffect(() => {
        fetchContent(); // Initial fetch when component mounts
    }, [fetchContent]); // useEffect depends on fetchContent

    const handleFavourite = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/notes/favourite/note/${itemId}`, {
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
            const fieldsToSearch = ['title', 'body', 'createdAt', 'updatedAt'];
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
        <div className={`dark:bg-black ${darkMode ? 'dark bg-black' : 'bg-color8'}`}>

            <div className='pt-8 flex flex-row items-center justify-between mb-4'>
                <div className='w-3/5'>
                    <h1 className=" text-xl lg:text-3xl font-font4 font-extrabold text-color1 text-center lg:text-start lg:ml-24 relative z-10">Bookmarked ones</h1>
                </div>

                <div className="relative w-1/5 flex justify-end">
                    <button type="button" onClick={toggleItem2}>
                        {!expandedItem2 && <img src={formLogo} alt="form button" className="w-8 lg:w-9 h-8 lg:h-9 mx-auto filter invert" />}
                    </button>
                    {expandedItem2 && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div className='rounded-3xl p-4 flex flex-col justify-center bg-color5 dark:bg-black w-4/5 lg:w-2/5'>
                                <div className='flex flex-row my-auto justify-center'>
                                    <p className='text-xl lg:text-2xl font-font3 font-semibold my-auto text-white w-fit mx-auto'>Add a new Note</p>

                                    <button className=" mx-auto my-auto w-fit" onClick={handleClose}>
                                        <img src={closeLogo} alt="Trash" className={`w-12 h-12 ${darkMode ? 'filter invert' : 'filter invert'}`} />
                                    </button>
                                </div>

                                <div className=''>
                                    <form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-center ">
                                        <div className='flex flex-col lg:flex-row justify-around gap-3 lg:gap-1 w-full'>
                                            <div className="flex flex-col justify-center gap-2 items-center w-full p-2">
                                                <label htmlFor="name" className="text-lg lg:text-xl font-font3 font-semibold text-white">Title</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder=""
                                                    className="text-black text-md lg:text-lg text-center font-font3 font-medium rounded-lg bg-slate-300 mx-auto h-6 w-8/12"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center gap-2 items-center w-full lg:w-full mt-4 p-2">
                                            <label htmlFor="extra" className="text-lg lg:text-xl font-font3 font-semibold text-white">Body</label>
                                            <textarea
                                                id="body"
                                                name="body"
                                                value={formData.body}
                                                onChange={handleChange}
                                                placeholder="Detailed Information"
                                                className="text-black text-md lg:text-lg text-center font-font3 font-medium rounded-lg bg-slate-300 mx-auto h-auto w-4/5"
                                            />
                                        </div>

                                        <div className='flex flex-row justify-around items-center w-full lg:w-full mt-6 p-2'>
                                            <div className="my-auto">
                                                <label htmlFor="image" className="flex items-center cursor-pointer">
                                                    <img src={AddImageLogo} alt="Add Image" className={`w-9 lg:w-10 h-9 lg:h-10 ${darkMode ? 'filter invert' : 'filter invert'}`} />
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        multiple // Add this attribute to enable multiple file selection
                                                        onChange={handleImageChange}
                                                        className="sr-only" // Hide the file input element
                                                    />
                                                </label>
                                            </div>

                                            <div className="my-auto">
                                                <button type="submit" className="text-sm lg:text-lg font-semibold text-slate-200 bg-blue-800 font-font3 rounded-xl hover:bg-blue-900 my-auto p-2">Add New</button>
                                            </div>
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

            <div className="flex flex-col lg:flex-row flex-wrap lg:justify-evenly">
                {filteredContent.filter((item) => item.favourite === true).map((item, index) => (
                    <div key={index} className={`mt-7 p-2 h-fit rounded-3xl shadow-2xl w-5/6 lg:w-64 mx-auto ${item.favourite ? 'bg-color7' : 'bg-color2'}`}>

                        {item.imageUrls && item.imageUrls.length > 0 && (
                            <div className="flex flex-row gap-5 w-full lg:w-full h-auto flex-wrap">
                                {item.imageUrls.map((imageUrl, index) => (
                                    <div key={index} className={`flex-grow-0 flex-shrink-0 w-12 h-12 overflow-hidden rounded-full my-auto flex items-center ${item.favourite ? 'ring-4 ring-white ring-opacity-20' : 'ring-4 ring-black ring-opacity-20'}`}>
                                        <img
                                            src={`http://localhost:4000/${imageUrl}`}
                                            alt={`Image ${index + 1}`}
                                            className="transition-transform transform scale-150 hover:scale-110 h-10 w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-3">
                            <p className={`text-md lg:text-lg font-font3 text-center font-semibold text-wrap ${item.favourite ? 'text-color1' : 'text-black'}`}>{item.title}</p>
                        </div>

                        <div className="flex flex-row lg:flex-col flex-wrap justify-around mt-5 mb-1">
                            <div className='flex flex-row justify-center gap-6'>
                                <div className=" my-auto">
                                    <button type="button" className="flex" onClick={() => handleFavourite(item._id, fetchContent)}>
                                        {item.favourite ? (
                                            <img src={closebookLogo} alt="Filled Heart" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />
                                        ) : (
                                            <img src={emptybookLogo} alt="Heart" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />
                                        )}
                                    </button>
                                </div>

                                <div className="my-auto">
                                    <button type="button" className="flex" onClick={() => handleDelete(item._id, item.title)}>
                                        <img src={TrashLogo} alt="Trash" className={`w-6 h-6 ${item.favourite ? 'filter invert' : ''}`} />
                                    </button>
                                </div>

                                <div className="">
                                    <button type="button" className="flex">
                                        <Link to={`/notedetail/${item._id}`} className="text-xl font-font3 text-color8 font-bold underline"><img src={detailLogo} alt="Trash" className={`w-6 lg:w-7 h-6 lg:h-7 ${item.favourite ? 'filter invert' : ''}`} /></Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-full h-96 bg-transparent'></div>
            {/* <div className='w-full h-96 bg-transparent'></div> */}
        </div>
    );
}

export default FavouriteNotes;
