import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../AddNote/AddNote.module.scss';
import style from './AllNotes.module.scss';
import { NoteType } from '../../App';

type NoteProps = {
  value: NoteType;
  removeNote: (id: number) => void;
  editNote: (text: string, id: number) => void;
};

const Note: React.FC<NoteProps> = ({ value, removeNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(value.note);
  const characterLimit = 200;

  const handleChange = (event: {
    target: { value: string | React.SetStateAction<string> };
  }) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSave = (id: number) => {
    if (noteText.trim().length > 0) {
      editNote(noteText, id);
      setIsEditing(false);
    }
  };

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove this note?')) {
      setIsEditing(true);
      removeNote(id);
    }
  };

  return !isEditing ? (
    <div className={style.note}>
      {value.note}
      <div className={style.buttons}>
        <IconButton color="primary">
          <EditIcon onClick={onClickEdit} />
        </IconButton>
        <IconButton color="secondary">
          <DeleteIcon onClick={() => onClickRemove(value.id)} />
        </IconButton>
      </div>
    </div>
  ) : (
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
        <button className={styles.save} onClick={() => handleSave(value.id)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Note;
