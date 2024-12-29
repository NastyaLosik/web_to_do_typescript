import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: number; 
    title: string;
    about: string;
}

interface TaskState {
    tasks: Task[] ;
    lastId: number;
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks')!) || [],
    lastId: JSON.parse(localStorage.getItem('lastId')!) || 0
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => { 
            const newTask = {
                ...action.payload,
                id: state.lastId + 1, 
            };
            state.tasks.push(newTask);
            state.lastId = newTask.id;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
            localStorage.setItem('lastId', JSON.stringify(state.lastId));
        },
        removeTask: (state, action: PayloadAction<number>) => { 
            state.tasks.splice(action.payload, 1);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask: (state, action: PayloadAction<{ index: number; task: Task }>) => { 
            const { index, task } = action.payload;
            if (state.tasks[index]) {
                state.tasks[index] = task;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        reorderTasks: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => { 
            const { oldIndex, newIndex } = action.payload;
            const [movedTask] = state.tasks.splice(oldIndex, 1);
            state.tasks.splice(newIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const { addTask, removeTask, updateTask, reorderTasks } = taskSlice.actions;

export default taskSlice.reducer;