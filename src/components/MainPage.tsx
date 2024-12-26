import React, { useState } from 'react';
import TaskInput from './TaskInput';
import Task from './Task';
import DeleteTask from './deleteTask.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask, reorderTasks } from './redux/taskSlice';
import { RootState } from './redux/store'; 

interface TaskType {
    id: string;
    title: string;
    about: string;
}

function MainPage() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks) as TaskType[]; 
    const dispatch = useDispatch(); 
    
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null); 
    const [showDelete, setShowDelete] = useState<boolean>(false); 

    function handleEditTask(index: number, updatedTask: TaskType) {
        dispatch(updateTask({ index, task: updatedTask }));
    }

    function handleAddTask(title: string, about: string) {
        const newTask: TaskType = {
            id: Date.now().toString(),
            title,
            about,
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
            dispatch(reorderTasks({ oldIndex: Number(draggedIndex), newIndex: Number(dropIndex) }));
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
        </div>
    );
}

export default MainPage;