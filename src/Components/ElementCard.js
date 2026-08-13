import '../CSS/ElementCard.css';

function ElementCard({name, shortDescription, longDescription, textColor, onClick})
{
    return (
        <div className="ElementCard my-2" style={{ color: textColor }}>
            <button className="buttonRow row w-100 ps-0" onClick={onClick}>
                <div className="col-3 d-flex align-items-center justify-content-center px-0 pe-1">
                    <i src="/path/to/image.jpg" alt="icon" className="img-fluid square-image" />
                </div>
                <div className="col-9 h-100 text-start d-flex flex-column px-0">
                    <div className="ElementName">{name}</div>
                    <div className="ElementShortDescription">{shortDescription}</div>
                </div>
            </button>
        </div>
    );
}

export default ElementCard;