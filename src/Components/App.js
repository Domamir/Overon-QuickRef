import '../CSS/App.css';
import ElementsGroups from "../JsonData/ElementsGroups.json";
import ElementsCollection from "./ElementsCollection";
import speedIcon from '../Assets/speed.png';
import swordsIcon from '../Assets/swords.png';
import pouchIcon from '../Assets/pouch.png';
import dangerIcon from '../Assets/danger.png';
import skullIcon from '../Assets/skull.png';
import {useEffect, useState} from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const iconMap = {
    speed: speedIcon,
    swords: swordsIcon,
    pouch: pouchIcon,
    danger: dangerIcon,
    skull: skullIcon
};

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkMode);
    }, [isDarkMode]);

    return (
    <div className="App">
      <main className="App-main container-fluid">
          {ElementsGroups.elementsGroups.map((group, index) => (
              <ElementsCollection className="row"
                                  key={index}
                                  name={group.name}
                                  restriction={group.restriction}
                                  description={group.description}
                                  groupIconPath={iconMap[group.iconPath]}
                                  groupColor={group.groupColor}
                                  isDarkMode={isDarkMode}
              />
          ))}
      </main>

      <ThemeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

    </div>
    );
}

export default App;
