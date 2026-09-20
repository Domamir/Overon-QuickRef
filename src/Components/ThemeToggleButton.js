import '../CSS/ThemeToggleButton.css';

function ThemeToggleButton({ isDarkMode, setIsDarkMode })
{
    return (
        <button
            className="theme-toggle-button"
            onClick={() => setIsDarkMode(prevMode => !prevMode)}
        >
            <img  src={`${process.env.PUBLIC_URL}/icons/${isDarkMode ? 'lightIcon' : 'darkIcon'}.png`} alt="Theme Toggle" />
        </button>
    );
}

export default ThemeToggleButton;