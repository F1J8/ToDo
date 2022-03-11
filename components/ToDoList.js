import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import ToDo from './ToDo';

export default function ToDoList({ todosData }) {
	return (
		<FlatList
			data={todosData}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <ToDo {...item} />}
		/>
	);
}
