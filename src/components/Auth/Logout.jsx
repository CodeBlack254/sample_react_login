import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSession } from 'react-session';

const Logout = () => {
//   const { clearSession } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clearSession();
    navigate('/login');
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;