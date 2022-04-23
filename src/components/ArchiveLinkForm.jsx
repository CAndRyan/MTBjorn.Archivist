import styles from './styles/ArchiveLinkForm';

const saveData = async () => {
	// TODO: connect to firestorm
};

const onFormSubmit = async (event) => {
	const { target } = event;
	const formData = new FormData(target);

	for (var [key, value] of formData.entries())
		console.log(key, value);

	try {
		await saveData();
		target.reset();
		// TODO: display success message
	} catch (error) {
		console.error(error);
		// TODO: display error message
	}

	event.preventDefault();
	return false;
};

const ArchiveLinkForm = () => {
	
	return (
		<form className={styles.linkForm} onSubmit={onFormSubmit} autocomplete="off">
			<table>
				<tbody>
					<tr>
						<td>URL</td>
						<td className={styles.inputColumn}><input type="url" name="url" required placeholder="e.g. https://mtbjorn.net" /></td>
					</tr>
					<tr>
						<td>Title</td>
						<td className={styles.inputColumn}><input type="text" name="title" required /></td>
					</tr>
					<tr>
						<td><label title="A comma-separated list">Labels</label></td>
						<td className={styles.inputColumn}><input type="text" name="labels" required placeholder="e.g. programming, politics" /></td>
					</tr>
					<tr>
						<td><label title="https://commonmark.org/">Description</label></td>
						<td className={styles.inputColumn}><textarea name="description" placeholder="HINT: try CommonMark markdown" /></td>
					</tr>
				</tbody>
			</table>

			<div className={styles.buttonRow}>
				<button type="submit">Save</button>
			</div>
		</form>
	);
};

export default ArchiveLinkForm;
