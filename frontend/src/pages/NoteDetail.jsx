import { useState, useEffect } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import photoLogo from '../assets/photo.svg'
import AddImageLogo from '../assets/addimage.svg'

const NoteDetail = () => {
    const { darkMode } = useContext(DarkModeContext); // Destructure darkMode from context
    const { id } = useParams(); // Get the noteId from URL parameters
    const [note, setNote] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        domains: '',
        imageUrls: []
    });

    const [image, setImage] = useState(null); // State to hold uploaded images

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/notes/specific-note/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch note');
                }
                const data = await response.json();
                setNote(data);
                setFormData({
                    title: data.title,
                    body: data.body,
                    domains: data.domains,
                    imageUrls: data.imageUrls
                });
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files); // Store selected files in state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('body', formData.body);
            formDataToSend.append('domains', formData.domains);

            // Append each file individually
            if (image && image.length > 0) {
                for (let i = 0; i < image.length; i++) {
                    formDataToSend.append('image', image[i]);
                }
            }

            const response = await fetch(`http://localhost:4000/api/notes/update-note/${id}`, {
                method: 'PATCH', // or 'PUT' if doing a full update
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            // Reset form data after successful submission
            setFormData({
                title: "",
                body: "",
                domains: "",
            });
            setImage(null);

            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!note) {
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

            <div className='pt-10 '>
                <div className='flex justify-center w-4/5 mx-auto'>
                    <h1 className='text-2xl lg:text-3xl font-font7 font-bold text-black dark:text-slate-300 border-4 border-b-slate-400 border-t-transparent border-r-transparent border-l-transparent p-4'>{note.title}</h1>
                </div>

                <div className='flex justify-center w-5/6 mx-auto mt-10'>
                    <pre
                        className='text-md lg:text-xl text-black dark:text-color1 max-w-full text-wrap'
                        dangerouslySetInnerHTML={{ __html: note.body }}
                    />
                </div>

                <div className='mt-44 w-fit mx-auto'>
                    <pre className="text-sm lg:text-md font-font5 text-black dark:text-slate-300 text-center">
                        &#128197; {formatDate(note.createdAt)} <br /><br />&#128221; {formatDate(note.updatedAt)}
                    </pre>
                </div>
            </div>

            <p className='text-black dark:text-slate-300 text-xl lg:text-3xl font-font4 font-bold mt-20 w-fit mx-auto'>Images</p>

            <div className='flex flex-col gap-1 pb-10 mt-14'>
                {note.imageUrls && note.imageUrls.length > 0 ? (
                    note.imageUrls.map((imageUrl, index) => (
                        <div key={index} className="w-full h-full rounded-xl p-10">
                            <img
                                src={`http://localhost:4000/${imageUrl}`}
                                alt={`Image ${index + 1}`}
                                className="rounded-xl mx-auto"
                            />
                            {/* Download link */}
                            <a
                                href={`http://localhost:4000/${imageUrl}`}
                                download={`Image_${index + 1}.png`}
                                className="text-green-500 hover:text-green-700 mt-10 block font-font2 font-semibold text-lg text-center"
                            >
                                Download Image
                            </a>
                            <pre className='text-black-500 dark:text-slate-300 mt-2 block font-font3 font-semibold text-md text-center'> ID of Image is - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {imageUrl.slice(9)}</pre>
                        </div>
                    ))
                ) : (
                    <div className={`flex-grow-3 w-10 h-10 overflow-hidden rounded-3xl mx-auto ${darkMode ? 'filter invert' : ''}`}>
                        <img
                            src={photoLogo}
                            alt="Empty Photo"
                            className="w-full h-full m-auto "
                        />
                    </div>
                )}
            </div>

            <hr className='w-10/12 mx-auto' />


            <div className={`w-5/6 lg:w-5/6 rounded-3xl mx-auto h-auto p-5 mt-10`}>
                <p className='text-center text-lg lg:text-2xl font-font3 font-semibold p-3 mb-10 dark:text-color1'>Update Your Document</p>
                <form onSubmit={handleSubmit} className='space-y-8 lg:space-y-20'>
                    <div>
                        <label htmlFor='title' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1 mb-8'>
                            Title
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={formData.title}
                            onChange={handleChange}
                            className='mt-1 p-4 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black'
                        />
                    </div>
                    <div>
                        <label htmlFor='body' className=' text-center font-font6 font-bold block text-lg text-gray-700 dark:text-color1 mb-8'>
                            Body
                        </label>
                        <textarea
                            name='body'
                            id='body'
                            value={formData.body}
                            onChange={handleChange}
                            rows='10'
                            className='mt-1 p-4 block w-full font-arial lg:text-lg border-2 border-gray-300 rounded-2xl dark:text-color1 dark:bg-black h-auto min-h-96'
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: darkMode ? '#c0c0c0 #000' : '#b310fe #fff',
                            }}
                        />
                    </div>

                    <div className='flex flex-row justify-around gap-10'>
                        <div className="my-auto">
                            <label htmlFor="image" className="flex items-center cursor-pointer">
                                <img src={AddImageLogo} alt="Add Image" className={`w-9 lg:w-10 h-9 lg:h-10 mx-auto ${darkMode ? 'filter invert' : ''}`} />
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
                        <div className=''>
                            <button type='submit' className='px-4 py-2 font-font6 text-sm lg:text-lg font-bold bg-blue-600 dark:bg-blue-800 hover:bg-blue-900 text-slate-200 rounded-lg'>
                                Update Post
                            </button>
                        </div>
                    </div>

                </form>
            </div>

            <div className='w-46 h-52'></div>
        </div>
    );
}

export default NoteDetail;