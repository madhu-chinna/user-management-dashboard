import React, { useState } from "react";
import "./index.css";

function UserForm({ user, onClose, onSubmit }) {
  const [formData, setFormData] = useState(
    user || { name: "", email: "", company: { name: "" } }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setFormData({ ...formData, company: { name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2 className="form-heading">{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <label>
            <span className="form-label">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter user's name"
            />
          </label>
          <label>
            <span className="form-label">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter user's email"
            />
          </label>
          <label>
            <span className="form-label">Department:</span>
            <input
              type="text"
              name="company"
              value={formData.company.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter department"
            />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;




// import React, { useState } from "react";
// import "./index.css";

// function UserForm({ user, onClose, onSubmit }) {
//   const [formData, setFormData] = useState(
//     user || { name: "", email: "", company: { name: "" } }
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "company") {
//       setFormData({ ...formData, company: { name: value } });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="user-form">
//       <h2>{user ? "Edit User" : "Add User"}</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Department:
//           <input
//             type="text"
//             name="company"
//             value={formData.company.name}
//             onChange={handleChange}
//           />
//         </label>
//         <div className="form-actions">
//           <button type="submit">Save</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UserForm;
