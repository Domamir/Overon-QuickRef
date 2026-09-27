import elementsByName from "../JsonData/elementsIndex";

const referencePattern = /\{\{([^{}]+)}}/g;

function ElementDescription({text, onReferenceClick, referenceColor})
{
    if (!text){
        return null;
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = referencePattern.exec(text)) !== null)
    {
        if (match.index > lastIndex)
        {
            parts.push((text.slice(lastIndex, match.index)));
        }

        const label = match[1];
        const referencedElement = elementsByName.get(label.trim().toLowerCase());

        parts.push(
            referencedElement
                ? <span key={match.index} className="descriptionReference" style={{color: referenceColor}} onClick={() => onReferenceClick(referencedElement)}>{label}</span>
                : label
        );

        lastIndex = referencePattern.lastIndex;
    }

    parts.push(text.slice(lastIndex));

    return <>{parts}</>;
}

export default ElementDescription;