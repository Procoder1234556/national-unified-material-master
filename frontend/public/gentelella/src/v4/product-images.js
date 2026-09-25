// Inline SVG product illustrations for National Unified Material Master (NUMM) MRO equipment.
// Replaces retail apparel illustrations with Oil & Gas industrial equipment schematics.

const BG = {
  valve_ball:
    '<defs><linearGradient id="bg-vb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ecfdf5"/><stop offset="1" stop-color="#d1fae5"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-vb)"/>',
  valve_gate:
    '<defs><linearGradient id="bg-vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eff6ff"/><stop offset="1" stop-color="#dbeafe"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-vg)"/>',
  flange_wnf:
    '<defs><linearGradient id="bg-fw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#ffedd5"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-fw)"/>',
  gasket_spw:
    '<defs><linearGradient id="bg-gs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fefce8"/><stop offset="1" stop-color="#fef08a"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-gs)"/>',
  pipe_sml:
    '<defs><linearGradient id="bg-ps" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0fdfa"/><stop offset="1" stop-color="#ccfbf1"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-ps)"/>',
  transmitter:
    '<defs><linearGradient id="bg-tr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#faf5ff"/><stop offset="1" stop-color="#e9d5ff"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-tr)"/>',
  valve_glb:
    '<defs><linearGradient id="bg-vl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ecfeff"/><stop offset="1" stop-color="#cffafe"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-vl)"/>',
  motor_exp:
    '<defs><linearGradient id="bg-me" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef2f2"/><stop offset="1" stop-color="#fee2e2"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-me)"/>',
  flange_bld:
    '<defs><linearGradient id="bg-fb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient></defs><rect width="280" height="210" fill="url(#bg-fb)"/>'
};

function dots(color) {
  return `<g fill="${color}" opacity="0.2">
    <circle cx="30" cy="40" r="2.5"/>
    <circle cx="50" cy="170" r="3"/>
    <circle cx="240" cy="50" r="2.5"/>
    <circle cx="250" cy="165" r="3"/>
    <circle cx="220" cy="30" r="2"/>
    <circle cx="25" cy="120" r="2"/>
  </g>`;
}

const SVG_OPEN =
  '<svg viewBox="0 0 280 210" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">';
const SVG_CLOSE = '</svg>';

// 1. Ball Valve
const valve_ball =
  SVG_OPEN +
  BG.valve_ball +
  dots('#059669') +
  `
  <g>
    <!-- Left Flange -->
    <rect x="55" y="80" width="16" height="70" rx="3" fill="#34d399" stroke="#065f46" stroke-width="2"/>
    <circle cx="63" cy="95" r="3" fill="#065f46"/>
    <circle cx="63" cy="135" r="3" fill="#065f46"/>
    <!-- Right Flange -->
    <rect x="209" y="80" width="16" height="70" rx="3" fill="#34d399" stroke="#065f46" stroke-width="2"/>
    <circle cx="217" cy="95" r="3" fill="#065f46"/>
    <circle cx="217" cy="135" r="3" fill="#065f46"/>
    <!-- Body -->
    <rect x="71" y="90" width="138" height="50" rx="6" fill="#a7f3d0" stroke="#065f46" stroke-width="2"/>
    <!-- Ball Center Chamber -->
    <circle cx="140" cy="115" r="32" fill="#fff" stroke="#065f46" stroke-width="2"/>
    <circle cx="140" cy="115" r="18" fill="#10b981" opacity="0.6"/>
    <!-- Bonnet & Stem -->
    <rect x="132" y="55" width="16" height="36" fill="#34d399" stroke="#065f46" stroke-width="2"/>
    <!-- Lever Handle -->
    <rect x="125" y="45" width="30" height="12" rx="3" fill="#065f46"/>
    <rect x="140" y="47" width="80" height="8" rx="4" fill="#047857"/>
    <circle cx="218" cy="51" r="6" fill="#e11d48"/>
    <!-- Spec Label -->
    <text x="140" y="185" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#065f46">API 6D · 2" CL150 RF A105</text>
  </g>` +
  SVG_CLOSE;

// 2. Gate Valve
const valve_gate =
  SVG_OPEN +
  BG.valve_gate +
  dots('#2563eb') +
  `
  <g>
    <!-- Left Flange -->
    <rect x="60" y="105" width="14" height="65" rx="2" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>
    <!-- Right Flange -->
    <rect x="206" y="105" width="14" height="65" rx="2" fill="#93c5fd" stroke="#1e40af" stroke-width="2"/>
    <!-- Body -->
    <path d="M74 115 L120 115 L120 85 L160 85 L160 115 L206 115 L206 160 L74 160 Z" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
    <!-- Rising Stem -->
    <line x1="140" y1="35" x2="140" y2="85" stroke="#1e40af" stroke-width="4" stroke-linecap="round"/>
    <!-- Handwheel -->
    <ellipse cx="140" cy="35" rx="45" ry="10" fill="none" stroke="#dc2626" stroke-width="5"/>
    <line x1="95" y1="35" x2="185" y2="35" stroke="#dc2626" stroke-width="3"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#1e40af">ASME B16.34 · 4" CL300 WCB</text>
  </g>` +
  SVG_CLOSE;

