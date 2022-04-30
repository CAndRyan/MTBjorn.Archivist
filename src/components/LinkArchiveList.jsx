import { v4 as uuidv4 } from 'uuid';
import { DelayedComponent } from '@mtbjorn/hypotenuse/ui';
import LinkArchiveEntry from "./LinkArchiveEntry";

const getLinkArchiveData = async () => {
    // TODO: connect to firestorm
    return [];
};

const generateChildren = async () => {
    const linkArchiveData = await getLinkArchiveData();

    return ( // TODO: use a JSX fragment, but first update the renderer to accomodate it
        <div>
            <span>TeStInG</span>
            {linkArchiveData.map(({ id, url, title, labels, description, creationTimestamp, lastUpdatedTimestamp }) => (
                <LinkArchiveEntry
                    id={id}
                    url={url}
                    title={title}
                    labels={labels.join(", ")}
                    description={description}
                    creationTimestamp={creationTimestamp}
                    lastUpdatedTimestamp={lastUpdatedTimestamp}
                />
            ))}
        </div>
    );
};

const LinkArchiveList = () => {
    const currentTime = new Date().toUTCString();
    const listSectionId = uuidv4();

	return (
		<DelayedComponent id={listSectionId} generateChildren={generateChildren}>
            <h3>Data (as of: {currentTime})</h3>
        </DelayedComponent>
	);
};

export default LinkArchiveList;
