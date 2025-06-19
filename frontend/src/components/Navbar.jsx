import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal'; // Correct the path based on your project structure
import Cart from '../screens/Cart'; // Assuming Cart is in screens
import { UseCart } from '../components/ContextReducer';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false); // State to open/close Modal
  const data = UseCart(); // Get cart items
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = async () => {
    await axios.post("https://foodapp-backend-65ev.onrender.com/api/logout", {}, { withCredentials: true });
    localStorage.removeItem('accessToken');
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top z-50">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link active" to="/myorders">My Orders</Link>
            </li> */}
          </ul>

          {/* Right side buttons */}
          <div className="ms-auto d-flex align-items-center">
            {!isLoggedIn && (
              <>
                <button className="btn bg-white text-success mx-2">
                  <Link className="nav-link active" to="/login">Login</Link>
                </button>
                <button className="btn bg-white text-success mx-2">
                  <Link className="nav-link active" to="/signup">Signup</Link>
                </button>
              </>
            )}

            {isLoggedIn && (
              <>
                <button
                  className="btn bg-white text-success mx-2"
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </button>
                <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Log Out
                </button>
                  <ul className="navbar-nav" style={{position: 'absolute', left:'17%'}}>
                    <li className="nav-item">
              <Link className="nav-link active" to="/myorders">My Orders</Link>
            </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Show Modal if cartView is true */}
      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </nav>
  );
}
