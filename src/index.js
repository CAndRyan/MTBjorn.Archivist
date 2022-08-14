import { v4 as uuidv4 } from 'uuid';
import { setupActiveFirebaseApp, getActiveFirebaseApp } from '@mtbjorn/firestorm';
import { replaceElement, ReactiveComponent } from '@mtbjorn/hypotenuse/ui';
import { LoginComponent } from '@mtbjorn/reagent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
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
	
	const { isUserLoggedIn, addAuthStateListener, login, logout } = getActiveFirebaseApp();

	return {
		isUserLoggedIn,
		addAuthStateListener,
		login,
		logout
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

const getOnAfterLoginHandler = (archiveContainerId, logoutPlaceholderElementId, appContainerId, logout) => async ({ email }) => {
	const archiveContents = getArchiveContents();
	const containerElement = document.getElementById(archiveContainerId);

    await replaceElement(containerElement, archiveContents);

	const logoutPlaceholderElement = document.getElementById(logoutPlaceholderElementId);
	const onLogoutClick = async () => {
		const appContainerElement = document.getElementById(appContainerId);
		await logout();
		appContainerElement.replaceWith(<ArchiveApp />);
	};
	logoutPlaceholderElement.replaceWith(<div className={styles.logoutStrip}>
		<span><FontAwesomeIcon icon={faUser} /> {email}</span>
		<button onClick={onLogoutClick}>Logout</button>
	</div>);
};

const ArchiveApp = () => { // TODO: hide "Add" form by default
	const appContainerId = uuidv4();
	const archiveContainerId = uuidv4();
	const logoutPlaceholderElementId = uuidv4();
	const { isUserLoggedIn, addAuthStateListener, login, logout } = getFirestormAuthMethods();
	const onAfterLoginHandler = getOnAfterLoginHandler(archiveContainerId, logoutPlaceholderElementId, appContainerId, logout);

	const removeAuthStateListener = addAuthStateListener(async (authObj) => {
		const userIsLoggedIn = authObj && authObj.auth && authObj.auth.currentUser;
		if (!userIsLoggedIn) return;

		await onAfterLoginHandler(authObj.auth.currentUser);

		removeAuthStateListener();
	});

	const loginPostRender = async ({ email, password }) => {
		const user = await login(email, password);
		return user;
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
		<div id={appContainerId} className={styles.appContainer}>
			<h2 className={styles.appTitle}>Archivist</h2>

			<ReactiveComponent onBeforeElementRender={onBeforeElementRender} onAfterElementRender={onAfterElementRender}>
				<div id={logoutPlaceholderElementId}></div>
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
