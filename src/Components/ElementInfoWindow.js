import '../CSS/ElementInfoWindow.css';
import ElementDescription from "./ElementDescription";

function  ElementInfoWindow({onClose, onReferenceClick, name, shortDescription, longDescription, groupColor, isDarkMode}) {

    const backgroundColor = groupColor || '#f0f0f0';

    return (
        <div className="elementInfoWindowOverlay" onClick={onClose}>
            <div className="elementInfoWindowBody" style={{ backgroundColor}}  onClick={(e) => e.stopPropagation()}>
                <div className="titleRow text-start ps-2">
                    {name}
                </div>
                <div className={`descriptionRow px-2 ${isDarkMode ? 'dark' : ''}`}>
                    {shortDescription?.trim() && (
                        <div className="shortDescriptionBody ps-1">
                            Cost: {shortDescription}
                        </div>
                    )}
                    <div className="longDescriptionBody ps-1">
                        <ElementDescription text={longDescription} onReferenceClick={onReferenceClick} referenceColor={groupColor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElementInfoWindow;