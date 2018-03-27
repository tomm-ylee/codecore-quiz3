import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  const { user, onSignOut = () => {} } = props;

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/auctions/new">New Auction Item</NavLink>
      <NavLink exact to="/auctions">Auction Items</NavLink>
      {
        user ? (
          <a key="2" href="/sign_out" onClick={onSignOut}>Sign Out</a>
        ) : (
          <NavLink exact to="/sign_in">Sign In</NavLink>
        )
      }
    </nav>
  )
}

export default NavBar;
