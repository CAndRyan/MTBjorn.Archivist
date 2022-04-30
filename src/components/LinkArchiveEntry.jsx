import styles from './styles/LinkArchiveEntry';

const saveData = async (archiveEntry) => {
	// TODO: connect to firestorm
};

const getCurrentTimestamp = () => new Date().toUTCString();

const getLinkArchiveEntryFromFormData = (formData, creationTimestamp) => {
	const archiveEntry = {
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

const getOnFormSubmitHandler = (creationTimestamp = null) => async (event) => {
	const { target } = event;
	const formData = new FormData(target);
	const archiveEntry = getLinkArchiveEntryFromFormData(formData, creationTimestamp ?? getCurrentTimestamp());

	try {
		await saveData(archiveEntry);
		target.reset();
		// TODO: display success message
	} catch (error) {
		console.error(error);
		// TODO: display error message
	}

	event.preventDefault();
	return false;
};

const LinkArchiveEntry = ({ id, url, title, labels, description, creationTimestamp, lastUpdatedTimestamp }) => {
	const isNewArchiveEntry = !url && !title && !labels && !description;
	const lastUpdatedElement = lastUpdatedTimestamp ? <span>{`Last Updated: ${lastUpdatedTimestamp}`}</span> : undefined;

	return (
		<form className={styles.linkForm} onSubmit={getOnFormSubmitHandler(creationTimestamp)} autocomplete="off">
			{lastUpdatedElement}
			<table>
				<tbody>
					<tr>
						<td>URL</td>
						<td className={styles.inputColumn}><input type="url" name="url" initialValue={url} required placeholder="e.g. https://mtbjorn.net" /></td>
					</tr>
					<tr>
						<td>Title</td>
						<td className={styles.inputColumn}><input type="text" name="title" initialValue={title} required /></td>
					</tr>
					<tr>
						<td><label title="A comma-separated list">Labels</label></td>
						<td className={styles.inputColumn}><input type="text" name="labels" initialValue={labels} required placeholder="e.g. programming, politics" /></td>
					</tr>
					<tr>
						<td><label title="https://commonmark.org/">Description</label></td>
						<td className={styles.inputColumn}><textarea name="description" initialValue={description} placeholder="HINT: try CommonMark markdown" /></td>
					</tr>
				</tbody>
			</table>

			<div className={styles.buttonRow}>
				<button type="submit">{isNewArchiveEntry ? 'Save' : 'Update'}</button>
			</div>
		</form>
	);
};

export default LinkArchiveEntry;
