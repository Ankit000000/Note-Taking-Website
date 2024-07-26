import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Load dark mode preference from localStorage
        const isDarkMode = localStorage.getItem('darkMode');
        if (isDarkMode) {
            setDarkMode(JSON.parse(isDarkMode));
        }
    }, []);

    const toggleDarkMode = () => {
        // Toggle dark mode state
        setDarkMode(prevDarkMode => {
            const newDarkMode = !prevDarkMode;
            // Store dark mode preference in localStorage
            localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
            return newDarkMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Add prop type validation for the children prop
DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DarkModeContext;
