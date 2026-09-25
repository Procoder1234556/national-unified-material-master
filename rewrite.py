app_shell_content = """import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Layers, FileCheck2, Search, Truck, TrendingDown, UploadCloud, ShieldCheck,
  Cpu, Keyboard, Bell, CheckCircle2, Menu, ChevronLeft, ChevronRight,
  ExternalLink, ShieldAlert, Building2, Plus, Home, Share2, Puzzle, Link,
  Globe, MoreHorizontal, Book, Rocket, HelpCircle, Settings
} from "lucide-react";

export type NavTabId =
  | "overview"
  | "steward"
  | "search"
  | "surplus"
  | "demand"
  | "ingest"
  | "security"
  | "system";

export type UserRole =
  "STEWARD" | "PROCUREMENT_OFFICER" | "PLANT_ENGINEER" | "AUDITOR";

interface AppShellProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenCommandPalette: () => void;
  onOpenKeyboardHelp: () => void;
  onBackToLanding?: () => void;
  children: React.ReactNode;
  stewardPendingCount?: number;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onSelectTab,
  activeRole,
  onSelectRole,
  onOpenCommandPalette,
  onOpenKeyboardHelp,
  onBackToLanding,
  children,
  stewardPendingCount = 84,
}) => {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "steward", label: "Steward Queue" },
    { id: "search", label: "Search Before Buy" },
    { id: "surplus", label: "Surplus" },
    { id: "demand", label: "Pooled Demand" },
    { id: "ingest", label: "Ingestion" },
    { id: "security", label: "Security Vault" },
    { id: "system", label: "Architecture" },
  ];

  const leftIcons = [Home, Share2, Puzzle, Link, Globe, MoreHorizontal, Book, Rocket, HelpCircle];

  return (
    <div style={{
      backgroundColor: '#F5F5F5',
      minHeight: '100vh',
      fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      <div style={{
        display: 'flex',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        flex: 1,
        padding: '12px'
      }}>
        {/* Left Sidebar */}
        <div style={{
          width: '80px',
          backgroundColor: '#111315',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          gap: '24px'
        }}>
          {/* Logo/Plus */}
          <div
            onClick={onBackToLanding}
            style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', marginBottom: '20px', cursor: 'pointer'
            }}
          >
            <Plus size={20} />
          </div>
          {/* Icons */}
          {leftIcons.map((Icon, i) => (
            <div key={i} style={{
              color: i === 0 ? 'white' : '#6B7280',
              backgroundColor: i === 0 ? '#2A2D32' : 'transparent',
              padding: '10px', borderRadius: '12px', cursor: 'pointer'
            }}>
              <Icon size={20} />
            </div>
          ))}
          <div style={{ flex: 1 }} />
          {/* Avatar */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E94344',
            display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 600, fontSize: '14px'
          }}>
            {activeRole.substring(0, 2)}
          </div>
        </div>

        {/* Main Area */}
        <div style={{ flex: 1, padding: '32px 40px', display: 'flex', gap: '40px', overflowY: 'auto' }}>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '100%' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h1 style={{ fontSize: '42px', fontWeight: 500, margin: 0, lineHeight: 1.1, color: '#111315', letterSpacing: '-0.03em' }}>
                National <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px dashed #CCC', verticalAlign: 'middle', margin: '0 8px' }}><Settings size={16} /></span> Unified Material <br />
                Master <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E8FC84', verticalAlign: 'middle', margin: '0 8px' }}>✨</span> (NUMM)
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div onClick={onOpenKeyboardHelp} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F4F5F7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} title="Keyboard Shortcuts">
                  <Keyboard size={20} />
                </div>
                <div onClick={onOpenCommandPalette} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#F4F5F7', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} title="Command Palette (Ctrl+K)">
                  <Search size={20} />
                </div>
                <select
                  value={activeRole}
                  onChange={(e) => onSelectRole(e.target.value as UserRole)}
                  style={{ backgroundColor: '#111315', color: 'white', border: 'none', borderRadius: '100px', padding: '16px 24px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', appearance: 'none', outline: 'none' }}
                >
                  <option value="STEWARD">Steward</option>
                  <option value="PROCUREMENT_OFFICER">Procurement</option>
                  <option value="PLANT_ENGINEER">Engineer</option>
                  <option value="AUDITOR">Auditor</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }} className="hide-scrollbar">
              {navItems.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id as NavTabId)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '100px',
                    backgroundColor: activeTab === tab.id ? '#111315' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#6B7280',
                    fontWeight: 500,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label} {tab.id === 'steward' && <span style={{marginLeft: '6px', opacity: 0.8}}>({stewardPendingCount})</span>}
                </div>
              ))}
            </div>

            {/* Children rendered below tabs */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
"""

