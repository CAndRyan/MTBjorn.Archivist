import { v4 as uuidv4 } from 'uuid';
import { writeDataRecord } from '@mtbjorn/firestorm';
import styles from './styles/LinkArchiveEntry';

const linkArchiveDbPath = 'links';

const saveData = async (archiveEntry) => {
	await writeDataRecord(archiveEntry, linkArchiveDbPath); // NOTE: id is appended to DB path within method
};

const getCurrentTimestamp = () => new Date().toUTCString();

const getLinkArchiveEntryFromFormData = (formData, id, creationTimestamp) => {
	const archiveEntry = {
		id,
		creationTimestamp,
		lastUpdatedTimestamp: getCurrentTimestamp()
	};

	for (var [key, value] of formData.entries()) {
		if (key === 'labels')
			archiveEntry[key] = value.split(",").map((label) => label.trim());
		else
			archiveEntry[key] = value;
	}

	return archiveEntry;
};

const getOnFormSubmitHandler = (id = null, creationTimestamp = null) => async (event) => {
	const { target } = event;
	const formData = new FormData(target);
	const archiveEntry = getLinkArchiveEntryFromFormData(formData, id ?? uuidv4(), creationTimestamp ?? getCurrentTimestamp());
	const isNewEntry = !id || !creationTimestamp;

	event.preventDefault();

	try {
		await saveData(archiveEntry);

		if (isNewEntry)
			target.reset();

		// TODO: display success message
	} catch (error) {
		console.error(error);
		// TODO: display error message
	}
	
	return false;
};

// TODO: add yellow highlight and/or "are you sure" prompt when an input has changed or an update is being submitted
// TODO: reset value after updating an existing entry
const LinkArchiveEntry = ({ id, url, title, labels, description, creationTimestamp, lastUpdatedTimestamp }) => {
	const isNewArchiveEntry = !url && !title && !labels && !description;
	const lastUpdatedElement = lastUpdatedTimestamp ? <span>{`Last Updated: ${lastUpdatedTimestamp}`}</span> : undefined;
	const urlTitleText = !url ? '' : 'CTRL + click to open';
	const urlOnClick = (event) => {
		event.preventDefault();

		if (event.ctrlKey) {
			const currentUrlValue = event.target.nextSibling.children[0].value;
			window.open(currentUrlValue, '_blank');
		}
	};

	return (
		<form className={styles.linkForm} onSubmit={getOnFormSubmitHandler(id, creationTimestamp)} autocomplete="off">
			{lastUpdatedElement}
			<table>
				<tbody>
					<tr>
						<td title={urlTitleText} onClick={urlOnClick}>URL:</td>
						<td className={styles.inputColumn}><input type="url" name="url" value={url} required placeholder="e.g. https://mtbjorn.net" /></td>
					</tr>
					<tr>
						<td>Title</td>
						<td className={styles.inputColumn}><input type="text" name="title" value={title} required /></td>
					</tr>
					<tr>
						<td><label title="A comma-separated list">Labels:</label></td>
						<td className={styles.inputColumn}><input type="text" name="labels" value={labels} required placeholder="e.g. programming, politics" /></td>
					</tr>
					<tr>
						<td><label title="https://commonmark.org/">Description:</label></td>
						<td className={styles.inputColumn}>
							<textarea name="description" placeholder="HINT: try CommonMark markdown">
								{description}
							</textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div className={styles.buttonRow}>
				<button type="submit">{isNewArchiveEntry ? 'Save:' : 'Update:'}</button>
			</div>
		</form>
	);
};

export default LinkArchiveEntry;
