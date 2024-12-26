import React from 'react';

interface DeleteTaskProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-container">
            <div className="delete-container-content">
                <span>Delete this task?</span>
                <div className="delete-buttons">
                    <button className="yes-button" onClick={onConfirm}>Yes</button>
                    <button className="no-button" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTask;