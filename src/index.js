import { v4 as uuidv4 } from 'uuid';
import { setupActiveFirebaseApp, getActiveFirebaseApp } from '@mtbjorn/firestorm';
import { replaceElement, ReactiveComponent } from '@mtbjorn/hypotenuse/ui';
import { LoginComponent } from '@mtbjorn/reagent';
import { archivistLinksFirebaseAppName, archivistLinksFirebaseConfig, firebaseDriverConfig } from './firebaseAppData';
import LinkArchiveEntry from "./components/LinkArchiveEntry";
import LinkArchiveList from './components/LinkArchiveList';
import styles from './styles/ArchiveApp';

const getFirestormAuthMethods = () => {
	setupActiveFirebaseApp({
		appName: archivistLinksFirebaseAppName,
		appConfig: archivistLinksFirebaseConfig,
		driverConfig: firebaseDriverConfig
	});
	
	const { isUserLoggedIn, addAuthStateListener, login } = getActiveFirebaseApp();

	return {
		isUserLoggedIn,
		addAuthStateListener,
		login
	};
};

const getArchiveContents = () => (
	<div>
		<LinkArchiveEntry />

		<br />

		<LinkArchiveList />
	</div>
);

// NOTE: the rootElement may not be attached to the dom & cannot search by id
const onPreRenderAfterLoginHandler = (rootElement) => {
	const archiveContents = getArchiveContents();
	const containerElement = rootElement.getElementsByClassName(styles.archiveContainer)[0];

    containerElement.replaceWith(archiveContents);
};

const getOnAfterLoginHandler = (archiveContainerId) => async () => {
	const archiveContents = getArchiveContents();
	const containerElement = document.getElementById(archiveContainerId);

    await replaceElement(containerElement, archiveContents);
};

const ArchiveApp = () => { // TODO: hide "Add" form by default
	const archiveContainerId = uuidv4();
	const onAfterLoginHandler = getOnAfterLoginHandler(archiveContainerId);
	const { isUserLoggedIn, addAuthStateListener, login } = getFirestormAuthMethods();

	const removeAuthStateListener = addAuthStateListener(async (authObj) => {
		const userIsLoggedIn = await isUserLoggedIn();
		console.log(authObj);
		if (!userIsLoggedIn) return;

		await onAfterLoginHandler();

		removeAuthStateListener();
	});

	const loginPostRender = async ({ email, password }) => {
		await login(email, password);
	};

	const onBeforeElementRender = async (element) => {
		const userIsLoggedIn = await isUserLoggedIn();
		if (!userIsLoggedIn) return;

		onPreRenderAfterLoginHandler(element);
	};
	
	const onAfterElementRender = async () => {
		removeAuthStateListener(); // TODO: consider if 'onAfterSuccess' should be removed & rely solely on the auth state handler...
	};

	return (
		<div className={styles.appContainer}>
			<h2 className={styles.appTitle}>Archivist</h2>

			<ReactiveComponent onBeforeElementRender={onBeforeElementRender} onAfterElementRender={onAfterElementRender}>
				<div id={archiveContainerId} className={styles.archiveContainer}>
					<LoginComponent onSubmit={loginPostRender} onAfterSuccess={onAfterLoginHandler} />
				</div>
			</ReactiveComponent>
		</div>
	);
}

export {
    ArchiveApp
}
