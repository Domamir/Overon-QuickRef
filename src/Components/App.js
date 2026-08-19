import '../CSS/App.css';
import ElementsGroups from "../JsonData/ElementsGroups.json";
import ElementsCollection from "./ElementsCollection";
import speedIcon from '../Assets/speed.png';
import swordsIcon from '../Assets/swords.png';
import pouchIcon from '../Assets/pouch.png';
import dangerIcon from '../Assets/danger.png';
import skullIcon from '../Assets/skull.png';

const iconMap = {
    speed: speedIcon,
    swords: swordsIcon,
    pouch: pouchIcon,
    danger: dangerIcon,
    skull: skullIcon
};

function App() {
  return (
    <div className="App">
      <main className="App-main container-fluid">
          {ElementsGroups.elementsGroups.map((group, index) => (
              <ElementsCollection className="row"
                                  key={index}
                                  name={group.name}
                                  restriction={group.restriction}
                                  description={group.description}
                                  iconPath={iconMap[group.iconPath]}
                                  groupColor={group.groupColor}
              />
          ))}
      </main>
    </div>
  );
}

export default App;
