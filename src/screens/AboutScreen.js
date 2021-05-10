import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'


export const AboutScreen = ({navigation}) => {
	return (
		<View style={styles.center}>
			<Text>AboutScreen</Text>
		</View>
	)
}

AboutScreen.navigationOptions = ({navigation}) => ({
	headerTitle: 'О приложении',
	headerLeft: () => (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
			<Item
				title="Toggle driver"
				iconName="ios-menu"
				onPress={() => navigation.toggleDrawer()} />
		</HeaderButtons>
	)
})

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
