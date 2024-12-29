import React, { useState, useEffect } from 'react';
import Share from './Share';
import Edit from './Edit';

interface TaskType {
    title: string;
    about: string;
    isFavorite: boolean;
}

interface TaskProps {
    index: number;
    task: TaskType;
    deleteTasks: (index: number) => void;
    editTask: (index: number, updatedTask: TaskType) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
    markAsFavorite: (index: number) => void; 
}

const Task: React.FC<TaskProps> = ({ task, index, deleteTasks, editTask, handleDragStart, markAsFavorite }) => {
    const [isEditMenuVisible, setEditMenuVisible] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState<string>(task?.title || ''); 
    const [editedAbout, setEditedAbout] = useState<string>(task?.about || ''); 

    useEffect(() => {
        setEditedTitle(task?.title || ''); 
        setEditedAbout(task?.about || '');
    }, [task]);

    const toggleEditMenu = () => {
        setEditMenuVisible(prevVisible => !prevVisible);
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteTasks(index);
    };

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowEdit(true);
    };

    const save = () => {
        const updatedTask: TaskType = {
            title: editedTitle,
            about: editedAbout,
            isFavorite: task.isFavorite
        };
        editTask(index, updatedTask); 
        setShowEdit(false);
    };

    const cancel = () => {
        setShowEdit(false); 
    };

    const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        markAsFavorite(index); 
    };

    return (
        <div 
            className={`task-element ${task.isFavorite ? 'favorite' : ''}`}
            onClick={toggleEditMenu} 
            draggable={!task.isFavorite} 
            onDragStart={(e) => handleDragStart(e, index)} 
            data-index={index}
        >
            <div className="task-container">
                <div className="task-container-text">
                    <h3>{task?.title || 'Untitled Task'}</h3>
                    <p>{task?.about || 'No details provided.'}</p>
                </div>
                <div className='buttons'>
                    <button className="delete-button" onClick={handleDeleteClick}>x</button>
                    <button className='save-button' onClick={handleFavoriteClick}>
                        <img src={task.isFavorite ? './src/icons/whiteHeart.png' : './src/icons/Heart.png'} alt="Favorite" />
                    </button>
                </div>
            </div>

            {isEditMenuVisible && (
                <div className="edit-menu" style={{ display: 'flex' }}>
                    <div className="block-buttons">
                        <button className="button-share" onClick={Share}>
                            <img src="./src/icons/Share.svg" alt="Share" />
                        </button>
                        <button className="button-i">i</button>
                        <button className="button-edit" onClick={handleEditClick}>
                            <img src="./src/icons/edit.svg" alt="Edit" />
                        </button>
                    </div>
                </div>
            )}

            {showEdit && (
                <Edit 
                    title={editedTitle} 
                    about={editedAbout} 
                    setTitle={setEditedTitle} 
                    setAbout={setEditedAbout} 
                    save={save} 
                    cancel={cancel}
                />
            )}
        </div>
    );
};

export default Task;