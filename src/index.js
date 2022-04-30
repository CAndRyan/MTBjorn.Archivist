import LinkArchiveEntry from "./components/LinkArchiveEntry";
import LinkArchiveList from './components/LinkArchiveList';
import styles from './styles/ArchiveApp';

const ArchiveApp = () => { // TODO: hide "Add" form by default
	
	return (
		<div className={styles.appContainer}>
			<h2 className={styles.appTitle}>Archivist</h2>

            <LinkArchiveEntry />

            <br />

            <LinkArchiveList />
		</div>
	);
}

// TODO: figure out how to define & execute render event handlers when JSX components are neseted & rendered as a single element to the DOM
// TOOD: how can an event handler be passed from JSX to elementTemplateEngine to the renderer in Hypotenuse?
// TODO: must they convert from properties on the JSX component to props of the component, or a wrapper around it?

export {
    ArchiveApp
}
