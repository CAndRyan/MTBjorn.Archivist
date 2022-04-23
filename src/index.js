import ArchiveLinkForm from "./components/ArchiveLinkForm";
import styles from './styles/ArchiveApp';

const ArchiveApp = () => {
	
	return (
		<div className={styles.appContainer}>
			<h2 className={styles.appTitle}>Archivist</h2>

            <ArchiveLinkForm />
		</div>
	);
}

export {
    ArchiveApp
}
