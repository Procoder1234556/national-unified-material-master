import React from "react";
import { rawTokens } from "../tokens.stylex";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  style?: React.CSSProperties;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  style,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: rawTokens.radiusSm,
            border: isActive ? `1px solid ${rawTokens.colorAction}` : `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: isActive ? rawTokens.colorAction : "#FFFFFF",
            color: isActive ? "#FFFFFF" : rawTokens.textSecondary,
            fontSize: "13px",
            fontWeight: isActive ? 600 : 500,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", ...style }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 12px",
          borderRadius: rawTokens.radiusSm,
          border: `1px solid ${rawTokens.borderSubtle}`,
          backgroundColor: currentPage === 1 ? rawTokens.surfaceSubtle : "#FFFFFF",
          color: currentPage === 1 ? rawTokens.textMuted : rawTokens.textPrimary,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "13px",
          fontWeight: 500,
          gap: "4px",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Prev
      </button>
      
      <div style={{ display: "flex", gap: "4px" }}>
        {renderPageNumbers()}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 12px",
          borderRadius: rawTokens.radiusSm,
          border: `1px solid ${rawTokens.borderSubtle}`,
          backgroundColor: currentPage === totalPages ? rawTokens.surfaceSubtle : "#FFFFFF",
          color: currentPage === totalPages ? rawTokens.textMuted : rawTokens.textPrimary,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "13px",
          fontWeight: 500,
          gap: "4px",
        }}
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
};
