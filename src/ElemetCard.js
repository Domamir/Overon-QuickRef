function ElementCard({name, shortDescription, longDescription})
{
    return (
        <div className="ElementCard">
            <div className="ElementName">{name}</div>
            <div className="ElementDescription">{shortDescription}</div>
        </div>
    );
}

export default ElementCard;