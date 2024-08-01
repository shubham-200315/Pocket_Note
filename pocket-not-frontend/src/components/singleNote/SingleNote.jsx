import styles from "./singleNote.module.css";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../redux/noteSlice";
import { useState } from "react";
import { UpdateNoteModal } from "../updateNoteModal/UpdateNoteModal";

export const SingleNote = ({ note, groupId }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteNote = async () => {
    try {
      await dispatch(deleteNote({
        noteId: note._id, // Ensure the correct field name is used
        groupId,
      }));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleEditNote = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.note}>
      <p>{note.content}</p>
      <div className={styles.noteActions}>
        <span
          onClick={handleEditNote}
          className={styles.editIcon}
          title="Edit Note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-edit"
          >
            <path d="M11 4h-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L11.5 15.5l-4 1 1-4L18.5 2.5z" />
          </svg>
        </span>
        <span
          onClick={handleDeleteNote}
          className={styles.deleteIcon}
          title="Delete Note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </span>
      </div>
      <UpdateNoteModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        note={note}
        groupId={groupId}
      />
    </div>
  );
};
