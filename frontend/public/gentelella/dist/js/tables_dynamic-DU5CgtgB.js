import './main-v4-4eeF3Vvb.js';
var t = [
    ['IOCL', 'Mathura Refinery', 'primary'],
    ['ONGC', 'Hazira Gas Plant', 'red'],
    ['BPCL', 'Mumbai Refinery', 'yellow'],
    ['HPCL', 'Visakh Refinery', 'azure'],
    ['GAIL', 'Vijaipur Compressor', 'green'],
    ['OIL', 'Duliajan Base', 'primary'],
    ['NRL', 'Numaligarh Refinery', 'purple'],
    ['CPCL', 'Manali Refinery', 'blue'],
    ['MRPL', 'Mangalore Refinery', 'yellow']
  ],
  a = [
    {
      onmc: 'ONMC-MECH-VLV-BAL-002-150-A105-9B2F',
      raw: 'VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP',
      cat: 'Valves & Actuators',
      conf: '94.8%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-MECH-VLV-GAT-004-300-WCB-4A1C',
      raw: 'VALVE GATE 4IN 300LB FLG WCB ASTM A216',
      cat: 'Valves & Actuators',
      conf: '91.2%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-MECH-FLG-WNF-006-150-A105-8D3E',
      raw: 'FLG WN 6" 150# RF CS ASTM A105 SCH40 B16.5',
      cat: 'Piping & Flanges',
      conf: '96.5%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-MECH-GSK-SPW-002-150-SS316-2F9A',
      raw: 'GASKET SPWD 2IN 150LB SS316 GRAPHITE ASME B16.20',
      cat: 'Gaskets & Fasteners',
      conf: '88.4%',
      status: ['HITL Review', 'yellow']
    },
    {
      onmc: 'ONMC-MECH-PIP-SML-004-STD-A106-1C7B',
      raw: 'PIPE SMLS 4IN STD WT ASTM A106 GR B BEVEL',
      cat: 'Piping & Tubes',
      conf: '97.0%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-INST-TRN-PRS-001-420MA-SS316-3A9F',
      raw: 'XMITTER PRESS DIFF 4-20MA HART SMART LCD 316SS',
      cat: 'Instrumentation',
      conf: '84.6%',
      status: ['HITL Review', 'yellow']
    },
    {
      onmc: 'ONMC-MECH-VLV-GLB-003-600-A105-5E1D',
      raw: 'GLOBE VALVE 3INCH 600# FORGED CS A105 HANDWHEEL',
      cat: 'Valves & Actuators',
      conf: '89.1%',
      status: ['HITL Review', 'yellow']
    },
    {
      onmc: 'ONMC-ELEC-MOT-EXP-050-415V-CAST-8F2B',
      raw: 'MOTOR ELEC 50HP 415V 3PH 50HZ FLAMEPROOF EX D',
      cat: 'Rotating Machinery',
      conf: '93.7%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-MECH-FLG-BLD-008-300-A105-7A3C',
      raw: 'BLIND FLANGE 8" CLASS 300 RF CS ASTM A105',
      cat: 'Piping & Flanges',
      conf: '95.2%',
      status: ['Approved', 'green']
    },
    {
      onmc: 'ONMC-MECH-VLV-CHK-002-800-A105-3B8F',
      raw: 'CHECK VALVE 2" 800# SW FORGED STEEL A105 PISTON',
      cat: 'Valves & Actuators',
      conf: '73.4%',
      status: ['HITL Review', 'yellow']
    },
    {
      onmc: 'REJECT-PRESS-MISMATCH-4012',
      raw: 'BALL VALVE 2IN 300LB FLGD WCB BODY (POTENTIAL PRESSURE DISCREPANCY)',
      cat: 'Valves & Actuators',
      conf: '64.1%',
      status: ['Safety Blocked', 'red']
    },
    {
      onmc: 'REJECT-ALLOY-SOUR-5091',
      raw: 'PIPE 6IN SMLS SCH80 NACE MR0175 SOUR SERVICE',
      cat: 'Piping & Tubes',
      conf: '68.0%',
      status: ['Safety Blocked', 'red']
    }
  ],
  e = (function () {
    let t = 42;
    return () => ((t = (9301 * t + 49297) % 233280), t / 233280);
  })(),
  n = [];
for (let s = 0; 40 > s; s++) {
  const o = a[s % a.length],
    r = t[Math.floor(e() * t.length)],
    c = 10 + (s % 15);
  n.push(
    `<tr>\n    <td class="cell-mono" style="font-weight:700;font-size:11px">${o.onmc}</td>\n    <td>\n      <div class="cell-customer">\n        <div class="cell-avatar" style="background:var(--${r[2]})">${r[0].substring(0, 2)}</div>\n        <span class="cell-strong">${r[0]} · ${r[1]}</span>\n      </div>\n    </td>\n    <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">${o.raw}</td>\n    <td class="cell-strong" style="color:#0D533A">${o.conf}</td>\n    <td><span class="chip">${o.cat}</span></td>\n    <td><span class="status status-${o.status[1]}">${o.status[0]}</span></td>\n    <td style="font-size:12px;color:var(--text-muted)">Sep ${c}, 2026</td>\n  </tr>`
  );
}
document.getElementById('orders-tbody').innerHTML = n.join('');
