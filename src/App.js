import React, { Component } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
// import Modal from "./components/Modal";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      isFormOpen: false,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  handleAddUser = () => {
    this.setState({
      selectedUser: null,
      isFormOpen: true,
    });
  };

  handleEditUser = (user) => {
    this.setState({
      selectedUser: user,
      isFormOpen: true,
    });
  };

  handleDeleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" })
      .then(() => {
        this.setState((prevState) => ({
          users: prevState.users.filter((user) => user.id !== id),
        }));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  handleFormSubmit = (user) => {
    if (user.id) {
      // Editing existing user
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then(() => {
          this.setState((prevState) => ({
            users: prevState.users.map((u) => (u.id === user.id ? user : u)),
          }));
        })
        .catch((error) => console.error("Error editing user:", error));
    } else {
      // Add a new user
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((newUser) => {
          this.setState((prevState) => ({
            users: [...prevState.users, { ...newUser, id: Date.now() }], // Mock ID
          }));
        })
        .catch((error) => console.error("Error adding user:", error));
    }

    this.setState({ isFormOpen: false });
  };

  render() {
    const { users, selectedUser, isFormOpen } = this.state;

    return (
      <div className="App">
        <div className="heading-container">
          <h1 className="dashboard-heading">
            <span className="icon">👥</span> User Management Dashboard
          </h1>
          <p className="subheading">Effortlessly manage your users with ease and style</p>
        </div>
        <div className="button-container">
          <button className="add-user-button" onClick={this.handleAddUser}>
            ➕ Add New User
          </button>
        </div>
        <UserList
          users={users}
          onEdit={this.handleEditUser}
          onDelete={this.handleDeleteUser}
        />
        {isFormOpen && (
            <UserForm
              user={selectedUser}
              onClose={() => this.setState({ isFormOpen: false })}
              onSubmit={this.handleFormSubmit}
            />
        )}
      </div>
    );
  }
}

export default App;




// import React, { Component } from "react";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";
// import "./App.css";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       selectedUser: null,
//       isFormOpen: false,
//     };
//   }

//   componentDidMount() {
//     this.fetchUsers();
//   }

//   fetchUsers = () => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({ users: data });
//       })
//       .catch((error) => console.error("Error fetching users:", error));
//   };

//   handleAddUser = () => {
//     this.setState({
//       selectedUser: null,
//       isFormOpen: true,
//     });
//   };

//   handleEditUser = (user) => {
//     this.setState({
//       selectedUser: user,
//       isFormOpen: true,
//     });
//   };

//   handleDeleteUser = (id) => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" })
//       .then(() => {
//         this.setState((prevState) => ({
//           users: prevState.users.filter((user) => user.id !== id),
//         }));
//       })
//       .catch((error) => console.error("Error deleting user:", error));
//   };

//   handleFormSubmit = (user) => {
//     if (user.id) {
//       // Editing existing user
//       fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       })
//         .then(() => {
//           this.setState((prevState) => ({
//             users: prevState.users.map((u) => (u.id === user.id ? user : u)),
//           }));
//         })
//         .catch((error) => console.error("Error editing user:", error));
//     } else {
//       // Add a new user
//       fetch("https://jsonplaceholder.typicode.com/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       })
//         .then((response) => response.json())
//         .then((newUser) => {
//           this.setState((prevState) => ({
//             users: [...prevState.users, { ...newUser, id: Date.now() }], // Mock ID
//           }));
//         })
//         .catch((error) => console.error("Error adding user:", error));
//     }

//     this.setState({ isFormOpen: false });
//   };

//   render() {
//     const { users, selectedUser, isFormOpen } = this.state;

//     return (
//       <div className="App">
//         <div className="heading-container">
//           <h1 className="dashboard-heading">
//             <span className="icon">👥</span> User Management Dashboard
//           </h1>
//           <p className="subheading">Effortlessly manage your users with ease and style</p>
//         </div>
//         <div className="button-container">
//   <button className="add-user-button" onClick={this.handleAddUser}>
//     ➕ Add New User
//   </button>
// </div>
//         <UserList
//           users={users}
//           onEdit={this.handleEditUser}
//           onDelete={this.handleDeleteUser}
//         />
//         {isFormOpen && (
//           <UserForm
//             user={selectedUser}
//             onClose={() => this.setState({ isFormOpen: false })}
//             onSubmit={this.handleFormSubmit}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;




// import React, { useState, useEffect } from "react";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";
// import "./App.css";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   // Fetch users on mount
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const handleAddUser = () => {
//     setSelectedUser(null); // Clear any existing selection
//     setIsFormOpen(true);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setIsFormOpen(true);
//   };

//   const handleDeleteUser = (id) => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" })
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== id));
//       })
//       .catch((error) => console.error("Error deleting user:", error));
//   };

//   const handleFormSubmit = (user) => {
//     if (user.id) {
//       // Editing existing user
//       fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       })
//         .then(() => {
//           setUsers(users.map((u) => (u.id === user.id ? user : u)));
//         })
//         .catch((error) => console.error("Error editing user:", error));
//     } else {
//       // Add a new user
//       fetch("https://jsonplaceholder.typicode.com/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       })
//         .then((response) => response.json())
//         .then((newUser) => {
//           setUsers([...users, { ...newUser, id: Date.now() }]); // Mock ID
//         })
//         .catch((error) => console.error("Error adding user:", error));
//     }
//     setIsFormOpen(false);
//   };

//   return (
//     <div className="App">
//       <h1>User Management Dashboard</h1>
//       <button className="add-user-button" onClick={handleAddUser}>
//         Add User
//       </button>
//       <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
//       {isFormOpen && (
//         <UserForm
//           user={selectedUser}
//           onClose={() => setIsFormOpen(false)}
//           onSubmit={handleFormSubmit}
//         />
//       )}
//     </div>
//   );
// }

// export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
