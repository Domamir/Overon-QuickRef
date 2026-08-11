import OveronElementsCategories from "./JsonData/OveronElementsCategories.json"
import ElementCard from "./ElemetCard";
import './CSS/ElementsCollection.css';

function ElementsCollection({name, restriction, description}) {
    return (
        <div className="ElementsCollection">
            <div className="TitleRow">
                <div className="CollectionTitle">{name}</div>
                <div className="CollectionRestictions">{restriction}</div>
            </div>
            <div>
                <div className="CollectionDescription">{description}</div>
                <div className="CollectionElements">
                    {/*{OveronElementsCategories.filter(element => element.category === name)*/}
                    {/*    .flatMap(element => element.actions)*/}
                    {/*    .map((item, index) => (*/}
                    {/*        <ElementCard key={index} name={name} shortDescription={item.shortDescription} longDescription={item.longDescription} />*/}
                    {/*    ))}*/}
                </div>
            </div>
        </div>
    );
}

export default ElementsCollection;