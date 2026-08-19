import '../CSS/ElementInfoWindow.css';

function  ElementInfoWindow({isOpen, onClose, name, shortDescription, longDescription, groupColor}) {

    if (!isOpen)
    {
        return null;
    }

    const backgroundColor = groupColor || '#f0f0f0';

    return (
        <div className="elementInfoWindowOverlay" onClick={onClose}>
            <div className="elementInfoWindowBody" style={{ backgroundColor}}  onClick={(e) => e.stopPropagation()}>
                <div className="titleRow text-start ps-2">
                    {name}
                </div>
                <div className="descriptionRow px-2">
                    {shortDescription?.trim() && (
                        <div className="shortDescriptionBody ps-1">
                            Cost: {shortDescription}
                        </div>
                    )}
                    <div className="longDescriptionBody ps-1">
                        {longDescription}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElementInfoWindow;