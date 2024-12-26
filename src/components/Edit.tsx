import React from 'react';

interface EditProps {
    title: string;
    about: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setAbout: React.Dispatch<React.SetStateAction<string>>;
    save: () => void;
    cancel: () => void;
}

const Edit: React.FC<EditProps> = ({ title, about, setTitle, setAbout, save, cancel }) => {
  return (
      <div className="edit-container">
        <div className="edit-window">
          <input className="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="edit-about" type="text" value={about} onChange={(e) => setAbout(e.target.value)}/>
          <div className="buttons">
            <button className="cancel" onClick={cancel}>Cancel</button>
            <button className="save" onClick={save}>Save</button>
          </div>
        </div> 
      </div>
  );
}

export default Edit;
