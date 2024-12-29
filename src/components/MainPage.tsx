import React, { useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import DeleteTask from './deleteTask.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask, reorderTasks } from './redux/taskSlice';
import { RootState } from './redux/store';

interface TaskType {
    id: number;
    title: string;
    about: string;
    isFavorite: boolean;
}

function MainPage() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks) as TaskType[];
    const lastId = useSelector((state: RootState) => state.tasks.lastId);    const dispatch = useDispatch();
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleEditTask(index: number, updatedTask: TaskType) {
        dispatch(updateTask({ index, task: updatedTask }));
    }

    const markAsFavorite = (index: number) => {
        const currentTask = tasks[index];
        const updatedTask = {
            ...currentTask,
            isFavorite: !currentTask.isFavorite,
        };
    
        const favoriteCount = tasks.filter((task) => task.isFavorite).length;
    
        if (updatedTask.isFavorite && favoriteCount >= 3) {
            setErrorMessage("Вы не можете добавить больше 3 избранных задач.");
            return;
        } else {
            setErrorMessage(null);
        }
    
        const updatedTasks = [...tasks];
    
        updatedTasks.splice(index, 1);
        if (updatedTask.isFavorite) {
            updatedTasks.unshift(updatedTask); 
        } else {
            updatedTasks.push(updatedTask);
        }
    
        dispatch(reorderTasks(updatedTasks));
        dispatch(updateTask({task: updatedTask, index}));
    };
    
    function handleAddTask(title: string, about: string) {
        const newTask: TaskType = {
            id: lastId + 1, 
            title,
            about,
            isFavorite: false,
        };
        dispatch(addTask(newTask));
    }

    function confirmDeleteTask(index: number) {
        setDeleteIndex(index);
        setShowDelete(true);
    }

    function handleDeleteConfirmed() {
        if (deleteIndex !== null) {
            dispatch(removeTask(deleteIndex));
            setShowDelete(false);
            setDeleteIndex(null);
        }
    }

    function handleDeleteCancelled() {
        setShowDelete(false);
        setDeleteIndex(null);
    }

    function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
        e.dataTransfer.setData("text/plain", String(index));
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");

        const dropElement = e.target as HTMLElement;
        const closestElement = dropElement.closest('.task-element') as HTMLElement | null;

        const dropIndex = closestElement ? closestElement.dataset.index : undefined;

        if (dropIndex !== undefined && draggedIndex !== dropIndex) {
            const draggedTask = tasks[Number(draggedIndex)];
            if (!draggedTask.isFavorite) {
                dispatch(reorderTasks({ oldIndex: Number(draggedIndex), newIndex: Number(dropIndex) }));
            }
        }
    }

    function allowDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    return (
        <div className="page">
            <TaskInput onaddTask={handleAddTask} />
            {tasks.length > 0 ? (
                <div className="task-list" onDragOver={allowDrop} onDrop={handleDrop}>
                    {tasks.map((task, index) => (
                        <Task 
                            key={`${task.id}-${index}`} 
                            index={index}
                            task={task}
                            deleteTasks={confirmDeleteTask}
                            editTask={handleEditTask}
                            handleDragStart={handleDragStart} 
                            markAsFavorite={markAsFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className="main-container">
                    <div className="text-main-container">
                        <span>No tasks</span>
                    </div>
                </div>
            )}
            {showDelete && (
                <DeleteTask 
                    onConfirm={handleDeleteConfirmed}
                    onCancel={handleDeleteCancelled}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default MainPage;