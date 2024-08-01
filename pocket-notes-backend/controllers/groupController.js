const Group = require('../models/Group');
const Note = require('../models/Note');

exports.createGroup = async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    // Remove the notes associated with the group
    await Note.deleteMany({ groupId: group._id });
    // Remove the group itself
    await group.remove();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
