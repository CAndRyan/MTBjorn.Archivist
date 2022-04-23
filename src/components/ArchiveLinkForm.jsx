import styles from './styles/ArchiveLinkForm';

const saveLinkData = () => {
	//
};

const onFormSubmit = (event) => {
	debugger;
};

const ArchiveLinkForm = () => {
	
	return (
		<form className={styles.linkForm} onSubmit={onFormSubmit}>
			<table>
				<tbody>
					<tr>
						<td>URL</td>
						<td><input type="text" name="url" /></td>
					</tr>
					<tr>
						<td><label title="A comma-separated list">Labels</label></td>
						<td><input type="text" name="labels" /></td>
					</tr>
					<tr>
						<td>Description</td>
						<td><input type="text" name="description" /></td>
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
