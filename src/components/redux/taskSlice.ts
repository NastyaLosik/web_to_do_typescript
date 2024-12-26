import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string; 
    title: string;
    about: string;
}

interface TaskState {
    tasks: Task[] ;
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks')!) || [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => { 
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
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