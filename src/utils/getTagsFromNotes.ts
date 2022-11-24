import { NoteType } from '../App';

export const getTagsFromNotes = (tasks: NoteType[]) => {
  const tagsInArray: string[] = [];
  const result = {};

  tasks.forEach(({ note }) => {
    if (!note.includes('#')) return;

    let tag = '';
    let flag = false;

    const taskInArray = note.split('');
    taskInArray.forEach((letter) => {
      if (letter === '#') {
        flag = true;
      } else if (letter === ' ') {
        flag = false;

        if (tag) tagsInArray.push(tag);

        tag = '';
      }

      if (!flag) {
        return;
      }

      tag += letter;
    });

    tagsInArray.push(tag);
  });

  tagsInArray.forEach((tag) => {
    // @ts-ignore: Unreachable code error
    if (!result[tag]) {
      // @ts-ignore: Unreachable code error
      return (result[tag] = 1);
    }

    // @ts-ignore: Unreachable code error
    result[tag] += 1;
  });

  return result;
};
