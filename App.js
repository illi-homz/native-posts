import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { bootstrap } from './src/bootstrap';
import { AppNavigation } from './src/navigation/Navigation';

export default function App() {
	const [isReady, setIsReady] = useState(false)

	if (!isReady) {
		return <AppLoading
			startAsync={bootstrap}
			onFinish={() => setIsReady(true)}
			onError={console.log}
		/>
	}

	return (
		<AppNavigation />
	);
}
	