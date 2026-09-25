// ponytail: Recent ingestion jobs card with MicroCharts velocity bars and Watermelon UI card styling.
// Upgrade path: add cancel/pause stream controls for running batch pipelines.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import { CheckCircle2, RotateCw, ArrowRight } from "lucide-react";
import { SparkBar } from "../MicroCharts";

export interface RecentIngestionJobsProps {
  onViewAll?: () => void;
}

export const RecentIngestionJobs: React.FC<RecentIngestionJobsProps> = ({
  onViewAll,
}) => {
  const jobs = [
    {
      id: "job-1",
      cpse: "IOCL",
      plant: "Mathura / Panipat / Paradip / Gujarat",
      records: "6 POC catalog lines",
      progress: 100.0,
      velocity: [1, 1, 1, 1, 1, 1],
      status: "Complete",
      time: "seed",
    },
    {
      id: "job-2",
      cpse: "ONGC",
      plant: "Hazira / Uran / Ankleshwar",
      records: "6 POC catalog lines",
      progress: 100.0,
      velocity: [1, 1, 1, 1, 1, 1],
      status: "Complete",
      time: "seed",
    },
    {
      id: "job-3",
      cpse: "BPCL",
      plant: "Mumbai / Kochi",
      records: "5 POC catalog lines",
      progress: 100.0,
      velocity: [1, 1, 1, 1, 1, 0],
      status: "Complete",
      time: "seed",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(226, 232, 240, 0.9)",
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.4)",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: rawTokens.fontSans,
            color: rawTokens.textPrimary,
          }}
        >
          Recent Ingestion Jobs
        </div>

        <button
          onClick={onViewAll}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            background: "none",
            border: "none",
            color: rawTokens.colorAction,
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "2px 4px",
          }}
        >
          <span>Jobs</span>
          <ArrowRight size={11} strokeWidth={2.4} />
        </button>
      </div>

      {/* Jobs list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {jobs.map((job) => {
          const isComplete = job.progress === 100;
          return (
            <div
              key={job.id}
              style={{
                backgroundColor: "#F8FAFC",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "8px",
                padding: "10px 12px",
                transition: "all 0.15s ease",
              }}
            >
              {/* Header row: CPSE • Plant + Status badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                  }}
                >
                  <strong>{job.cpse}</strong> • {job.plant}
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{ fontSize: "10px", color: rawTokens.textMuted }}
                  >
                    {job.time}
                  </span>
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: "3px",
                      backgroundColor: isComplete
                        ? "rgba(165, 215, 201, 0.4)"
                        : "rgba(233, 67, 68, 0.1)",
                      color: isComplete ? "#0F5132" : rawTokens.colorAction,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {isComplete ? (
                      <CheckCircle2 size={10} strokeWidth={2.4} />
                    ) : (
                      <RotateCw size={9} />
                    )}
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Subtitle: Records & Percent + MicroCharts velocity */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginBottom: "6px",
                }}
              >
                <span>{job.records}</span>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {/* MicroCharts SparkBar */}
                  <SparkBar
                    data={job.velocity}
                    width={48}
                    height={12}
                    barColor={isComplete ? rawTokens.colorVerified : "#CBD5E1"}
                    accentColor={isComplete ? "#0F5132" : rawTokens.colorAction}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {job.progress}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#E2E8F0",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${job.progress}%`,
                    height: "100%",
                    backgroundColor: isComplete
                      ? rawTokens.colorVerified
                      : rawTokens.colorAction,
                    borderRadius: "2px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
