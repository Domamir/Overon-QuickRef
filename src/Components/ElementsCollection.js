import OveronElementsCategories from "../JsonData/OveronElementsCategories.json"
import ElementCard from "./ElementCard";
import ElementInfoWindow from "./ElementInfoWindow";
import {useMemo, useState} from 'react';
import '../CSS/ElementsCollection.css';
import elementInfoWindow from "./ElementInfoWindow";

function ElementsCollection({name, restriction, description, iconPath, groupColor}) {
    const [elementInfoWindowData, setElementInfoWindowData] = useState({ isOpen: false, name: '', shortDescription: '', longDescription: '' });
    const collator = useMemo(() => new Intl.Collator('pl', {sensitivity: 'base'}),[])

    const sortedElements = useMemo(() => {
        return OveronElementsCategories
            .filter(element => element.category === name)
            .flatMap(element => element.actions)
            .slice()
            .sort((item1, item2) => collator.compare(item1?.name ?? '', item2?.name ?? ''));
    }, [name, collator])

    const handleButtonClick = (item) => {
        setElementInfoWindowData({
            isOpen: true,
            name: item.name,
            shortDescription: item.shortDescription,
            longDescription: item.longDescription
        });
    };

    const closeElementInfoWindow = () => {
        setElementInfoWindowData({ isOpen: false, name: '', shortDescription: '', longDescription: '' });
    };

    const backgroundColor = groupColor || '#f0f0f0';
    const textColor = groupColor || '#000000';

    return (
        <div className="ElementsCollection" style={{ backgroundColor }}>
            <div className="container-fluid px-3">
                <div className="TitleRow row-cols-2 mb-1">
                    <div className="CollectionTitle text-start ps-2">{name}</div>
                    <div className="CollectionRestictions text-end pe-2">{restriction}</div>
                </div>
                <div className="CollectionBody row px-3" style={{ color: textColor }}>
                    <div className="col d-flex align-items-center flex-column">
                        <div className="CollectionDescription row text-start">{description}</div>
                        <div className="CollectionElements row">
                            {sortedElements.map((item) => (
                                <div key={item.name} className="col-6 col-md-4 col-lg-3 ps-0">
                                    <ElementCard
                                        name={item.name}
                                        shortDescription={item.shortDescription}
                                        iconPath={iconPath}
                                        textColor={textColor}
                                        onClick={() => handleButtonClick(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {elementInfoWindow && (
                <ElementInfoWindow
                    isOpen={elementInfoWindowData.isOpen}
                    onClose={closeElementInfoWindow}
                    name={elementInfoWindowData.name}
                    shortDescription={elementInfoWindowData.shortDescription}
                    longDescription={elementInfoWindowData.longDescription}
                    groupColor={groupColor}
                />
            )}
        </div>
    );
}

export default ElementsCollection;