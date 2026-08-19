import '../CSS/ElementCard.css';

function ElementCard({name, shortDescription, iconPath, textColor, onClick})
{
    return (
        <div className="ElementCard my-2" style={{ color: textColor }}>
            <button className="buttonRow row w-100 ps-0" onClick={onClick}>
                <div className="col-3 d-flex align-items-center justify-content-center px-0 pe-1">
                    <div className="square-image">
                        <img src={iconPath} alt="icon" className="img-fluid collection-img"/>
                    </div>
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