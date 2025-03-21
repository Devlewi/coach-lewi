import React from "react";
import { FaCubes } from "react-icons/fa";

// Typage des props
interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <h3
      style={{
        fontSize: "18px !important",
        fontWeight: "bold",
        marginTop: -20,
        marginBottom: 20,
        paddingBottom: 8,
        borderBottom: "4px solid #019ee2",
        display: "inline-block",
        color: "rgb(2, 16, 57)",
      }}
    >
      <FaCubes/> {title}
    </h3>
  );
};

export default SectionTitle;
