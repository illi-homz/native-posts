import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'


const navigatorOptions = screen => {
	return {
		initialRouteName: screen,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR,
			},
			headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
		}
	}
}

const PostNavigator = createStackNavigator(
	{
		Main: MainScreen,
		Post: {
			screen: PostScreen,
			navigationOptions: {}
		}
	},
	navigatorOptions('Main')
)

const BookedNavigator = createStackNavigator(
	{
		Booked: BookedScreen,
		Post: PostScreen
	},
	navigatorOptions('Booked')
)


const bottomTabsConfig = {
	Post: {
		screen: PostNavigator,
		navigationOptions: {
			tabBarLabel: 'Все',
			tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} />
		}
	},
	Booked: {
		screen: BookedNavigator,
		navigationOptions: {
			tabBarLabel: 'Избранное',
			tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} />
		}
	}
}

const BottomNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(bottomTabsConfig, {
			activeTintColor: '#fff',
			shifting: true,
			barStyle: {
				backgroundColor: THEME.MAIN_COLOR
			}
		})
		: createBottomTabNavigator(bottomTabsConfig, {
			tabBarOptions: {
				activeTintColor: THEME.MAIN_COLOR
			}
		})

const AboutNavigator = createStackNavigator(
	{
		About: AboutScreen
	},
	navigatorOptions('About')
)

const CreateNavigator = createStackNavigator(
	{
		Create: CreateScreen
	},
	navigatorOptions('Create')
)


const MainNavigator = createDrawerNavigator({
	PostTabs: {
		screen: BottomNavigator,
		navigationOptions: {
			drawerLabel: 'Главная',
			drawerIcon: ({tintColor}) => <Ionicons name='ios-star' size={25} color={tintColor} />
		}
	},
	About: {
		screen: AboutNavigator,
		navigationOptions: {
			drawerLabel: 'О приложении',
			drawerIcon: ({tintColor}) => <Ionicons name='ios-star' size={25} color={tintColor} />
		}
	},
	Create: {
		screen: CreateNavigator,
		navigationOptions: {
			drawerLabel: 'Создать пост',
			drawerIcon: ({tintColor}) => <Ionicons name='ios-star' size={25} color={tintColor} />
		}
	},
}, {
	contentOptions: {
		activeTintColor: THEME.MAIN_COLOR,
	},
})

export const AppNavigation = createAppContainer(MainNavigator)
