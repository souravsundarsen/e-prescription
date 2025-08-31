import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <strong> E-Prescription </strong>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#003366",
    color: "#ffffff",
    padding: "15px",
    fontSize: "30px",
    textAlign: "center"
  }
};

export default Header;