role_dashboard_content = """import React from "react";
import {
  Settings2, ArrowLeftRight, ArrowUpRight, MessageSquare, GraduationCap, BarChart2, CheckCircle2, AlertTriangle, FileCheck2
} from "lucide-react";

export const RoleDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '40px', width: '100%' }}>
      {/* Center Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* 3 Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {/* Operations Card */}
          <div style={{ backgroundColor: '#F4F5F7', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111315', fontWeight: 500, fontSize: '15px' }}>
                <CheckCircle2 size={18} /> Active ONMC Items
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', position: 'relative' }}>
              <span style={{ fontSize: '48px', fontWeight: 500, lineHeight: 1 }}>104k</span>
              <span style={{ color: '#6B7280', fontSize: '14px', paddingBottom: '6px' }}>/ Total</span>
              <div style={{ position: 'absolute', top: '-10px', right: 0, backgroundColor: '#E8FC84', padding: '4px 8px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                98% <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #111315' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: 'auto' }}>
              {Array(6).fill(0).map((_, i) => <div key={`solid-${i}`} style={{ width: '16px', height: '32px', borderRadius: '100px', backgroundColor: '#111315' }} />)}
              {Array(4).fill(0).map((_, i) => <div key={`dot-${i}`} style={{ width: '16px', height: '32px', borderRadius: '100px', border: '1.5px dashed #D1D5DB' }} />)}
            </div>
          </div>

          {/* Data Transfer Card */}
          <div style={{ backgroundColor: '#E8FC84', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111315', fontWeight: 500, fontSize: '15px' }}>
                <ArrowLeftRight size={18} /> Surplus Value (Cr)
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', position: 'relative' }}>
              <span style={{ fontSize: '48px', fontWeight: 500, lineHeight: 1 }}>₹412</span>
              <span style={{ color: '#6B7280', fontSize: '14px', paddingBottom: '6px' }}>/ 850 Cr</span>
              <div style={{ position: 'absolute', top: '-10px', right: 0, backgroundColor: 'white', padding: '4px 8px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                48% <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #111315' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: 'auto' }}>
              {Array(4).fill(0).map((_, i) => <div key={`solid-${i}`} style={{ width: '16px', height: '32px', borderRadius: '100px', backgroundColor: '#111315' }} />)}
              {Array(3).fill(0).map((_, i) => <div key={`solid-yellow-${i}`} style={{ width: '16px', height: '32px', borderRadius: '100px', backgroundColor: '#D4EB76' }} />)}
              {Array(3).fill(0).map((_, i) => <div key={`dot-${i}`} style={{ width: '16px', height: '32px', borderRadius: '100px', border: '1.5px dashed #A3B1A6' }} />)}
            </div>
          </div>

          {/* Promo Card */}
          <div style={{ backgroundColor: '#111315', borderRadius: '24px', padding: '24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 500, margin: 0, maxWidth: '140px', zIndex: 2, lineHeight: 1.3 }}>
              CVC Audit <ArrowUpRight size={18} style={{ display: 'inline', verticalAlign: 'middle', color: '#A3B1A6' }} /><br /> Full Compliance Achieved
            </h3>
            <button style={{ backgroundColor: 'white', color: '#111315', border: 'none', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 500, width: 'fit-content', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '16px' }}>
              View Report <span>▷</span>
            </button>
            <div style={{ position: 'absolute', right: '-30px', top: '10px', height: '100%', width: '150px', opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={140} color="#E8FC84" />
            </div>
          </div>
        </div>

        {/* Statistics Area */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 600 }}>
                <BarChart2 size={24} /> Stewardship Flow
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#111315', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111315' }}/> Approvals</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E8FC84' }}/> Ingestions</span>
              </div>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #E5E7EB', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Q4 2026 v
            </div>
          </div>

          {/* Chart */}
          <div style={{ position: 'relative', height: '240px', display: 'flex' }}>
            {/* Y-axis */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '12px', paddingRight: '24px', fontWeight: 500 }}>
              {['1.0k', '0.9k', '0.8k', '0.7k', '0.6k', '0.5k', '0.4k', '0.3k', '0.2k', '0.1k'].map(v => <span key={v}>{v}</span>)}
            </div>
            {/* Grid */}
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {Array(10).fill(0).map((_, i) => <div key={i} style={{ borderBottom: '1px solid #F3F4F6', width: '100%', height: '0' }} />)}
              </div>
              {/* Bars */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '0 20px', paddingBottom: '8px' }}>

                {/* Bar 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '180px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                    <div style={{ width: '100%', height: '45%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 1</span>
                </div>

                {/* Bar 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '120px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                    <div style={{ width: '100%', height: '55%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 2</span>
                </div>

                {/* Bar 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '150px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                    <div style={{ width: '100%', height: '35%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 3</span>
                </div>

                {/* Bar 4 (Dotted) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '180px', borderRadius: '100px', border: '2px dashed #D1D5DB', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 4</span>
                </div>

                {/* Bar 5 (Active) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-35px', top: '30%', backgroundColor: '#E8FC84', padding: '4px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>32%</div>
                    <div style={{ position: 'absolute', right: '-40px', top: '-10px', backgroundColor: '#111315', color: 'white', padding: '4px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>87%</div>
                    <div style={{ width: '32px', height: '190px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                      <div style={{ width: '100%', height: '60%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#111315', fontWeight: 600 }}>Week 5</span>
                </div>

                {/* Bar 6 (Dotted) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '180px', borderRadius: '100px', border: '2px dashed #D1D5DB', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 6</span>
                </div>

                {/* Bar 7 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '130px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                    <div style={{ width: '100%', height: '50%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 7</span>
                </div>

                {/* Bar 8 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '110px', borderRadius: '100px', backgroundColor: '#111315', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px' }}>
                    <div style={{ width: '100%', height: '40%', backgroundColor: '#E8FC84', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#111315' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Week 8</span>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column (Sidebar) */}
      <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Cards */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, backgroundColor: '#F4F5F7', borderRadius: '24px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ShieldAlert size={20} color="#111315" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111315', textAlign: 'center' }}>CVC Audit<br/>Rules</span>
          </div>
          <div style={{ flex: 1, backgroundColor: '#F4F5F7', borderRadius: '24px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FileCheck2 size={20} color="#111315" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111315', textAlign: 'center' }}>ASME<br/>B16.5</span>
          </div>
        </div>

        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>

          {[
            { icon: '?', title: 'Help Center', sub: 'Explore our detailed documentatio...' },
            { icon: 'users', title: 'ONMC Directory', sub: 'Find the perfect partner to suppor...' },
            { icon: 'align-left', title: 'Guidelines', sub: 'Access popular guides & stories ab...' },
            { icon: 'bar-chart', title: 'Use Cases', sub: 'Get inspired by all the ways you ca...' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '20px', borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F4F5F7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', fontWeight: 600, color: '#111315' }}>
                  {item.icon === '?' ? '?' :
                   item.icon === 'users' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> :
                   item.icon === 'align-left' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg> :
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  }
                </div>
                <ArrowUpRight size={18} color="#9CA3AF" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#111315', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.4, fontWeight: 500 }}>{item.sub}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
"""

with open("frontend/src/components/AppShell.tsx", "w", encoding="utf-8") as f:
    f.write(app_shell_content)

with open("frontend/src/components/RoleDashboard.tsx", "w", encoding="utf-8") as f:
    f.write(role_dashboard_content)

print("Rewrite complete!")
