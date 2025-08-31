import React from "react";

const Footer = () => {
    return (
      <footer style={styles.footer}>
        E-Prescription 2025 &copy; Developed by Sourav Sundar Sen
      </footer>
    );
  };

  const styles = {
    footer: {
      backgroundColor: "#003366",
      color: "#ffffff",
      padding: "15px",
      fontSize: "20px",
      textAlign: "center"
    }
  };
  
  export default Footer;