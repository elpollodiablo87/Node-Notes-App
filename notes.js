const chalk = require('chalk')
const fs = require('fs')

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note Added succecfully!'));

    }else {
        console.log(chalk.red.inverse('Note name already taken!'));

    }


}
const removeNote = (title) => {
    const notesBefore = loadNotes()
    const duplicateNotes = notesBefore.filter((note) => {
        return note.title === title
    })
    if (duplicateNotes.length !== 0) {
      const notesAfter = notesBefore.filter((note) => {
      return note.title !== title
    })
    saveNotes(notesAfter)
    console.log(chalk.bgGreen('Note removed succecfully!'));
  } else {
    console.log(chalk.bgRed('Note not found!'));
  }

}
const listNotes = () => {
  console.log(chalk.green('Your notes: '));
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
    console.log(chalk.green(`Title: ${chalk.blue(note.title)}`))
    console.log(`Body: ${note.body}`)
    } else {
        console.log(chalk.red('Note not found'));
        
    }
}
module.exports = {
    addNote, removeNote, listNotes, readNote
}
