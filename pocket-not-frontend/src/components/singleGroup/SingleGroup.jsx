import styles from "./singleGroup.module.css";
import sendIcon from "../../assets/icons/send-icon.svg";
import sendColorIcon from "../../assets/icons/send-colorful-icon.svg";
import backIcon from "../../assets/icons/back-arrow.svg";
import { SingleNote } from "../singleNote/SingleNote";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentActiveGroup,
  createNote,
  deleteGroup,
} from "../../redux/noteSlice";
import { useState } from "react";

export const SingleGroup = () => {
  const { currentActiveGroup, groups } = useSelector((note) => note.note);
  const dispatch = useDispatch();

  const newGrp = groups.find((grp) => grp._id === currentActiveGroup);

  const [content, setContent] = useState("");
  if (!newGrp) {
    return <div>Group not found</div>;
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      await dispatch(createNote({
        content,
        groupId: newGrp._id
      }));
      setContent(""); // Clear the content after creating the note
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await dispatch(deleteGroup(newGrp._id));
      dispatch(changeCurrentActiveGroup(null)); // Reset currentActiveGroup after deletion
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.groupName}>
        <div className={styles.groupContent}>
          <div
            className={styles.backArrow}
            onClick={() => {
              dispatch(changeCurrentActiveGroup(null));
            }}
          >
            <img src={backIcon} alt="" />
          </div>
          <div
            className={styles.img_circle}
            style={{ backgroundColor: newGrp.groupColor }}
          >
            <p>{newGrp.groupShortName}</p>
          </div>
  
          <h4>{newGrp.groupName}</h4>
        </div>
        <span
          onClick={handleDeleteGroup}
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
  
      <div className={styles.allNotes}>
        {/* Handle the case where newGrp.notes might be undefined */}
        {newGrp.notes?.length === 0 && <p>No Notes to display!</p>}
  
        {newGrp.notes?.map((note) => (
          <SingleNote key={note._id} note={note} />
        ))}
      </div>
  
      <form className={styles.message_container} onSubmit={handleCreateNote}>
        <textarea
          className={styles.message}
          rows="6"
          placeholder="Enter your text here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreateNote(e);
            }
          }}
        />
  
        {content ? (
          <button type="submit" className={styles.sendIcon}>
            <img src={sendColorIcon} alt="send icon" />
          </button>
        ) : (
          <span className={styles.sendIcon}>
            <img src={sendIcon} alt="send icon" />
          </span>
        )}
      </form>
    </div>
  );
  
};
