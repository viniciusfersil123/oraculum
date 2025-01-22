import React from "react";
import "./PageWrapper.css";

function PageWrapper({ title, children }) {
  return (
    <div className="page-wrapper">
      {typeof title === "string" ? (
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
      ) : (
        <h1>{title}</h1>
      )}
      {children}
    </div>
  );
}

export default PageWrapper;
