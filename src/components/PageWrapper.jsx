// src/components/PageWrapper.jsx
import React from "react";
import "./PageWrapper.css";

function PageWrapper({ title, children }) {
  return (
    <div className="page-wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageWrapper;