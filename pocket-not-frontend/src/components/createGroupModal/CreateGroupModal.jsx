import { useState } from "react";
import styles from "./createGroupModal.module.css";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../redux/noteSlice";

export const CreateGroupModal = ({ openModal, setOpenModal }) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const dispatch = useDispatch();

  const [grpTitle, setGrpTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");

  const { groups } = useSelector((note) => note.note);

  const handleCreateGroup = async (e) => {
    setError("");
    e.preventDefault();
  
    if (!selectedColor) {
      setError("Please select a color!");
      return;
    }

    // Check for duplicate group names
    const grpNames = groups.map((group) => group.name.toLowerCase());
    if (grpNames.includes(grpTitle.toLowerCase())) {
      setError("This title already exists!");
      return;
    }
  
    try {
      await dispatch(createGroup({ name: grpTitle, color: selectedColor }));
      setOpenModal(false);
    } catch (error) {
      setError("Failed to create group. Please try again.");
    }
  };

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <p className={styles.createNewGroup}>Create New Group</p>
      <form className={styles.modal} onSubmit={handleCreateGroup}>
        <div className={styles.modal_input}>
          <label htmlFor="grpName">Group Name</label>
          <input
            type="text"
            id="grpName"
            placeholder="Enter Group Name"
            required
            name="grpName"
            autoComplete="off"
            autoFocus
            onChange={(e) => setGrpTitle(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className={styles.modal_input}>
            <label htmlFor="color">Choose Color</label>
            <div className={styles.colors}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={styles.modal_input_color}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid black" : "none",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.modal_btn_div}>
          <button type="submit" className={styles.modalBtn}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};
