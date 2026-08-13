import logo from '../logo.svg';
import '../CSS/App.css';
import ElementsGroups from "../JsonData/ElementsGroups.json";
import ElementsCollection from "./ElementsCollection";

function App() {
  return (
    <div className="App">
      <main className="App-main container-fluid">
          {ElementsGroups.elementsGroups.map((group, index) => (
              <ElementsCollection className="row" key={index} name={group.name} restriction={group.restriction} description={group.description} groupColor={group.groupColor}/>
          ))}
      </main>
    </div>
  );
}

export default App;
