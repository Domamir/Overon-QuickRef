import '../CSS/ElementInfoWindow.css';

function  ElementInfoWindow({isOpen, onClose, name, shortDescription, longDescription, groupColor}) {

    if (!isOpen)
    {
        return null;
    }

    const backgroundColor = groupColor || '#f0f0f0';

    return (
        <div className="elementInfoWindowOverlay" onClick={onClose}>
            <div className="elementInfoWindowBody d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor}}  onClick={(e) => e.stopPropagation()}>
                <div className="titleRow row">
                    {name}
                </div>
                <div className="descriptionRow row d-flex flex-column px-2">
                    <div className="shortDescriptionBody ps-1">
                        {shortDescription}
                    </div>
                    <div className="longDescriptionBody ps-1">
                        {longDescription}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElementInfoWindow;