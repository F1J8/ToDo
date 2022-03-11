import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './ToDoSlice';

export const store = configureStore({
	reducer: {
		todos: todosReducer
	}
});
