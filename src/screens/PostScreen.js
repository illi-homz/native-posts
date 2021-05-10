import React, { useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	ScrollView,
	Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { THEME } from "../theme";
import { toggleBooked, removePost } from "../store/actions/postActions";

export const PostScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const postId = navigation.getParam("postId");

	const post = useSelector((state) =>
		state.post.allPosts.find((el) => el.id === postId)
	);

	const booked = useSelector((state) =>
		state.post.bookedPosts.some((post) => post.id === postId)
	);

	const toggleHandler = useCallback(() => {
		dispatch(toggleBooked(postId));
	}, [dispatch, postId]);

	useEffect(() => {
		navigation.setParams({ booked });
	}, [booked]);

	useEffect(() => {
		navigation.setParams({ toggleHandler });
	}, [toggleHandler]);

	const removeHandler = () => {
		Alert.alert(
			"Удаление поста",
			"Вы точно уверны?",
			[
				{ text: "Отмена", style: "cancel" },
				{
					text: "Удалить",
					style: "destructive",
					onPress() {
						navigation.navigate('Main')
						dispatch(removePost(postId))
					},
				},
			],
			{
				cancelable: false,
			}
		);
	};

	if (!post) {
		return null
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: post.img }} />
			<View style={styles.textWrap}>
				<Text style={styles.title}>{post.text}</Text>
			</View>
			<Button
				title="Удалить"
				color={THEME.DANGER_COLOR}
				onPress={removeHandler}
			/>
		</ScrollView>
	);
};

PostScreen.navigationOptions = ({ navigation }) => {
	const date = navigation.getParam("date");
	const booked = navigation.getParam("booked");
	const toggleHandler = navigation.getParam("toggleHandler");
	const iconName = booked ? "ios-star" : "ios-star-outline";

	return {
		headerTitle: "Пост от " + new Date(date).toLocaleDateString(),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Take photo"
					iconName={iconName}
					onPress={toggleHandler}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 200,
	},
	textWrap: {
		padding: 10,
	},
	title: {
		fontFamily: "open-regular",
	},
});
