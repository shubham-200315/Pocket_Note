import { useState, useEffect } from "react";
import styles from "./updateNoteModal.module.css";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { updateNote } from "../../redux/noteSlice";

export const UpdateNoteModal = ({ isOpen, setIsOpen, note, groupId }) => {
  const [updatedContent, setUpdatedContent] = useState(note?.content || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      setUpdatedContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    if (!updatedContent.trim()) {
      return;
    }

    try {
      if (!note?._id) {
        throw new Error("Note ID is missing");
      }
      await dispatch(updateNote({
        noteId: note._id, // Ensure note._id is used
        content: updatedContent,
        groupId,
      }));
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <form className={styles.modal} onSubmit={handleUpdateNote}>
        <div className={styles.modal_input}>
          <label htmlFor="noteContent">Update Note</label>
          <textarea
            id="noteContent"
            placeholder="Update your note content"
            required
            name="noteContent"
            rows="6"
            autoComplete="off"
            autoFocus
            onChange={(e) => setUpdatedContent(e.target.value)}
            value={updatedContent}
          />
        </div>

        <div className={styles.modal_btn_div}>
          <button type="submit" className={styles.modalBtn}>
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};
