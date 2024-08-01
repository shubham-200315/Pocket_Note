const Note = require('../models/Note');
const Group = require('../models/Group');

exports.createNote = async (req, res) => {
  try {
    const { content, groupId } = req.body;
    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    // Create and save the note
    const note = new Note({ content, groupId });
    await note.save();
    // Add note ID to the group
    group.notes.push(note._id);
    await group.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    note.content = req.body.content;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if the group exists
    const group = await Group.findById(note.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Remove note ID from the group
    group.notes.pull(note._id);
    await group.save();

    // Delete the note
    await Note.findByIdAndDelete(noteId);

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(400).json({ error: error.message });
  }
};