// 3. Weld Neck Flange
const flange_wnf =
  SVG_OPEN +
  BG.flange_wnf +
  dots('#ea580c') +
  `
  <g>
    <!-- Flange Outer Ring -->
    <ellipse cx="140" cy="115" rx="65" ry="50" fill="#fed7aa" stroke="#c2410c" stroke-width="3"/>
    <!-- Raised Face -->
    <ellipse cx="140" cy="115" rx="45" ry="34" fill="#ffedd5" stroke="#c2410c" stroke-width="2"/>
    <!-- Bore -->
    <ellipse cx="140" cy="115" rx="26" ry="20" fill="#c2410c"/>
    <!-- Bolt Holes -->
    <circle cx="90" cy="115" r="4.5" fill="#7c2d12"/>
    <circle cx="190" cy="115" r="4.5" fill="#7c2d12"/>
    <circle cx="140" cy="75" r="4.5" fill="#7c2d12"/>
    <circle cx="140" cy="155" r="4.5" fill="#7c2d12"/>
    <circle cx="105" cy="88" r="4" fill="#7c2d12"/>
    <circle cx="175" cy="88" r="4" fill="#7c2d12"/>
    <circle cx="105" cy="142" r="4" fill="#7c2d12"/>
    <circle cx="175" cy="142" r="4" fill="#7c2d12"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#c2410c">ASME B16.5 · 6" CL150 WNRF A105</text>
  </g>` +
  SVG_CLOSE;

// 4. Spiral Wound Gasket
const gasket_spw =
  SVG_OPEN +
  BG.gasket_spw +
  dots('#ca8a04') +
  `
  <g>
    <!-- Outer Centering Ring (Carbon Steel) -->
    <circle cx="140" cy="105" r="68" fill="none" stroke="#854d0e" stroke-width="12"/>
    <!-- Sealing Element (SS316 + Graphite) -->
    <circle cx="140" cy="105" r="54" fill="none" stroke="#22c55e" stroke-width="8" stroke-dasharray="2,2"/>
    <!-- Inner Ring -->
    <circle cx="140" cy="105" r="44" fill="none" stroke="#854d0e" stroke-width="5"/>
    <circle cx="140" cy="105" r="39" fill="#fef9c3"/>
    <!-- Color Stripe Green for SS316 -->
    <rect x="137" y="37" width="6" height="12" fill="#15803d"/>
    <!-- Spec Label -->
    <text x="140" y="190" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#854d0e">ASME B16.20 · 2" CL150 SS316L / GRAPHITE</text>
  </g>` +
  SVG_CLOSE;

// 5. Seamless Pipe
const pipe_sml =
  SVG_OPEN +
  BG.pipe_sml +
  dots('#0d9488') +
  `
  <g>
    <!-- Pipe Cylinder -->
    <rect x="50" y="85" width="180" height="50" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>
    <!-- Left Opening -->
    <ellipse cx="50" cy="110" rx="14" ry="25" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
    <ellipse cx="50" cy="110" rx="9" ry="18" fill="#042f2e"/>
    <!-- Right Opening -->
    <ellipse cx="230" cy="110" rx="14" ry="25" fill="#5eead4" stroke="#0f766e" stroke-width="2"/>
    <!-- Heat Number Stencil -->
    <text x="140" y="114" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" fill="#0f766e">ASTM A106 Gr.B 4" SCH 40 SMLS HT#4921</text>
    <!-- Spec Label -->
    <text x="140" y="185" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#0f766e">ASME B36.10 · 4" SCH 40 A106-B SMLS</text>
  </g>` +
  SVG_CLOSE;

// 6. Smart Pressure Transmitter
const transmitter =
  SVG_OPEN +
  BG.transmitter +
  dots('#9333ea') +
  `
  <g>
    <!-- Housing -->
    <circle cx="140" cy="85" r="38" fill="#e9d5ff" stroke="#6b21a8" stroke-width="2"/>
    <!-- LCD Display -->
    <circle cx="140" cy="85" r="26" fill="#1e1b4b"/>
    <text x="140" y="88" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#22c55e">14.82 BAR</text>
    <!-- Stem / Neck -->
    <rect x="133" y="123" width="14" height="24" fill="#a855f7" stroke="#6b21a8" stroke-width="2"/>
    <!-- Process Connection Flange -->
    <rect x="110" y="147" width="60" height="12" rx="2" fill="#6b21a8"/>
    <!-- Conduit Connection -->
    <rect x="175" y="80" width="18" height="10" fill="#6b21a8"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#6b21a8">HART 4-20mA · SS316 Diaphragm Ex d</text>
  </g>` +
  SVG_CLOSE;

