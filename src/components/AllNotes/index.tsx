import React from 'react';
import { NoteType } from '../../App';

import Note from './Note';

type NoteProps = {
  items: NoteType[];
  removeNote: (id: number) => void;
  editNote: (text: string, id: number) => void;
};

const AllNotes: React.FC<NoteProps> = ({ items, removeNote, editNote }) => {
  return (
    <>
      {items.map((value) => (
        <Note
          key={value.id}
          value={value}
          removeNote={removeNote}
          editNote={editNote}
        />
      ))}
    </>
  );
};

export default AllNotes;
