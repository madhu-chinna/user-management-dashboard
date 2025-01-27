import React from "react";
import "./index.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Modal;



// import React from "react";
// import "./index.css";

// function Modal({ children, onClose }) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="modal-close-button" onClick={onClose}>
//           ✖
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Modal;
