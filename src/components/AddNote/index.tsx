import React, { useState } from 'react';

import styles from './AddNote.module.scss';

type AddNoteProps = {
  handleAddNote: (text: string) => void;
};

const AddNote: React.FC<AddNoteProps> = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const characterLimit = 200;

  const handleChange = (event: {
    target: { value: string | React.SetStateAction<string> };
  }) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText('');
    }
  };

  return (
    <div className={styles.root}>
      <textarea
        rows={8}
        cols={10}
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className={styles.footer}>
        <small>{characterLimit - noteText.length} Remaining</small>
        <button className={styles.save} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
