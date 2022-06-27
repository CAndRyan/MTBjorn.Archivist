import { DelayedComponent } from '@mtbjorn/hypotenuse/ui';
import { readDataRecordList, readDataRecord } from '@mtbjorn/firestorm';
import LinkArchiveEntry from "./LinkArchiveEntry";

const linkArchiveDbPath = 'links';

const getLinkArchiveData = async () => {
    const linkArchiveObj = await readDataRecordList(linkArchiveDbPath);
    if (!linkArchiveObj)
        return [];

    return Object.values(linkArchiveObj);
};

const generateChildren = async () => {
    const linkArchiveData = await getLinkArchiveData();
    const currentTime = new Date().toUTCString();

    return ( // TODO: use a JSX fragment, but first update the renderer to accomodate it
        <div>
            <h3>Data (as of: {currentTime})</h3>
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

const LinkArchiveList = () => <DelayedComponent generateChildren={generateChildren} />;

export default LinkArchiveList;
