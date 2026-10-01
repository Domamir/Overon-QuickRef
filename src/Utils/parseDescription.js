const HEADING_PREFIX = '## ';
const LIST_ITEM_PREFIX = '- ';

// Splits a description into blocks:
//   "## Title"     -> { type: 'heading', text }
//   "- item"       -> { type: 'list', items }       (consecutive items form one list)
//   other lines    -> { type: 'paragraph', lines }  (an empty line ends the paragraph)
function parseDescription(text)
{
    const blocks = [];
    let currentBlock = null;

    text.split('\n').forEach(rawLine => {
        const line = rawLine.trim();

        if (line === '')
        {
            currentBlock = null;
            return;
        }

        if (line.startsWith(HEADING_PREFIX))
        {
            blocks.push({type: 'heading', text: line.slice(HEADING_PREFIX.length).trim()});
            currentBlock = null;
            return;
        }

        if (line.startsWith(LIST_ITEM_PREFIX))
        {
            if (currentBlock?.type !== 'list')
            {
                currentBlock = {type: 'list', items: []};
                blocks.push(currentBlock);
            }

            currentBlock.items.push(line.slice(LIST_ITEM_PREFIX.length).trim());
            return;
        }

        if (currentBlock?.type !== 'paragraph')
        {
            currentBlock = {type: 'paragraph', lines: []};
            blocks.push(currentBlock);
        }

        currentBlock.lines.push(line);
    });

    return blocks;
}

export default parseDescription;
