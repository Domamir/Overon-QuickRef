import logo from './logo.svg';
import './CSS/App.css';
import ElementsGroups from "./JsonData/ElementsGroups.json";
import ElementsCollection from "./ElementsCollection";

function App() {
  return (
    <div className="App">
      <main className="App-main">
          {ElementsGroups.elementsGroups.map((group, index) => (
              <ElementsCollection key={index} name={group.name} restriction={group.restriction} description={group.description} />
          ))}
      </main>
    </div>
  );
}

export default App;
