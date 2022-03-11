import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import ToDoList from '../components/ToDoList';
import { todosData } from '../data/todos';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { hideCompletedReducer, setTodosReducer } from '../redux/ToDoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetTodos } from '../hooks/useGetTodos';

export default function Home() {
	useGetTodos();
	const navigation = useNavigation();
	const todos = useSelector((state) => state.todos.todos);
	const dispatch = useDispatch();
	const [isHidden, setIsHidden] = React.useState(false);
	// const [localData, setLocalData] = React.useState(
	// 	todosData.sort((a, b) => {
	// 		return a.isCompleted - b.isCompleted;
	// 	})
	// );
	const handleHideCompleted = async () => {
		if (isHidden) {
			setIsHidden(false);
			const todos = await AsyncStorage.getItem('@ToDos');
			if (todos !== null) {
				dispatch(setTodosReducer(JSON.parse(todos)));
			}
			// setLocalData(todosData.sort((a, b) => {
			//     return a.isCompleted - b.isCompleted;
			// }));
			return;
		}
		setIsHidden(!isHidden);
		dispatch(hideCompletedReducer());
		// setLocalData(localData.filter(item => item.isCompleted === false));
	};

	return (
		<View style={styles.container}>
			<View>
				<Image
					source={{
						uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cleaning-1593202999.jpg'
					}}
					style={styles.pic}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<Text style={styles.title}>Today</Text>
				<TouchableOpacity onPress={handleHideCompleted}>
					<Text style={{ color: '#3478f6' }}>
						{isHidden ? 'Show Completed' : 'Hide Completed'}
					</Text>
				</TouchableOpacity>
			</View>
			<ToDoList todosData={todos.filter((todo) => todo.isToday)} />
			<Text style={styles.title}>Tomorrow</Text>
			<ToDoList todosData={todos.filter((todo) => !todo.isToday)} />

			<StatusBar style="auto" />
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Add')}
			>
				<Text style={styles.plus}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
		paddingTop: 70
	},
	pic: {
		width: 42,
		height: 42,
		borderRadius: 21,
		alignSelf: 'flex-end'
	},
	title: {
		fontSize: 34,
		fontWeight: '700',
		marginTop: 10,
		marginBottom: 35
	},
	button: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: '#000',
		position: 'absolute',
		bottom: 50,
		right: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5
	},
	plus: {
		fontSize: 40,
		color: '#fff',
		position: 'absolute',
		top: -6,
		left: 9
	}
});
