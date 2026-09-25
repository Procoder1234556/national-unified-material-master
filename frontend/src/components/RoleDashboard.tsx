import React from "react";
import { NummDashboard } from "./dashboard/NummDashboard";

interface RoleDashboardProps {
  activeRole: any;
  onSelectRole: (role: any) => void;
  onNavigate: (tabId: any) => void;
  onSearchQuery: (q: any) => void;
  onInspectONMC: (onmcCode: string) => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  activeRole,
  onSelectRole,
  onNavigate,
  onSearchQuery,
  onInspectONMC,
}) => {
  return (
    <NummDashboard
      activeRole={activeRole}
      onSelectRole={onSelectRole}
      onNavigateView={(view, q) => {
        if (q) onSearchQuery(q);
        onNavigate(view);
      }}
      onShowAudit={(msg) => console.log("CVC Audit:", msg)}
      onInspectONMC={onInspectONMC}
    />
  );
};