// 7. Globe Valve
const valve_glb =
  SVG_OPEN +
  BG.valve_glb +
  dots('#0891b2') +
  `
  <g>
    <rect x="58" y="105" width="14" height="60" rx="2" fill="#a5f3fc" stroke="#155e75" stroke-width="2"/>
    <rect x="208" y="105" width="14" height="60" rx="2" fill="#a5f3fc" stroke="#155e75" stroke-width="2"/>
    <!-- Spherical Body -->
    <circle cx="140" cy="135" r="32" fill="#cffafe" stroke="#155e75" stroke-width="2"/>
    <!-- Bonnet & Handwheel -->
    <rect x="133" y="65" width="14" height="40" fill="#67e8f9" stroke="#155e75" stroke-width="2"/>
    <ellipse cx="140" cy="50" rx="40" ry="9" fill="none" stroke="#e11d48" stroke-width="4"/>
    <line x1="100" y1="50" x2="180" y2="50" stroke="#e11d48" stroke-width="2.5"/>
    <!-- Flow Arrow -->
    <path d="M125 135 L150 135 M144 130 L150 135 L144 140" stroke="#0891b2" stroke-width="2"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#155e75">ASME B16.34 · 3" CL600 RF A105</text>
  </g>` +
  SVG_CLOSE;

// 8. Explosion-Proof Motor
const motor_exp =
  SVG_OPEN +
  BG.motor_exp +
  dots('#dc2626') +
  `
  <g>
    <!-- Stator Body with Cooling Fins -->
    <rect x="75" y="70" width="120" height="75" rx="6" fill="#fecaca" stroke="#991b1b" stroke-width="2"/>
    <line x1="85" y1="70" x2="85" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="100" y1="70" x2="100" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="115" y1="70" x2="115" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="130" y1="70" x2="130" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="145" y1="70" x2="145" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="160" y1="70" x2="160" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <line x1="175" y1="70" x2="175" y2="145" stroke="#991b1b" stroke-width="1.5"/>
    <!-- Drive Shaft -->
    <rect x="195" y="100" width="30" height="15" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
    <!-- Terminal Box (Flameproof) -->
    <rect x="110" y="48" width="40" height="22" rx="3" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
    <!-- Foot Mount -->
    <rect x="65" y="145" width="140" height="12" rx="2" fill="#991b1b"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#991b1b">50 HP · 415V Ex d IIC T4 Flameproof</text>
  </g>` +
  SVG_CLOSE;

// 9. Blind Flange
const flange_bld =
  SVG_OPEN +
  BG.flange_bld +
  dots('#475569') +
  `
  <g>
    <!-- Solid Disk -->
    <ellipse cx="140" cy="110" rx="65" ry="48" fill="#cbd5e1" stroke="#334155" stroke-width="3"/>
    <!-- Raised Face (Solid Center, no bore) -->
    <ellipse cx="140" cy="110" rx="44" ry="32" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
    <text x="140" y="114" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="#475569">BLIND · SOLID</text>
    <!-- Bolt Holes -->
    <circle cx="88" cy="110" r="4.5" fill="#1e293b"/>
    <circle cx="192" cy="110" r="4.5" fill="#1e293b"/>
    <circle cx="140" cy="72" r="4.5" fill="#1e293b"/>
    <circle cx="140" cy="148" r="4.5" fill="#1e293b"/>
    <circle cx="104" cy="85" r="4" fill="#1e293b"/>
    <circle cx="176" cy="85" r="4" fill="#1e293b"/>
    <circle cx="104" cy="135" r="4" fill="#1e293b"/>
    <circle cx="176" cy="135" r="4" fill="#1e293b"/>
    <!-- Spec Label -->
    <text x="140" y="188" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="#334155">ASME B16.5 · 8" CL300 BLRF A105</text>
  </g>` +
  SVG_CLOSE;

export const PRODUCT_IMAGES = {
  // Industrial Keys
  valve_ball,
  valve_gate,
  flange_wnf,
  gasket_spw,
  pipe_sml,
  transmitter,
  valve_glb,
  motor_exp,
  flange_bld,
  // Legacy alias fallbacks so template doesn't crash
  hoodie: valve_ball,
  shirt: valve_gate,
  sneakers: flange_wnf,
  bag: gasket_spw,
  earbuds: pipe_sml,
  pourover: transmitter,
  mat: valve_glb,
  keyboard: motor_exp,
  baselayer: flange_bld
};
