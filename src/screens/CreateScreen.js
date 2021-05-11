import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Button,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { THEME } from "../theme";
import { addPost } from '../store/actions/postActions'

export const CreateScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const [text, setText] = useState('')

	const img = "https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg"
	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			img: img,
			text: text,
			booked: false
		}
		console.log(post);
		dispatch(addPost(post))
		navigation.navigate('Main')
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Создание поста</Text>
					<TextInput
						style={styles.textarea}
						placeholder="Введите такст поста"
						value={text}
						onChangeText={setText}
						multiline
					/>
					<Image
						style={styles.img}
						source={{ uri: img }}
					/>
					<Button
						title="Создать пост"
						color={THEME.MAIN_COLOR}
						onPress={saveHandler}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

CreateScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: "Создание поста",
	headerLeft: () => (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title="Toggle driver"
				iconName="ios-menu"
				onPress={() => navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	),
});

const styles = StyleSheet.create({
	wrapper: {
		padding: 10,
	},
	title: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "open-regular",
		marginVertical: 10,
	},
	textarea: {
		padding: 10,
		marginBottom: 10,
	},
	img: {
		width: "100%",
		height: 200,
		marginBottom: 10,
	},
});
