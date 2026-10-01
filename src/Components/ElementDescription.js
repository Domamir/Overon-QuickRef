import {Fragment} from "react";
import elementsByName from "../JsonData/elementsIndex";
import parseDescription from "../Utils/parseDescription";

// Group 1: **bold text**, group 2: {{reference}}
const inlinePattern = /\*\*(.+?)\*\*|\{\{([^{}]+)}}/g;

function renderInline(text, onReferenceClick, referenceColor)
{
    const parts = [];
    let lastIndex = 0;

    for (const match of text.matchAll(inlinePattern))
    {
        const [fullMatch, boldText, referenceLabel] = match;

        if (match.index > lastIndex)
        {
            parts.push(text.slice(lastIndex, match.index));
        }

        if (boldText !== undefined)
        {
            parts.push(<strong key={match.index}>{renderInline(boldText, onReferenceClick, referenceColor)}</strong>);
        }
        else
        {
            const referencedElement = elementsByName.get(referenceLabel.trim().toLowerCase());

            parts.push(
                referencedElement
                    ? <span key={match.index} className="descriptionReference" style={{color: referenceColor}} onClick={() => onReferenceClick(referencedElement)}>{referenceLabel}</span>
                    : referenceLabel
            );
        }

        lastIndex = match.index + fullMatch.length;
    }

    parts.push(text.slice(lastIndex));

    return parts;
}

function ElementDescription({text, onReferenceClick, referenceColor})
{
    if (!text){
        return null;
    }

    const renderText = line => renderInline(line, onReferenceClick, referenceColor);

    return (
        <>
            {parseDescription(text).map((block, index) => {
                switch (block.type)
                {
                    case 'heading':
                        return (
                            <h4 key={index} className="descriptionHeading" style={{color: referenceColor}}>
                                {renderText(block.text)}
                            </h4>
                        );
                    case 'list':
                        return (
                            <ul key={index} className="descriptionList">
                                {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderText(item)}</li>)}
                            </ul>
                        );
                    default:
                        return (
                            <p key={index} className="descriptionParagraph">
                                {block.lines.map((line, lineIndex) => (
                                    <Fragment key={lineIndex}>
                                        {lineIndex > 0 && <br/>}
                                        {renderText(line)}
                                    </Fragment>
                                ))}
                            </p>
                        );
                }
            })}
        </>
    );
}

export default ElementDescription;