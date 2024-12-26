import React, { useState } from 'react';

interface TaskInputProps {
    onaddTask: (title: string, about: string) => void; 
}

const TaskInput: React.FC<TaskInputProps> = ({ onaddTask }) => {
    const [title, setTitle] = useState<string>(''); 
    const [about, setAbout] = useState<string>('');

    function handleAddTask() {
        if (title && about) {
            onaddTask(title, about);
            setTitle('');
            setAbout('');
        } else {
            alert('Поля не должны быть пустыми.');
        }
    }

    return (
        <div className="task-input-container">
            <div className="input-container">
                <input 
                    className="title-input" 
                    placeholder="Title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    className="about-input" 
                    placeholder="About..." 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                />
            </div>
            <button className="add-button" onClick={handleAddTask}>+</button>
        </div>
    );
};

export default TaskInput;