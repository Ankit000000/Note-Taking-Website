import { useContext } from 'react';
import DarkModeContext from '../contexts/DarkModeContext';
import React from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';

const Help = () => {

    const { darkMode } = useContext(DarkModeContext);

    class CopyToClipboardButton extends React.Component {
        constructor(props) {
            super(props);
            this.buttonRef = React.createRef();
        }

        componentDidMount() {
            // Initialize ClipboardJS when component mounts
            this.clipboard = new ClipboardJS(this.buttonRef.current);
            this.clipboard.on('success', this.handleSuccess);
            this.clipboard.on('error', this.handleError);
        }

        componentWillUnmount() {
            // Destroy ClipboardJS instance when component unmounts
            if (this.clipboard) {
                this.clipboard.destroy();
            }
        }

        handleSuccess = (e) => {
            e.clearSelection();
            alert('Copied to clipboard!');
        };

        handleError = (e) => {
            console.error('Unable to copy: ', e);
        };

        handleClick = () => {
            const { text } = this.props;

            // Using ClipboardJS to copy text to clipboard
            navigator.clipboard.writeText(text).then(
                () => {
                    console.log('Copied to clipboard:', text);
                },
                (error) => {
                    console.error('Unable to copy: ', error);
                }
            );
        };

        render() {
            const { children } = this.props;

            return (
                <div>
                    <button ref={this.buttonRef} onClick={this.handleClick}>
                        {children}
                    </button>
                </div>
            );
        }
    }

    // Define prop types for the component
    CopyToClipboardButton.propTypes = {
        text: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    };

    return (
        <div className={` ${darkMode ? 'dark' : ''}`}>
            {/* First section with home1 background */}
            <div className={`bg-gray-500 dark:bg-black`}>

                <div>
                    <div className='pt-20 lg:pt-20 h-fit bg-black bg-opacity-15'>
                        <h1 className="text-3xl lg:text-5xl text-center lg:text-start lg:ml-40 text-color1 font-bold font-font1  lg:w-2/3 pb-10">Help Section</h1>
                    </div>

                    <div className='flex flex-col gap-10 w-10/12 mx-auto mt-10'>
                        <div className='text-center'>
                            <p className='text-slate-200 font-font4 font-bold text-lg lg:text-2xl bg-black bg-opacity-45 rounded-3xl p-5'>To search for HyperLinks or Notes regarding a specific Date. Refer to the following information or you can say Search rules</p>
                        </div>

                        <div className='text-color1 bg-black bg-opacity-40 p-5 rounded-3xl'>
                            <p className='text-center font-font3 text-3xl text-purple-200'><span className='text-color1 text-lg'>For Example &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>2024-06-09 T 04:11:44.849 +00:00</p>
                            <p className='text-center text-color1 mt-3 text-lg'>This timestamp follows the ISO 8601 format, which is commonly used to represent dates and times. Here’s a breakdown of each part -</p>
                            <ul className='p-6 font-font3'>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 2024: Represents the year</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 06: Represents the month, June in this case</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 09: Represents the day of the month, the 9th</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> T: Separates the date from the time</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 04: Represents the hour in 24-hour format, so 04 is 4 AM</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 11: Represents the minutes, so 11 minutes past the hour</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 44: Represents the seconds, so 44 seconds past the minute</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> 849: Represents the milliseconds, so 849 milliseconds past the second</li>
                                <li className='p-0'><span className='text-4xl text-color1'>• </span> +00:00: Represents the timezone offset, which is UTC (Coordinated Universal Time) in this case. The +00:00 indicates zero hours and zero minutes offset from UTC</li>
                            </ul>
                            <p className='text-color1 text-center text-md'>So, the full timestamp <span className='text-xl font-font3 text-purple-200'>2024-06-09T04:11:44.849+00:00</span> represents <span className='text-xl font-font3 text-purple-200'>June 9th, 2024, at 4:11:44.849 AM UTC</span></p>
                        </div>
                    </div>

                    <br /><br /><hr className='w-10/12 mx-auto' /><br /><br />

                    <p className='text-lg lg:text-3xl text-center text-color1 font-font4 font-bold mb-8'>• General Notations</p>

                    <div className='flex flex-col gap-10 w-10/12 mx-auto'>
                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color9 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color9 mt-4 lg:mt-10 font-font6 mx-auto'> <CopyToClipboardButton text={`<p style="text-align: center; font-size: 26px; color: #FF4433;">Important Heading</p>`} className='text-lg dark:text-color1'>Important Heading</CopyToClipboardButton></p>
                        </div>
                        <p className='text-sm dark:text-color1 mx-auto text-center w-10/12'>&lt;p style=&quot;text-align: center; font-size: 26px; color: #FF4433;&quot;&gt;Important Heading&lt;/p&gt;</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color10 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color10 mt-4 lg:mt-10 font-font6 mx-auto'><CopyToClipboardButton text={`<p style="text-align: center; font-size: 26px; color: #FF7518;">Main Heading</p>`} className='text-lg dark:text-color1'>Main Heading</CopyToClipboardButton></p>
                        </div>
                        <p className='text-sm lg:text-md dark:text-color1 mx-auto text-center w-10/12'>&lt;p style=&quot;text-align: center; font-size: 26px; color: #FF7518;&quot;&gt;Main Heading&lt;/p&gt;</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color11 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color11 mt-4 lg:mt-10 font-font6 mx-auto'><CopyToClipboardButton text={`<p style="text-align: center; font-size: 24px; color: #DAA06D;">Sub-Heading</p>`} className='text-lg dark:text-color1'>Sub - Heading</CopyToClipboardButton></p>
                        </div>
                        <p className='text-sm dark:text-color1 mx-auto text-center w-10/12'>&lt;p style=&quot;text-align: center; font-size: 24px; color: #DAA06D;&quot;&gt;Sub-Heading&lt;/p&gt;</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color12 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color12 mt-4 lg:mt-10 font-font6 mx-auto'><CopyToClipboardButton text={`<a style="color: #00FF7F;" target="_blank" href="">Hyperlink</a>`} className='text-lg dark:text-color1'>Hyperlink</CopyToClipboardButton></p>
                        </div>
                        <p className='text-sm dark:text-color1 mx-auto text-center w-10/12'>&lt;a style=&quot;color: #00FF7F;&quot; target=&quot;_blank&quot; href=&quot;&quot;&gt;Hyperlink&lt;/a&gt;</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color13 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color13 mt-4 lg:mt-10 font-font6 mx-auto'>
                                <CopyToClipboardButton text={`<span style="color: #89CFF0;">COMMAND</span> DESCRIPTION`} className='text-lg dark:text-color1'>Code Sample</CopyToClipboardButton>
                            </p>
                        </div>
                        <p className='text-sm dark:text-color1 mx-auto text-center w-10/12'>&lt;span style=&quot;color: #89CFF0;&quot;&gt;COMMAND&lt;/span&gt; DESCRIPTION</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-8xl text-color1 flex flex-start'>•</p>
                            <p className='text-md lg:text-lg dark:text-color1 mt-4 lg:mt-10 font-font6 mx-auto'>
                                <CopyToClipboardButton text={`<del>Outdated / Deleted</del>`} className='text-lg dark:text-color1'><del>Not-so-Important</del></CopyToClipboardButton>
                            </p>
                        </div>
                        <p className='text-sm dark:text-color1 mx-auto text-center w-10/12'>&lt;del&gt;Outdated / Deleted&lt;/del&gt;</p>

                        <div className='flex flex-row justify-center w-8/12 mx-auto'>
                            <p className='text-5xl lg:text-6xl text-color1 flex flex-start'>&mdash;</p>
                            <p className='text-md lg:text-lg dark:text-color1 mt-4 lg:mt-10 font-font6 mx-auto'>
                                <CopyToClipboardButton text={`<hr>`} className='text-lg dark:text-color1'>&lt;hr&gt;</CopyToClipboardButton>
                            </p>
                        </div>
                    </div>

                    <br /><br /><hr className='w-10/12 mx-auto' /><br /><br />

                    <p className='text-lg lg:text-3xl text-center text-color1 font-font4 font-bold mb-8'><CopyToClipboardButton text={`CODE SAMPLE
                        In the above code can you apply syntax highlighting using inline CSS on every line (if needed) and only p tags or span tags (if needed) give me only the code (not in an HTML file) like this

                        <p>
                        <span style="color: #c678dd;">class</span> <span style="color: #61afef;">Solution</span> {
                        <span style="color: #c678dd;">public</span> <span style="color: #c678dd;">int</span> majorityElement(<span style="color: #61afef;">int</span>[] nums) {
                        <span style="color: #61afef;">int</span> candidate = nums[<span style="color: #d19a66;">0</span>];
                        <span style="color: #61afef;">int</span> count = <span style="color: #d19a66;">1</span>;

                        .... and so on`} className='text-lg dark:text-color1'>ChatGPT pompt for Syntax Highlighting in Code</CopyToClipboardButton>
                    </p>

                    <div className='flex flex-col w-10/12 mx-auto text-sm dark:text-color1'>
                        <p className='text-md text-color13 mb-2'>CODE SAMPLE</p>
                        <p className='mb-4'>In the above code can you apply syntax highlighting using inline CSS on every line (if needed) and only p tags or span tags (if needed) give me only the code (not in an HTML file)

                            like this </p>
                        <p className='text-color13'>&lt;p&gt;</p>
                        <p className='text-color13'>{`<span style="color: #c678dd;">class</span> <span style="color: #61afef;">Solution</span> {`}</p>
                        <p className='text-color13'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`<span style="color: #c678dd;">public</span> <span style="color: #c678dd;">int</span> majorityElement(<span style="color: #61afef;">int</span>[] nums) {`}</p>
                        <p className='text-color13'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`<span style="color: #61afef;">int</span> candidate = nums[<span style="color: #d19a66;">0</span>];`}</p>
                        <p className='text-color13'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`<span style="color: #61afef;">int</span> count = <span style="color: #d19a66;">1</span>;`}</p>
                        <p className='mt-4'>{`.... and so on`}</p>
                        <p className='mt-20 font-font3 text-md'>then later you can style the topmost <span className='text-color13'>&lt;p&gt;</span> tag to make a white border around the</p>
                        <p className='text-lg font-font4 font-bold mt-2'><CopyToClipboardButton text={` <p style="display: inline-block; border: 2px solid #ccc; padding: 25px; border-radius: 50px;">`} className='text-lg dark:text-color1'>code snippet</CopyToClipboardButton></p>
                        <p className='text-color13 mt-4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<p style="display: inline-block; border: 2px solid #ccc; padding: 25px; border-radius: 50px;">`}</p>
                    </div>

                    <br /><br /><hr className='w-10/12 mx-auto' /><br /><br />

                    <div className="w-full h-28 bg-transparent"></div>

                    <div className=''>
                        <div className='flex flex-col justify-between lg:justify-start h-auto p-10 pt-20 bg-black bg-opacity-50'>
                            <div className='flex flex-col justify-around mt-20'>
                                <p className='text-white mx-auto text-sm'>&quot;Website Finder&quot; is dedicated to providing a platform for organizing and storing important Hyperlinks and Documents for personal use only. While we strive to offer a convenient service for our users, please note that the images used may be sourced from the internet or other offline sources, We do not claim ownership of any images they are used for illustrative purposes only. Any unauthorized use or reproduction of the content is not recommended
                                </p>
                                <p className='text-white text-sm mx-auto mt-10'>
                                    Copyright © 2025 WebsiteFinder. All rights reserved
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-10 bg-transparent"></div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Help;
