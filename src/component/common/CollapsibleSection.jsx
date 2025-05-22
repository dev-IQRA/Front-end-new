import React, { useState } from "react";

const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="collapsible-section">
      <button
        className="collapsible-header"
        onClick={() => setOpen((prev) => !prev)}
        style={{ fontWeight: "bold", fontSize: "1.2em", marginBottom: "8px" }}
      >
        <span className={`arrow ${open ? "open" : ""}`}>&#9660;</span> {title}
      </button>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;