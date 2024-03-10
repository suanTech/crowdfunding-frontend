import { useState } from "react";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import './Modal.css';

export default function CustomModal({ buttonText, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="button--action" onClick={() => setOpen(true)}>
        {buttonText}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{ modal: "customModal" }}
      >
        {children}
      </Modal>
    </>
  );
}
