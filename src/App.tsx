import { useState, useEffect } from 'react';

import AllNotes from './components/AllNotes';
import AddNote from './components/AddNote';
import useLocalStorage from './hooks/useLocalStorage';
import { getTagsFromNotes } from './utils/getTagsFromNotes';
import { notesKey, defaultNotes } from './assets/assets';

import './App.scss';
import { Button } from '@mui/material';

export type NoteType = {
  note: string;
  id: number;
};

function App() {
  const cNotes = defaultNotes.map((note) => ({ note, id: Math.random() }));

  const [selectedTag, setSelectedTag] = useState<string>('');
  const { value: notes, setValue: setNotes } = useLocalStorage<NoteType[]>(
    cNotes,
    notesKey,
  );

  const filteredNotes = notes.filter(({ note }) => note.includes(selectedTag));

  const onClickTag = (tag: string) => {
    console.log(tag);

    setSelectedTag(tag);
  };

  const onClickAll = () => {
    setSelectedTag('');
  };

  const addNote = (text: string) => {
    const newNote = text;

    const newNotes = [...notes, { note: newNote, id: Math.random() }];
    setNotes(newNotes);
  };

  const removeNote = (id: number) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const editNote = (text: string, id: number) => {
    const newNotes = notes.map((item, index) =>
      item.id === id ? { ...item, note: text } : item,
    );

    setNotes(newNotes);
  };

  // const getTagsName = (tags: {}) => {
  //   const result: string[] = [];

  //   Object.entries(tags).forEach(([key]) => result.push(key));

  //   return result;
  // };

  return (
    <div className="content">
      <div className="content-top">
        <div className="top-buttons">
          <Button variant="contained" onClick={onClickAll}>
            All notes
          </Button>
          {/* <Button variant="outlined">Создать заметку</Button> */}
        </div>
        <div className="filtration">
          {Object.entries(getTagsFromNotes(notes)).map(
            ([key, value], index) => (
              <div key={index} onClick={() => onClickTag(key)} className="tags">
                <>
                  {key} ({value})
                </>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="content-main">
        <AllNotes
          items={filteredNotes}
          removeNote={removeNote}
          editNote={editNote}
        />
        <AddNote handleAddNote={addNote} />
      </div>
    </div>
  );
}

export default App;
