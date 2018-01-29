import React from 'react';

const Header = () => {
  var d = new Date();
  return (
    <div className="header glass">
      {d.toDateString()}
    </div>
  );
};

export default Header;