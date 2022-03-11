import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import AddToDo from './Screens/AddToDo';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name="Add"
						component={AddToDo}
						options={{ presentation: 'modal' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
