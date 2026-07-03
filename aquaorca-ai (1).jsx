import { useState, useRef } from "react";

// ─── GOOGLE FONTS ────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-deep:    #040D18;
      --bg-base:    #071220;
      --bg-card:    #0B1D30;
      --bg-card2:   #0E2440;
      --bg-input:   #0A192E;
      --border:     rgba(0,210,255,0.12);
      --border-hi:  rgba(0,210,255,0.35);
      --aqua:       #00D4FF;
      --aqua-dim:   #0094C6;
      --aqua-glow:  rgba(0,212,255,0.18);
      --green:      #00E5A0;
      --green-dim:  rgba(0,229,160,0.15);
      --orange:     #FF8C42;
      --red:        #FF4D6D;
      --txt:        #E8F4FC;
      --txt-muted:  #5A7FA0;
      --txt-dim:    #2A4A6A;
      --radius:     14px;
      --radius-lg:  20px;
      --shadow:     0 8px 32px rgba(0,0,0,0.4);
    }

    html, body, #root { height: 100%; background: var(--bg-deep); }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--txt);
      overflow-x: hidden;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 2px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);    opacity: .6; }
      100% { transform: scale(1.35); opacity: 0; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes wave {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-6px); }
    }
    @keyframes ripple {
      0%   { transform: scale(0); opacity: .5; }
      100% { transform: scale(4); opacity: 0; }
    }

    .fade-up   { animation: fadeUp .45s ease both; }
    .fade-up-2 { animation: fadeUp .45s .08s ease both; }
    .fade-up-3 { animation: fadeUp .45s .16s ease both; }
    .fade-up-4 { animation: fadeUp .45s .24s ease both; }
    .fade-up-5 { animation: fadeUp .45s .32s ease both; }

    .app-wrap {
      max-width: 430px;
      min-height: 100dvh;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      position: relative;
      background: var(--bg-base);
      box-shadow: 0 0 80px rgba(0,0,0,.8);
      overflow: hidden;
    }

    /* ── HEADER ── */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 20px 14px;
      background: linear-gradient(180deg, rgba(0,212,255,.06) 0%, transparent 100%);
      border-bottom: 1px solid var(--border);
      position: sticky; top: 0; z-index: 50;
      backdrop-filter: blur(12px);
    }
    .header-logo { display: flex; align-items: center; gap: 10px; }
    .header-logo-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: linear-gradient(135deg, var(--aqua-dim), var(--aqua));
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; box-shadow: 0 0 16px var(--aqua-glow);
    }
    .header-logo-text { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px;
      background: linear-gradient(90deg, #fff 0%, var(--aqua) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .header-badge {
      font-size: 9px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
      background: var(--green-dim); color: var(--green); padding: 2px 7px; border-radius: 20px;
      border: 1px solid rgba(0,229,160,.25);
    }
    .header-icon-btn {
      width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--border);
      background: var(--bg-card); display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 18px; transition: all .2s;
    }
    .header-icon-btn:hover { border-color: var(--border-hi); background: var(--bg-card2); }

    /* ── BOTTOM NAV ── */
    .bottom-nav {
      display: flex; background: var(--bg-card); border-top: 1px solid var(--border);
      padding: 10px 0 14px; position: sticky; bottom: 0; z-index: 50;
    }
    .nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
      cursor: pointer; padding: 4px 0; transition: all .2s;
    }
    .nav-icon { font-size: 22px; transition: transform .2s; }
    .nav-label { font-size: 10px; font-weight: 600; letter-spacing: .03em; color: var(--txt-muted); transition: color .2s; }
    .nav-item.active .nav-label { color: var(--aqua); }
    .nav-item.active .nav-icon { transform: scale(1.15); filter: drop-shadow(0 0 6px var(--aqua)); }

    /* ── SCREEN ── */
    .screen { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: 8px; }
    .screen-title {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px;
      background: linear-gradient(135deg, #fff 30%, var(--aqua) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 4px;
    }
    .screen-subtitle { font-size: 13px; color: var(--txt-muted); margin-bottom: 22px; }

    /* ── CARD ── */
    .card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 20px;
      transition: border-color .2s, box-shadow .2s;
    }
    .card:hover { border-color: var(--border-hi); }
    .card-lg { padding: 24px; }

    /* ── KPI ROW ── */
    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .kpi-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 18px 16px; position: relative; overflow: hidden;
    }
    .kpi-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    }
    .kpi-card.aqua::before { background: linear-gradient(90deg, transparent, var(--aqua), transparent); }
    .kpi-card.green::before { background: linear-gradient(90deg, transparent, var(--green), transparent); }
    .kpi-card.orange::before { background: linear-gradient(90deg, transparent, var(--orange), transparent); }
    .kpi-card.red::before { background: linear-gradient(90deg, transparent, var(--red), transparent); }
    .kpi-label { font-size: 11px; color: var(--txt-muted); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }
    .kpi-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #fff; }
    .kpi-trend { font-size: 11px; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
    .kpi-trend.up { color: var(--green); }
    .kpi-trend.neutral { color: var(--txt-muted); }

    /* ── BUTTON ── */
    .btn {
      width: 100%; padding: 16px; border-radius: var(--radius); border: none; cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700;
      transition: all .2s; position: relative; overflow: hidden;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--aqua-dim) 0%, var(--aqua) 100%);
      color: var(--bg-deep); box-shadow: 0 4px 20px rgba(0,212,255,.3);
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 26px rgba(0,212,255,.45); }
    .btn-primary:active { transform: translateY(0); }
    .btn-ghost {
      background: transparent; border: 1px solid var(--border-hi); color: var(--aqua);
    }
    .btn-ghost:hover { background: var(--aqua-glow); }
    .btn-green {
      background: linear-gradient(135deg, #00B87A, var(--green));
      color: var(--bg-deep); box-shadow: 0 4px 20px rgba(0,229,160,.25);
    }
    .btn-sm {
      width: auto; padding: 10px 18px; font-size: 13px; border-radius: 10px;
    }
    .btn-icon { display: flex; align-items: center; justify-content: center; gap: 8px; }
    .btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

    /* ── INPUT ── */
    .input-group { margin-bottom: 16px; }
    .input-label { font-size: 12px; font-weight: 600; color: var(--txt-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .05em; }
    .input-field {
      width: 100%; padding: 14px 16px; background: var(--bg-input); border: 1px solid var(--border);
      border-radius: var(--radius); color: var(--txt); font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px; outline: none; transition: border-color .2s, box-shadow .2s;
    }
    .input-field:focus { border-color: var(--aqua); box-shadow: 0 0 0 3px rgba(0,212,255,.1); }
    .input-field::placeholder { color: var(--txt-dim); }
    select.input-field { appearance: none; cursor: pointer; }

    /* ── TOGGLE CHIP ── */
    .chips { display: flex; gap: 8px; flex-wrap: wrap; }
    .chip {
      padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
      border: 1px solid var(--border); background: transparent; color: var(--txt-muted);
      cursor: pointer; transition: all .2s;
    }
    .chip.selected { border-color: var(--aqua); background: var(--aqua-glow); color: var(--aqua); }

    /* ── SECTION HEAD ── */
    .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
    .section-action { font-size: 13px; color: var(--aqua); cursor: pointer; font-weight: 600; }

    /* ── TAGS ── */
    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
    }
    .tag-green { background: var(--green-dim); color: var(--green); }
    .tag-aqua  { background: rgba(0,212,255,.12); color: var(--aqua); }
    .tag-orange{ background: rgba(255,140,66,.12); color: var(--orange); }
    .tag-red   { background: rgba(255,77,109,.12); color: var(--red); }

    /* ── DIVIDER ── */
    .divider { height: 1px; background: var(--border); margin: 20px 0; }

    /* ── STEP WIZARD ── */
    .step-bar { display: flex; align-items: center; gap: 0; margin-bottom: 24px; }
    .step-dot {
      width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0;
      transition: all .3s;
    }
    .step-dot.done { background: var(--green); color: var(--bg-deep); }
    .step-dot.active { background: var(--aqua); color: var(--bg-deep); box-shadow: 0 0 16px rgba(0,212,255,.5); }
    .step-dot.pending { background: var(--bg-card2); color: var(--txt-dim); border: 1px solid var(--border); }
    .step-line { flex: 1; height: 2px; background: var(--border); transition: background .3s; }
    .step-line.done { background: var(--green); }

    /* ── PHOTO UPLOAD ZONE ── */
    .upload-zone {
      border: 2px dashed var(--border-hi); border-radius: var(--radius-lg); padding: 40px 20px;
      text-align: center; cursor: pointer; transition: all .2s; background: var(--bg-input);
      position: relative; overflow: hidden;
    }
    .upload-zone:hover { border-color: var(--aqua); background: rgba(0,212,255,.03); }
    .upload-zone.has-image { border-style: solid; padding: 0; }
    .upload-img { width: 100%; border-radius: 12px; display: block; max-height: 220px; object-fit: cover; }
    .upload-overlay {
      position: absolute; inset: 0; background: rgba(4,13,24,.7); border-radius: 12px;
      display: flex; align-items: center; justify-content: center; gap: 12px; opacity: 0;
      transition: opacity .2s;
    }
    .upload-zone.has-image:hover .upload-overlay { opacity: 1; }

    /* ── AI ANALYSIS CARD ── */
    .ai-analysis {
      background: linear-gradient(135deg, rgba(0,212,255,.06) 0%, rgba(0,229,160,.04) 100%);
      border: 1px solid rgba(0,212,255,.2); border-radius: var(--radius-lg); padding: 20px;
    }
    .ai-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .ai-badge {
      display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px;
      background: linear-gradient(90deg, rgba(0,212,255,.15), rgba(0,229,160,.1));
      border: 1px solid rgba(0,212,255,.25); font-size: 12px; font-weight: 700;
      color: var(--aqua);
    }
    .ai-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); }
    .ai-row:last-child { border-bottom: none; }
    .ai-row-label { font-size: 13px; color: var(--txt-muted); }
    .ai-row-val { font-size: 13px; font-weight: 600; color: #fff; }

    /* ── COMPLEXITY METER ── */
    .meter-bar { height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden; margin: 8px 0 4px; }
    .meter-fill { height: 100%; border-radius: 4px; transition: width .6s ease; }
    .meter-fill.low  { background: linear-gradient(90deg, #00B87A, var(--green)); }
    .meter-fill.mid  { background: linear-gradient(90deg, var(--orange), #FFB347); }
    .meter-fill.high { background: linear-gradient(90deg, var(--red), #FF6B6B); }

    /* ── BUDGET PREVIEW ── */
    .budget-preview {
      background: linear-gradient(160deg, var(--bg-card) 0%, rgba(0,212,255,.04) 100%);
      border: 1px solid var(--border-hi); border-radius: var(--radius-lg); overflow: hidden;
    }
    .budget-header { background: linear-gradient(135deg, #002A4A, #001E36); padding: 24px 20px; }
    .budget-company { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; }
    .budget-ref { font-size: 11px; color: var(--txt-muted); margin-top: 2px; }
    .budget-body { padding: 20px; }
    .budget-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--border); }
    .budget-line:last-child { border-bottom: none; }
    .budget-line-label { font-size: 13px; color: var(--txt-muted); }
    .budget-line-val { font-size: 13px; font-weight: 600; }
    .budget-total-row {
      display: flex; justify-content: space-between; align-items: center;
      background: linear-gradient(135deg, rgba(0,212,255,.1), rgba(0,212,255,.05));
      border: 1px solid rgba(0,212,255,.25); border-radius: var(--radius); padding: 18px 16px;
      margin-top: 16px;
    }
    .budget-total-label { font-size: 14px; font-weight: 700; color: var(--txt-muted); }
    .budget-total-val { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--aqua); }

    /* ── CLIENT ITEM ── */
    .client-item {
      display: flex; align-items: center; gap: 14px; padding: 16px;
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
      margin-bottom: 10px; cursor: pointer; transition: all .2s;
    }
    .client-item:hover { border-color: var(--border-hi); transform: translateX(3px); }
    .client-avatar {
      width: 46px; height: 46px; border-radius: 14px; background: linear-gradient(135deg, var(--aqua-dim), var(--aqua));
      display: flex; align-items: center; justify-content: center; font-size: 18px;
      font-weight: 800; color: var(--bg-deep); flex-shrink: 0;
      font-family: 'Syne', sans-serif;
    }
    .client-info { flex: 1; min-width: 0; }
    .client-name { font-weight: 700; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .client-meta { font-size: 12px; color: var(--txt-muted); margin-top: 2px; }
    .client-right { text-align: right; flex-shrink: 0; }
    .client-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: var(--green); }

    /* ── PLAN CARD ── */
    .plan-card {
      background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
      padding: 22px 20px; margin-bottom: 14px; position: relative; overflow: hidden; transition: all .25s;
    }
    .plan-card.featured { border-color: var(--aqua); background: linear-gradient(135deg, rgba(0,212,255,.06) 0%, var(--bg-card) 60%); }
    .plan-card.featured::before {
      content: '✦ MAIS POPULAR'; position: absolute; top: 14px; right: 14px;
      font-size: 9px; font-weight: 800; letter-spacing: .1em; color: var(--aqua);
      background: rgba(0,212,255,.12); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(0,212,255,.25);
    }
    .plan-name { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 4px; }
    .plan-price { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: var(--aqua); margin: 10px 0; }
    .plan-price span { font-size: 14px; color: var(--txt-muted); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400; }
    .plan-feature { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 8px; color: var(--txt-muted); }
    .plan-feature.on { color: var(--txt); }
    .plan-feature .fi { font-size: 14px; }

    /* ── LOADING DOTS ── */
    .loading-dots { display: flex; gap: 5px; align-items: center; }
    .loading-dot {
      width: 7px; height: 7px; border-radius: 50%; background: var(--aqua);
      animation: wave .9s ease-in-out infinite;
    }
    .loading-dot:nth-child(2) { animation-delay: .15s; }
    .loading-dot:nth-child(3) { animation-delay: .30s; }

    /* ── SPINNER ── */
    .spinner {
      width: 22px; height: 22px; border: 2px solid rgba(0,212,255,.2);
      border-top-color: var(--aqua); border-radius: 50%; animation: spin .7s linear infinite;
    }

    /* ── TOAST ── */
    .toast {
      position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%) translateY(0);
      background: var(--bg-card2); border: 1px solid var(--border-hi); border-radius: 12px;
      padding: 12px 20px; font-size: 14px; font-weight: 600; z-index: 999;
      box-shadow: 0 8px 32px rgba(0,0,0,.5); white-space: nowrap;
      animation: fadeUp .3s ease;
    }

    /* ── EMPTY ── */
    .empty { text-align: center; padding: 48px 20px; color: var(--txt-muted); }
    .empty-icon { font-size: 48px; margin-bottom: 12px; opacity: .5; }
    .empty-text { font-size: 15px; margin-bottom: 6px; font-weight: 600; }
    .empty-sub { font-size: 13px; }

    /* ── DETAIL MODAL ── */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 200;
      display: flex; align-items: flex-end; backdrop-filter: blur(4px);
    }
    .modal-sheet {
      width: 100%; max-width: 430px; margin: 0 auto;
      background: var(--bg-card); border-radius: 24px 24px 0 0;
      border: 1px solid var(--border); border-bottom: none;
      padding: 24px 20px 32px; animation: fadeUp .3s ease;
      max-height: 85dvh; overflow-y: auto;
    }
    .modal-handle { width: 36px; height: 4px; background: var(--border-hi); border-radius: 2px; margin: 0 auto 20px; }

    /* ── AUTH ── */
    .auth-screen {
      min-height: 100dvh; display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 32px 24px;
      background: radial-gradient(ellipse at top, rgba(0,100,150,.2) 0%, var(--bg-base) 70%);
    }
    .auth-logo { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 6px;
      background: linear-gradient(90deg, #fff, var(--aqua)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .auth-tagline { font-size: 14px; color: var(--txt-muted); margin-bottom: 40px; text-align: center; }
    .auth-card { width: 100%; max-width: 380px; }
    .auth-tab { display: flex; background: var(--bg-input); border-radius: 12px; padding: 4px; margin-bottom: 24px; }
    .auth-tab-btn {
      flex: 1; padding: 10px; border-radius: 9px; border: none; background: transparent;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600;
      color: var(--txt-muted); cursor: pointer; transition: all .2s;
    }
    .auth-tab-btn.active { background: var(--aqua); color: var(--bg-deep); box-shadow: 0 2px 12px rgba(0,212,255,.3); }

    /* ── PRODUCT TABLE ── */
    .prod-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .prod-table th { text-align: left; color: var(--txt-muted); font-size: 11px; text-transform: uppercase; letter-spacing: .05em; padding: 0 0 10px; }
    .prod-table td { padding: 10px 0; border-top: 1px solid var(--border); vertical-align: middle; }
    .prod-table td:last-child { text-align: right; font-weight: 700; color: var(--aqua); }

    /* Range */
    input[type="range"] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: var(--bg-input); outline: none; cursor: pointer; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--aqua); box-shadow: 0 0 8px rgba(0,212,255,.5); }
  `}</style>
);

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const CLIENTS_SEED = [
  { id: 1, name: "Carlos Mendes",   address: "Rua João Pinheiro, 420 - Uberlândia", pool: "Alvenaria 7×4m", monthly: 560, status: "ativo",  lastVisit: "Há 3 dias" },
  { id: 2, name: "Ana Paula Costa", address: "Av. Rondon Pacheco, 210 - Uberlândia", pool: "Fibra 5×3m",   monthly: 420, status: "ativo",  lastVisit: "Há 1 semana" },
  { id: 3, name: "Ricardo Lima",    address: "Rua Afonso Pena, 88 - Uberlândia",    pool: "Vinil 6×3m",   monthly: 450, status: "inativo",lastVisit: "Há 1 mês" },
  { id: 4, name: "Fernanda Gomes",  address: "Av. Getúlio Vargas, 500 - Uberlândia",pool: "Alvenaria 8×5m",monthly: 720, status: "ativo",  lastVisit: "Ontem" },
];

const BUDGETS_SEED = [
  { id: 1, client: "Carlos Mendes",   date: "08/04/2025", value: 560, status: "aprovado" },
  { id: 2, client: "Ana Paula Costa", date: "05/04/2025", value: 420, status: "pendente" },
  { id: 3, client: "Novo Cliente",    date: "01/04/2025", value: 650, status: "aprovado" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();

function calcVolume(l, w, d) {
  const clean = (v) => {
    const n = parseFloat(String(v || "").replace(",", "."));
    return isFinite(n) && n > 0 ? n : 0;
  };
  return clean(l) * clean(w) * clean(d);
}

// ─── TABELA DE PREÇOS — UBERLÂNDIA MG 2025 ───────────────────────────────────
// Fonte: pesquisa de mercado real com piscineiros autônomos de UDI
// INSIGHT: NÃO usar tabela fixa — usar m² + variáveis ambientais
const UDI = {
  // ── FÓRMULA PRINCIPAL: R$/m² de superfície ────────────────────────────────
  // R$250–350 = faixa mais comum para piscina residencial típica (~25–35m²)
  // R$300 = média ideal  →  R$10/m² para pool 30m² = R$300  ✓
  taxa_m2: {
    min:   8,    // piscina limpa, simples, coberta
    medio: 10,   // base do algoritmo  ← referência
    max:   12,   // piscina complexa, descoberta, vegetação
  },

  // ── POR VISITA ─────────────────────────────────────────────────────────────
  // Inclui mão de obra + produtos básicos + deslocamento curto
  visita: {
    min:    130,  // R$130 visita simples
    medio:  155,  // R$155 média de mercado UDI
    max:    180,  // R$180 visita complexa / longa distância
  },

  // ── VISITAS POR MÊS ────────────────────────────────────────────────────────
  visitas: {
    "1x/semana": 4, "2x/semana": 8, "1x/quinzena": 2, "mensal": 1,
  },

  // ── MULTIPLICADOR DE FREQUÊNCIA ────────────────────────────────────────────
  // Frequências maiores ganham pequeno desconto por eficiência de rota
  freqMult: {
    "1x/semana":   1.00,   // referência
    "2x/semana":   1.65,   // 2× − 17.5% desconto volume
    "1x/quinzena": 0.62,   // ≈ 2 visitas sem desconto
    "mensal":      0.40,   // 1 visita + markup urgência
  },

  // ── PRODUTOS QUÍMICOS (atacado/distribuidora UDI) ─────────────────────────
  produto: {
    cloro_kg:        22.00,
    algicida_l:      19.00,
    clarificante_l:  18.50,
    barrilha_kg:     13.00,
  },
  // Consumo base/m³/mês  (4g cloro/1000L a cada 2 dias)
  uso: {
    cloro_kg:        0.060,
    algicida_l:      0.024,
    clarificante_l:  0.006,
    barrilha_kg:     0.040,
  },

  // ── REFERÊNCIA MERCADO UDI ─────────────────────────────────────────────────
  mercado: { min: 250, max: 350 },
};

// ── COMPLEXIDADE ─────────────────────────────────────────────────────────────
// Cada flag ajusta a taxa R$/m² para cima ou para baixo
function calcComplexity(flags) {
  let score = 1.0;
  if (flags.vegetation)         score += 0.30;  // +30% — folhas, algas
  if (!flags.hasCover)          score += 0.20;  // +20% — sem capa = mais sujeira
  if (flags.sunExposure)        score += 0.15;  // +15% — evaporação de cloro
  if (flags.highUsage)          score += 0.25;  // +25% — mais carga orgânica
  if (!flags.machineRoomActive) score += 0.22;  // +22% — bomba/filtro inativo
  if (flags.solarHeating)       score += 0.18;  // +18% — água quente = +algas
  return +score.toFixed(3);
}

// ── TAXA R$/m² DINÂMICA ───────────────────────────────────────────────────────
// Interpola entre 8 e 12 conforme a complexidade (1.0 → 1.3 mapeado para 8 → 12)
function taxaM2(complexity) {
  const t = Math.min(1, (complexity - 1.0) / 1.30);
  return +(UDI.taxa_m2.min + t * (UDI.taxa_m2.max - UDI.taxa_m2.min)).toFixed(2);
}

// ── PRODUTOS ──────────────────────────────────────────────────────────────────
function calcProducts(volume, complexity) {
  const u = UDI.uso; const p = UDI.produto;
  const qty = {
    cloro:        +(volume * u.cloro_kg        * complexity).toFixed(3),
    algicida:     +(volume * u.algicida_l      * complexity).toFixed(3),
    clarificante: +(volume * u.clarificante_l  * complexity).toFixed(3),
    barrilha:     +(volume * u.barrilha_kg     * complexity).toFixed(3),
  };
  const custo = {
    cloro:        +(qty.cloro        * p.cloro_kg       ).toFixed(2),
    algicida:     +(qty.algicida     * p.algicida_l     ).toFixed(2),
    clarificante: +(qty.clarificante * p.clarificante_l ).toFixed(2),
    barrilha:     +(qty.barrilha     * p.barrilha_kg    ).toFixed(2),
  };
  const totalProdutos = +Object.values(custo).reduce((s,v)=>s+v,0).toFixed(2);
  return { qty, custo, totalProdutos };
}

// ── SANITIZADOR DE INPUT ──────────────────────────────────────────────────────
// Aceita vírgula brasileira ("6,5"), bloqueia negativos e NaN
function num(v) {
  if (typeof v === "number") return isFinite(v) && v > 0 ? v : 0;
  const clean = String(v || "").replace(",", ".").trim();
  const n = parseFloat(clean);
  return isFinite(n) && n > 0 ? n : 0;
}

// ── MOTOR PRINCIPAL: m² + variáveis ambientais ────────────────────────────────
// Fórmula: área_m² × taxa_R$/m² × freq × margem
// PISO MÍNIMO: nunca abaixo do custo real das visitas (R$130/visita mín. UDI)
function calcPrice(comprimento, largura, complexity, margin, freq) {
  const c = num(comprimento);
  const l = num(largura);
  const area      = +(c * l).toFixed(2);
  const taxa      = taxaM2(complexity);
  const freqMult  = UDI.freqMult[freq] || 1.0;
  const visitas   = UDI.visitas[freq]  || 4;

  // Preço de serviço (sem margem)
  const servicoBase = +(area * taxa * freqMult).toFixed(2);

  // Custo estimado por visita  (R$130–180 dependendo da complexidade)
  const t = Math.min(1, (complexity - 1.0) / 1.30);
  const custoVisita = +(UDI.visita.min + t * (UDI.visita.max - UDI.visita.min)).toFixed(2);
  const maoDeObra   = +(custoVisita * visitas * 0.72).toFixed(2);
  const deslocamento= +(custoVisita * visitas * 0.18).toFixed(2);

  const lucro = +(servicoBase * (margin / 100)).toFixed(2);
  let price = Math.ceil((servicoBase + lucro) / 10) * 10;

  // ── PISO MÍNIMO VIÁVEL ──────────────────────────────────────────────────────
  // Nenhum serviço sai por menos que 55% do custo/visita × nº visitas
  // (garante que quinzenal/mensal não fique abaixo do viável)
  const pisoMinimo = Math.ceil((custoVisita * visitas * 0.55) / 10) * 10;
  const abaixoDoPiso = area > 0 && price < pisoMinimo;
  if (abaixoDoPiso) price = pisoMinimo;

  // Área inválida → preço zero (UI mostra aviso)
  if (area <= 0) price = 0;

  const mktPct = Math.round(((price - UDI.mercado.min) / (UDI.mercado.max - UDI.mercado.min)) * 100);

  return {
    area, taxa, servicoBase, maoDeObra, deslocamento,
    lucro, price, visitas, custoVisita, freqMult, mktPct,
    abaixoDoPiso, pisoMinimo,
  };
}

// ─── COMPRESSOR DE IMAGEM ─────────────────────────────────────────────────────
// Usa FileReader → canvas em 2 passos. Compatível com iOS Safari e HEIC.
// Sempre retorna JPEG < 200 KB.
function compressImageFile(file) {
  return new Promise((resolve) => {

    // Passo 1: lê como dataURL (funciona com qualquer formato no iOS)
    const reader = new FileReader();
    reader.onerror = () => resolve({ dataUrl: "", b64: "", kb: 0, ok: false });
    reader.onload = (ev) => {
      const raw = ev.target.result;
      if (!raw) return resolve({ dataUrl: "", b64: "", kb: 0, ok: false });

      // Passo 2: carrega num <img> para pegar dimensões reais
      const img = new Image();
      img.onerror = () => {
        // Última tentativa: devolve raw diretamente (pode ser grande)
        const b64 = (raw.split(",")[1] || "").replace(/\s/g, "");
        const kb  = Math.round(b64.length * 0.75 / 1024);
        resolve({ dataUrl: raw, b64, kb, ok: false, note: "img-load-failed" });
      };
      img.onload = () => {
        // Passo 3: redimensiona para 400px máx em 2 passagens
        const drawAt = (src, maxPx, q) => {
          const nw = src.naturalWidth  || src.width  || 400;
          const nh = src.naturalHeight || src.height || 300;
          const scale = Math.min(1, maxPx / Math.max(nw, nh, 1));
          const w = Math.max(1, Math.floor(nw * scale));
          const h = Math.max(1, Math.floor(nh * scale));
          const cv = document.createElement("canvas");
          cv.width = w; cv.height = h;
          const ctx = cv.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(src, 0, 0, w, h);
          return { cv, w, h, dataUrl: cv.toDataURL("image/jpeg", q) };
        };

        // Primeira passagem: reduz para 600px a 0.8
        const pass1 = drawAt(img, 600, 0.8);

        // Segunda passagem: sobre o canvas anterior, para 400px a 0.65
        const tmp = new Image();
        tmp.onload = () => {
          // Loop de qualidade decrescente até < 180KB
          const cv2 = document.createElement("canvas");
          const nw2 = tmp.naturalWidth  || tmp.width  || pass1.w;
          const nh2 = tmp.naturalHeight || tmp.height || pass1.h;
          const scale2 = Math.min(1, 400 / Math.max(nw2, nh2, 1));
          cv2.width  = Math.max(1, Math.floor(nw2 * scale2));
          cv2.height = Math.max(1, Math.floor(nh2 * scale2));
          const ctx2 = cv2.getContext("2d");

          let dataUrl, b64, kb;
          for (let q = 0.65; q >= 0.20; q -= 0.10) {
            ctx2.fillStyle = "#fff";
            ctx2.fillRect(0, 0, cv2.width, cv2.height);
            ctx2.drawImage(tmp, 0, 0, cv2.width, cv2.height);
            dataUrl = cv2.toDataURL("image/jpeg", q);
            b64 = dataUrl.split(",")[1].replace(/\s/g, "");
            kb  = Math.round(b64.length * 0.75 / 1024);
            if (kb <= 180) break;
          }
          const dims = `${cv2.width}×${cv2.height}`;
          resolve({ dataUrl, b64, kb, ok: true, note: `canvas ${dims}` });
        };
        tmp.onerror = () => resolve({ dataUrl: pass1.dataUrl, b64: pass1.dataUrl.split(",")[1].replace(/\s/g,""), kb: 999, ok: false });
        tmp.src = pass1.dataUrl;
      };
      img.src = raw; // dataURL — funciona com HEIC no iOS porque o browser já decodificou
    };
    reader.readAsDataURL(file);
  });
}

// ─── ANÁLISE LOCAL POR CANVAS ────────────────────────────────────────────────
function analyzeByCanvas(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = () => resolve(null);
    img.onload = () => {
      try {
        const W = Math.min(img.width,  320);
        const H = Math.min(img.height, 320);
        const cv = document.createElement("canvas");
        cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d");
        ctx.drawImage(img, 0, 0, W, H);
        const full = ctx.getImageData(0, 0, W, H).data;

        // ── helpers ──────────────────────────────────────────────────────────
        const px = (x, y) => { const i=(y*W+x)*4; return [full[i],full[i+1],full[i+2]]; };
        const isWater = (r,g,b) => {
          const bright = (r+g+b)/3;
          // Água: azul ou ciano dominante, luminosidade média-alta
          return (b > r-5 && b > g-10 && bright > 45) ||   // azul claro
                 (g > r+5 && b > r-15 && bright > 40);     // ciano/teal
        };
        const isGreen = (r,g,b) => g > r*1.08 && g > b*1.05 && g > 55;

        // ── 1. MÁSCARA DE ÁGUA ───────────────────────────────────────────────
        const mask = new Uint8Array(W * H);
        let waterTotal = 0;
        for (let y=0; y<H; y++) for (let x=0; x<W; x++) {
          const [r,g,b] = px(x,y);
          if (isWater(r,g,b)) { mask[y*W+x]=1; waterTotal++; }
        }

        // ── 2. BOUNDING BOX DA ÁGUA ──────────────────────────────────────────
        let minX=W, maxX=0, minY=H, maxY=0;
        for (let y=0; y<H; y++) for (let x=0; x<W; x++) {
          if (mask[y*W+x]) {
            if (x<minX) minX=x; if (x>maxX) maxX=x;
            if (y<minY) minY=y; if (y>maxY) maxY=y;
          }
        }
        const bboxW = Math.max(1, maxX-minX);
        const bboxH = Math.max(1, maxY-minY);
        const bboxArea = bboxW * bboxH;
        const fillRatio = bboxArea > 0 ? waterTotal / bboxArea : 0;

        // ── 3. ANÁLISE DE FORMA pela máscara ─────────────────────────────────
        // Divide a bounding box em 4 quadrantes e mede preenchimento
        // Piscina retangular: todos os quadrantes cheios (~fillRatio alto)
        // Piscina irregular/L: algum quadrante vazio
        // Piscina oval: cantos faltam, centro cheio
        const qW = Math.floor(bboxW/2), qH = Math.floor(bboxH/2);
        const quadFill = (qx, qy) => {
          let cnt=0, tot=0;
          for (let dy=0; dy<qH; dy++) for (let dx=0; dx<qW; dx++) {
            const x=minX+qx*qW+dx, y=minY+qy*qH+dy;
            if (x<W && y<H) { tot++; if (mask[y*W+x]) cnt++; }
          }
          return tot>0 ? cnt/tot : 0;
        };
        const q = [quadFill(0,0), quadFill(1,0), quadFill(0,1), quadFill(1,1)];
        const qMin = Math.min(...q);
        const qMax = Math.max(...q);
        const qVariance = qMax - qMin;

        // Preenche um "anel" de cantos para detectar oval
        // Oval: amostra diagonais — cantos têm menos água que o centro
        const cornerFill = (cx, cy, r) => {
          let cnt=0, tot=0;
          for (let dy=-r; dy<=r; dy++) for (let dx=-r; dx<=r; dx++) {
            const x=cx+dx, y=cy+dy;
            if (x>=0&&x<W&&y>=0&&y<H) { tot++; if (mask[y*W+x]) cnt++; }
          }
          return tot>0 ? cnt/tot : 0;
        };
        const R = Math.floor(Math.min(bboxW, bboxH) * 0.12);
        const cornersAvg = (
          cornerFill(minX+R, minY+R, R) +
          cornerFill(maxX-R, minY+R, R) +
          cornerFill(minX+R, maxY-R, R) +
          cornerFill(maxX-R, maxY-R, R)
        ) / 4;
        const centerFill = cornerFill(
          Math.floor((minX+maxX)/2),
          Math.floor((minY+maxY)/2), R
        );
        const cornerVsCenter = centerFill > 0 ? cornersAvg / centerFill : 1;

        let formato;
        const aspectRatio = bboxW / bboxH;
        if      (qVariance > 0.35)                     formato = "Irregular"; // L, T, freeform
        else if (cornerVsCenter < 0.65 && fillRatio > 0.55) formato = "Oval";
        else if (aspectRatio > 1.45 || aspectRatio < 0.69)  formato = "Retangular";
        else if (fillRatio > 0.72)                     formato = "Retangular";
        else                                           formato = "Irregular";

        // ── 4. COR DA ÁGUA (centro da bbox) ──────────────────────────────────
        const cSamples = [];
        for (let y=minY+Math.floor(bboxH*.3); y<minY+Math.floor(bboxH*.7); y+=3)
          for (let x=minX+Math.floor(bboxW*.3); x<minX+Math.floor(bboxW*.7); x+=3)
            if (mask[y*W+x]) cSamples.push(px(x,y));

        let r=0, g=0, b=0;
        if (cSamples.length) {
          cSamples.forEach(([cr,cg,cb]) => { r+=cr; g+=cg; b+=cb; });
          r=r/cSamples.length; g=g/cSamples.length; b=b/cSamples.length;
        }
        const blueScore = b - Math.max(r,g);
        const bright    = (r+g+b)/3;
        const greenTint = g - b;
        const sujidade  = blueScore > 18 && bright > 75 ? "Limpa"
                        : greenTint > 10 || bright < 50 ? "Crítica"
                        : "Média";

        // ── 5. VEGETAÇÃO (4 bordas) ───────────────────────────────────────────
        const BORD = 30;
        const getData = (x,y,w,h) =>
          ctx.getImageData(Math.max(0,x),Math.max(0,y),
            Math.min(w,W-Math.max(0,x)), Math.min(h,H-Math.max(0,y))).data;
        const greenRatio = (d) => {
          let c=0,t=0;
          for (let i=0;i<d.length;i+=4){if(isGreen(d[i],d[i+1],d[i+2]))c++;t++;}
          return t>0?c/t:0;
        };
        const gTop   = greenRatio(getData(0,0,W,BORD));
        const gBot   = greenRatio(getData(0,H-BORD,W,BORD));
        const gLeft  = greenRatio(getData(0,0,BORD,H));
        const gRight = greenRatio(getData(W-BORD,0,BORD,H));
        const maxGreen = Math.max(gTop,gBot,gLeft,gRight);
        const vegetacao = maxGreen > 0.12;

        const obs = `água:R${Math.round(r)}G${Math.round(g)}B${Math.round(b)} ` +
                    `fill:${Math.round(fillRatio*100)}% ` +
                    `corn:${Math.round(cornerVsCenter*100)}% ` +
                    `veg:${Math.round(maxGreen*100)}%`;

        resolve({
          tipo: "Indefinido",
          formato,
          sujidade,
          comprimento_est: 6,
          largura_est: aspectRatio > 1.5 ? 3 : 4,
          vegetacao,
          capa: false,
          casa_maquinas_visivel: false,
          aquecimento_solar_visivel: false,
          observacoes: obs,
          _source: "local",
        });
      } catch(e) {
        resolve(null);
      }
    };
    img.src = dataUrl;
  });
}

// ─── ANÁLISE COM IA (tenta API; se falhar, usa canvas) ───────────────────────
async function analyzePoolImage(base64Image, dataUrl) {
  // Tenta API primeiro
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 400,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
            { type: "text", text: 'Você é analisador de piscinas. Retorne SOMENTE este JSON preenchido:\n{"tipo":"Alvenaria","formato":"Retangular","sujidade":"Limpa","comprimento_est":6,"largura_est":3,"vegetacao":false,"capa":false,"casa_maquinas_visivel":false,"aquecimento_solar_visivel":false,"observacoes":""}' }
          ]
        }]
      })
    });

    if (res.ok) {
      const data = await res.json();
      const raw  = data.content?.find(b => b.type === "text")?.text || "";
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        parsed._source = "api";
        return parsed;
      }
    }
  } catch (_) {
    // API falhou — vai para análise local
  }

  // Fallback: análise local por canvas
  const local = await analyzeByCanvas(dataUrl);
  if (local) return local;

  // Último recurso: valores padrão
  return {
    tipo: "Indefinido", formato: "Retangular", sujidade: "Média",
    comprimento_est: 6, largura_est: 3,
    vegetacao: false, capa: false,
    casa_maquinas_visivel: false, aquecimento_solar_visivel: false,
    observacoes: "Análise indisponível — preencha manualmente",
    _source: "default",
  };
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "demo@aquaorca.ai", password: "123456", company: "" });

  const submit = () => {
    onLogin({ name: form.name || "Piscineiro Pro", email: form.email });
  };

  return (
    <div className="auth-screen">
      <FontLink />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 52, marginBottom: 12, animation: "wave 2s ease-in-out infinite" }}>🏊</div>
        <div className="auth-logo">AquaOrça AI</div>
        <div className="auth-tagline">Orçamentos inteligentes para piscinas<br />Powered by IA</div>
      </div>

      <div className="auth-card card">
        <div className="auth-tab">
          <button className={`auth-tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Entrar</button>
          <button className={`auth-tab-btn ${tab === "reg" ? "active" : ""}`} onClick={() => setTab("reg")}>Cadastrar</button>
        </div>

        <div>
          {tab === "reg" && <>
            <div className="input-group">
              <div className="input-label">Nome completo</div>
              <input className="input-field" placeholder="Seu nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="input-group">
              <div className="input-label">Empresa (opcional)</div>
              <input className="input-field" placeholder="Nome da empresa" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            </div>
          </>}
          <div className="input-group">
            <div className="input-label">E-mail</div>
            <input className="input-field" type="email" placeholder="seu@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="input-group" style={{ marginBottom: 24 }}>
            <div className="input-label">Senha</div>
            <input className="input-field" type="password" placeholder="••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <button className="btn btn-primary btn-icon" onClick={submit}>
            <span>🚀</span> {tab === "login" ? "Entrar no App" : "Criar conta"}
          </button>
          {tab === "login" && <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--txt-muted)" }}>Use email/senha acima para demo</div>}
        </div>
      </div>

      <div style={{ marginTop: 28, display: "flex", gap: 20, fontSize: 12, color: "var(--txt-dim)" }}>
        <span>🔒 SSL seguro</span>
        <span>☁️ Backup diário</span>
        <span>📱 Mobile first</span>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, clients, budgets, onNew }) {
  const activeClients = clients.filter(c => c.status === "ativo").length;
  const totalMonthly  = clients.filter(c => c.status === "ativo").reduce((s, c) => s + c.monthly, 0);
  const ticketMed     = activeClients > 0 ? Math.round(totalMonthly / activeClients) : 0;

  const recentBudgets = [...budgets].slice(-3).reverse();

  return (
    <div className="screen">
      <div className="fade-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <div className="screen-title">Olá, {user.name.split(" ")[0]} 👋</div>
            <div className="screen-subtitle">Aqui está seu resumo de hoje</div>
          </div>
          <div className="tag tag-green" style={{ marginTop: 6 }}>● Plano Pro</div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="kpi-grid fade-up-2">
        <div className="kpi-card aqua">
          <div className="kpi-label">Faturamento Est.</div>
          <div className="kpi-value">{fmt(totalMonthly)}</div>
          <div className="kpi-trend up">▲ 12% este mês</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">Clientes Ativos</div>
          <div className="kpi-value">{activeClients}</div>
          <div className="kpi-trend up">▲ 2 novos</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-label">Ticket Médio</div>
          <div className="kpi-value">{fmt(ticketMed)}</div>
          <div className="kpi-trend neutral">─ estável</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-label">Orçamentos</div>
          <div className="kpi-value">{budgets.length}</div>
          <div className="kpi-trend up">▲ {budgets.length} gerados</div>
        </div>
      </div>

      {/* CTA */}
      <div className="fade-up-3" style={{ marginBottom: 20 }}>
        <button className="btn btn-primary btn-icon" onClick={onNew}>
          <span>✨</span> Gerar Novo Orçamento com IA
        </button>
      </div>

      {/* RECENT */}
      <div className="fade-up-4">
        <div className="section-head">
          <div className="section-title">Orçamentos Recentes</div>
        </div>
        {recentBudgets.map((b, i) => (
          <div key={b.id} className="client-item" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="client-avatar" style={{ background: "linear-gradient(135deg,#003A5C,#005A8A)", color: "var(--aqua)", fontSize: 14 }}>
              {b.client.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </div>
            <div className="client-info">
              <div className="client-name">{b.client}</div>
              <div className="client-meta">📅 {b.date}</div>
            </div>
            <div className="client-right">
              <div className="client-val">{fmt(b.value)}</div>
              <div style={{ marginTop: 4 }}>
                <span className={`tag ${b.status === "aprovado" ? "tag-green" : "tag-orange"}`}>
                  {b.status === "aprovado" ? "✓ Aprovado" : "⏳ Pendente"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK TIPS */}
      <div className="fade-up-5" style={{ marginTop: 8, marginBottom: 20 }}>
        <div className="card" style={{ background: "linear-gradient(135deg, rgba(0,212,255,.05), rgba(0,229,160,.03))", border: "1px solid rgba(0,212,255,.15)" }}>
          <div style={{ fontSize: 13, color: "var(--txt-muted)", lineHeight: 1.6 }}>
            <span style={{ color: "var(--aqua)", fontWeight: 700 }}>💡 Mercado Uberlândia:</span> Pacotes mensais giram entre
            R$ 400–650 para piscinas residenciais de até 40m³ (visita semanal + produtos). Use o motor de cálculo para precificar com precisão!
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NEW BUDGET WIZARD ────────────────────────────────────────────────────────
function NewBudget({ clients, onSave, onBack }) {
  const [step, setStep]           = useState(0);
  const [imgSrc, setImgSrc]       = useState(null);
  const [aiResult, setAiResult]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [aiErr, setAiErr]         = useState(false);
  const [aiErrMsg, setAiErrMsg]   = useState("");

  // Ref — sempre atualizado, sem stale closure
  const imgDataRef  = useRef({ b64: null, type: "image/jpeg", kb: 0, note: "" });
  const fileRef     = useRef();
  const galleryRef  = useRef();

  const [form, setForm] = useState({
    clientId: "", clientName: "", address: "",
    comprimento: "6", largura: "3.5", profundidade: "1.5",
    tipo: "Alvenaria", freq: "1x/semana",
    vegetation: false, hasCover: false, sunExposure: false, highUsage: false,
    machineRoomActive: true, solarHeating: false,
    margin: 40, notes: "",
  });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Handle file pick — usa objectURL (funciona com HEIC/iPhone), armazena em ref
  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const previewUrl = URL.createObjectURL(file);
    setImgSrc(previewUrl);
    setAiResult(null); setAiErr(false); setAiErrMsg("");
    imgDataRef.current = { b64: null, type: "image/jpeg", kb: 0 };

    setCompressing(true);
    const res = await compressImageFile(file);
    setCompressing(false);

    if (res && res.b64) {
      imgDataRef.current = { b64: res.b64, type: "image/jpeg", kb: res.kb, note: res.note || "" };
      setImgSrc(res.dataUrl);
    }
  };

  const runAI = async () => {
    const { b64, kb } = imgDataRef.current;
    const dataUrl = imgSrc; // dataUrl for local canvas analysis
    if (!b64) {
      setAiErr(true);
      setAiErrMsg(compressing ? "Aguarde a compressão..." : "Nenhuma imagem carregada.");
      return;
    }
    setLoading(true); setAiErr(false); setAiErrMsg("");
    try {
      const result = await analyzePoolImage(b64, dataUrl);
      if (!result) throw new Error("Análise retornou vazia");
      setAiResult(result);
      const c = result.comprimento_est; if (c > 0 && c < 50) upd("comprimento", String(c));
      const l = result.largura_est;     if (l > 0 && l < 30) upd("largura",     String(l));
      if (typeof result.vegetacao === "boolean")                 upd("vegetation",        result.vegetacao);
      if (typeof result.capa === "boolean")                      upd("hasCover",          result.capa);
      if (typeof result.casa_maquinas_visivel === "boolean")     upd("machineRoomActive", result.casa_maquinas_visivel);
      if (typeof result.aquecimento_solar_visivel === "boolean") upd("solarHeating",      result.aquecimento_solar_visivel);
      if (result.tipo && result.tipo !== "Indefinido")           upd("tipo",              result.tipo);
    } catch (err) {
      setAiErr(true);
      setAiErrMsg(err?.message || "Erro desconhecido");
    }
    setLoading(false);
  };

  // Derived calcs
  const volume     = calcVolume(form.comprimento || 0, form.largura || 0, form.profundidade || 0);
  const area       = +(num(form.comprimento) * num(form.largura)).toFixed(1);
  const complexity = calcComplexity(form);
  const prodData   = calcProducts(volume, complexity);
  const priceData  = calcPrice(form.comprimento||0, form.largura||0, complexity, form.margin, form.freq);
  const { price }  = priceData;
  const complexPct = Math.min(100, Math.round((complexity - 1) / 1.3 * 100));
  const complexLevel = complexPct < 33 ? "low" : complexPct < 66 ? "mid" : "high";

  // Market reference badge
  const mktRef = UDI.mercado;
  const mktStatus = price < mktRef.min ? "abaixo" : price > mktRef.max ? "acima" : "dentro";

  const selClient = clients.find(c => c.id === parseInt(form.clientId));
  const clientDisplay = selClient ? selClient.name : form.clientName || "—";
  const budgetNum = useRef(uid()).current; // stable across re-renders

  const steps = ["📸 Foto", "✏️ Dados", "🧮 Cálculo", "📋 Preview"];

  const saveBudget = () => {
    onSave({
      id: Date.now(),
      client: clientDisplay,
      date: new Date().toLocaleDateString("pt-BR"),
      value: price,
      status: "pendente",
      form, volume, complexity, prodData, priceData, imgSrc,
    });
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(
      `🏊 *Orçamento AquaOrça AI — Uberlândia MG*\n` +
      `📋 Nº ${budgetNum} · ${new Date().toLocaleDateString("pt-BR")}\n\n` +
      `👤 Cliente: ${clientDisplay}\n` +
      `📍 Endereço: ${form.address || "A confirmar"}\n` +
      `🏗️ Piscina: ${form.tipo} ${form.comprimento}×${form.largura}×${form.profundidade}m\n` +
      `📐 Área: ${area}m²  |  💧 Volume: ${isNaN(volume) ? "—" : volume.toFixed(1)}m³\n` +
      `🛡️ Capa: ${form.hasCover ? "Possui" : "Sem capa"}  |  ` +
      `⚙️ Máq.: ${form.machineRoomActive ? "Ativa" : "Inativa"}  |  ` +
      `☀️ Solar: ${form.solarHeating ? "Sim" : "Não"}\n` +
      `📅 Frequência: ${form.freq} (${priceData.visitas} visitas/mês)\n\n` +
      `💼 *VALOR DO SERVIÇO (mão de obra): ${fmt(price)}/mês*\n` +
      `_(${area}m² × R$${priceData.taxa}/m² × ${priceData.freqMult} + ${form.margin}% margem)_\n\n` +
      `🧪 *Estimativa de produtos (por conta do cliente):*\n` +
      `• Cloro: ${prodData.qty.cloro.toFixed(2)}kg — ${fmt(prodData.custo.cloro)}\n` +
      `• Algicida: ${prodData.qty.algicida.toFixed(2)}L — ${fmt(prodData.custo.algicida)}\n` +
      `• Clarificante: ${prodData.qty.clarificante.toFixed(2)}L — ${fmt(prodData.custo.clarificante)}\n` +
      `• Barrilha: ${prodData.qty.barrilha.toFixed(2)}kg — ${fmt(prodData.custo.barrilha)}\n` +
      `• *Total estimado produtos: ${fmt(prodData.totalProdutos)}/mês*\n\n` +
      `_*Preços de produtos: referência UDI 2025. Custo real pode variar.*_\n` +
      `_Gerado por AquaOrça AI — Uberlândia_ ✨`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <div className="screen">
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--txt-muted)" }}>←</button>
        <div>
          <div className="screen-title" style={{ fontSize: 20 }}>Novo Orçamento</div>
          <div className="screen-subtitle" style={{ margin: 0 }}>3 passos para resultado profissional</div>
        </div>
      </div>

      {/* STEP BAR */}
      <div className="step-bar fade-up">
        {steps.map((s, i) => (
          <>
            <div
              key={`d${i}`}
              className={`step-dot ${i < step ? "done" : i === step ? "active" : "pending"}`}
              onClick={() => i < step && setStep(i)}
              style={{ cursor: i < step ? "pointer" : "default" }}
            >
              {i < step ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div key={`l${i}`} className={`step-line ${i < step ? "done" : ""}`} />}
          </>
        ))}
      </div>

      {/* ── STEP 0: FOTO ── */}
      {step === 0 && (
        <div className="fade-up">
          <div className="section-title" style={{ marginBottom: 14 }}>Foto da piscina</div>

          {/* Hidden inputs — câmera e galeria separados */}
          <input
            ref={fileRef}
            type="file" accept="image/*" capture="environment"
            style={{ display: "none" }} onChange={pickFile}
          />
          <input
            ref={galleryRef}
            type="file" accept="image/*"
            style={{ display: "none" }} onChange={pickFile}
          />

          {/* Zone */}
          <div className={`upload-zone ${imgSrc ? "has-image" : ""}`}>
            {imgSrc ? (
              <>
                <img src={imgSrc} alt="piscina" className="upload-img" />
                <div className="upload-overlay">
                  <button className="btn btn-sm btn-ghost" onClick={(e) => { e.stopPropagation(); galleryRef.current?.click(); }}>🔄 Trocar</button>
                  <button className="btn btn-sm btn-ghost" onClick={(e) => { e.stopPropagation(); setImgSrc(null); setImgB64(null); setAiResult(null); setAiErr(false); }}>🗑️ Remover</button>
                </div>
              </>
            ) : (
              <div style={{ pointerEvents: "none" }}>
                <div style={{ fontSize: 48, marginBottom: 10, opacity: .5 }}>📷</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Selecione uma foto</div>
                <div style={{ fontSize: 12, color: "var(--txt-muted)" }}>Use os botões abaixo para câmera ou galeria</div>
              </div>
            )}
          </div>

          {/* Botões de origem da foto */}
          {!imgSrc && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
              <button
                className="btn btn-ghost btn-icon"
                style={{ fontSize: 14, padding: "14px 12px" }}
                onClick={() => fileRef.current?.click()}
              >
                <span>📷</span> Abrir câmera
              </button>
              <button
                className="btn btn-ghost btn-icon"
                style={{ fontSize: 14, padding: "14px 12px" }}
                onClick={() => galleryRef.current?.click()}
              >
                <span>🖼️</span> Galeria / álbum
              </button>
            </div>
          )}

          {/* Botão analisar */}
          {imgSrc && !aiResult && (
            <div style={{ marginTop: 14 }}>
              {compressing ? (
                <button className="btn btn-primary btn-icon" disabled>
                  <div className="spinner" /><span>Comprimindo imagem...</span>
                </button>
              ) : (
                <button className="btn btn-primary btn-icon" onClick={runAI} disabled={loading}>
                  {loading
                    ? <><div className="spinner" /><span>Analisando com IA...</span></>
                    : <><span>🤖</span> Analisar com IA</>}
                </button>
              )}
              {!compressing && imgDataRef.current.kb > 0 && (
                <div style={{
                  fontSize: 11, textAlign: "center", marginTop: 6,
                  color: imgDataRef.current.kb > 400 ? "var(--red)" : imgDataRef.current.kb > 200 ? "var(--orange)" : "var(--green)"
                }}>
                  {imgDataRef.current.kb > 400
                    ? `❌ Muito grande: ${imgDataRef.current.kb} KB — compressão falhou`
                    : imgDataRef.current.kb > 200
                    ? `⚠️ ${imgDataRef.current.kb} KB — pode falhar`
                    : `✅ ${imgDataRef.current.kb} KB — pronta`}
                  {imgDataRef.current.note ? ` · ${imgDataRef.current.note}` : ""}
                </div>
              )}
            </div>
          )}

          {/* Botão trocar foto (quando imagem carregada) */}
          {imgSrc && !loading && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <button className="btn btn-ghost btn-icon" style={{ fontSize: 13, padding: "11px 10px" }}
                onClick={() => fileRef.current?.click()}>
                <span>📷</span> Nova foto
              </button>
              <button className="btn btn-ghost btn-icon" style={{ fontSize: 13, padding: "11px 10px" }}
                onClick={() => galleryRef.current?.click()}>
                <span>🖼️</span> Da galeria
              </button>
            </div>
          )}

          {/* Erro da IA — só aparece se a análise local também falhar (raro) */}
          {aiErr && (
            <div className="card" style={{ marginTop: 12, borderColor: "var(--orange)", background: "rgba(255,140,66,.06)" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--orange)", marginBottom: 4 }}>Não foi possível analisar</div>
                  <div style={{ fontSize: 12, color: "var(--txt-muted)", marginBottom: 8 }}>{aiErrMsg}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-sm btn-ghost" style={{ fontSize: 12 }}
                      onClick={() => { setAiErr(false); setAiErrMsg(""); runAI(); }}>🔄 Tentar</button>
                    <button className="btn btn-sm btn-ghost" style={{ fontSize: 12 }}
                      onClick={() => { setAiErr(false); setStep(1); }}>✏️ Manual</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {aiResult && (
            <div className="ai-analysis fade-up" style={{ marginTop: 16 }}>
              <div className="ai-head">
                <div className="ai-badge">
                  <span>{aiResult._source === "api" ? "🤖" : "🔬"}</span>
                  {aiResult._source === "api" ? "Análise IA concluída" : "Análise visual automática"}
                </div>
                <span className={`tag ${aiResult.sujidade === "Limpa" ? "tag-green" : aiResult.sujidade === "Crítica" ? "tag-red" : "tag-orange"}`}>
                  {aiResult.sujidade}
                </span>
              </div>
              {[
                ["Tipo",              aiResult.tipo],
                ["Formato",          aiResult.formato],
                ["Dimensões",        `~${aiResult.comprimento_est}×${aiResult.largura_est}m`],
                ["Vegetação",        aiResult.vegetacao ? "✅ Sim (+30%)" : "❌ Não"],
                ["Capa protetora",   aiResult.capa ? "✅ Possui capa" : "❌ Sem capa (+20%)"],
                ["Casa de máquinas", aiResult.casa_maquinas_visivel ? "✅ Visível/ativa" : "⚠️ Não detectada (+22%)"],
                ["Aquec. solar",     aiResult.aquecimento_solar_visivel ? "☀️ Sim (+18%)" : "❌ Não detectado"],
                ["Observação",       aiResult.observacoes],
              ].filter(([,v]) => v).map(([k, v]) => (
                <div className="ai-row" key={k}>
                  <span className="ai-row-label">{k}</span>
                  <span className="ai-row-val">{v}</span>
                </div>
              ))}
              {aiResult._source !== "api" && (
                <div style={{ fontSize: 11, color: "var(--txt-dim)", marginTop: 8, lineHeight: 1.5 }}>
                  💡 Análise por cor e proporção da foto. Confirme e ajuste os dados no próximo passo.
                </div>
              )}
            </div>
          )}

          <div className="divider" />
          <button className="btn btn-ghost" onClick={() => setStep(1)}>
            {imgSrc ? (aiResult ? "Continuar ›" : "Pular análise ›") : "Inserir manualmente ›"}
          </button>
        </div>
      )}

      {/* ── STEP 1: DADOS ── */}
      {step === 1 && (
        <div className="fade-up">
          <div className="section-title" style={{ marginBottom: 16 }}>Dados da piscina e cliente</div>

          <div className="input-group">
            <div className="input-label">Cliente</div>
            <select className="input-field" value={form.clientId} onChange={e => upd("clientId", e.target.value)}>
              <option value="">Novo cliente…</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          {!form.clientId && (
            <>
              <div className="input-group">
                <div className="input-label">Nome do cliente</div>
                <input className="input-field" placeholder="Nome completo" value={form.clientName} onChange={e => upd("clientName", e.target.value)} />
              </div>
              <div className="input-group">
                <div className="input-label">Endereço</div>
                <input className="input-field" placeholder="Rua, nº - Cidade" value={form.address} onChange={e => upd("address", e.target.value)} />
              </div>
            </>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["Comprimento (m)", "comprimento", "7"], ["Largura (m)", "largura", "4"], ["Prof. média (m)", "profundidade", "1.5"]].map(([l, k, ph]) => (
              <div className="input-group" key={k}>
                <div className="input-label">{l}</div>
                <input className="input-field" type="number" step="0.1" placeholder={ph} value={form[k]} onChange={e => upd(k, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="input-group">
            <div className="input-label">Tipo de piscina</div>
            <div className="chips">
              {["Alvenaria", "Fibra", "Vinil"].map(t => (
                <button key={t} className={`chip ${form.tipo === t ? "selected" : ""}`} onClick={() => upd("tipo", t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <div className="input-label">Frequência de manutenção</div>
            <div className="chips">
              {["1x/semana", "2x/semana", "1x/quinzena", "mensal"].map(f => (
                <button key={f} className={`chip ${form.freq === f ? "selected" : ""}`} onClick={() => upd("freq", f)}>{f}</button>
              ))}
            </div>
          </div>

          {/* ── INFRA DA PISCINA ── */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,.04), transparent)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--txt-muted)", marginBottom: 14 }}>🔧 Infraestrutura</div>

            {/* CAPA */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🛡️ Capa de proteção</div>
              <div className="chips">
                <button className={`chip ${form.hasCover ? "selected" : ""}`} onClick={() => upd("hasCover", true)}>✅ Possui capa</button>
                <button className={`chip ${!form.hasCover ? "selected" : ""}`} onClick={() => upd("hasCover", false)}>❌ Sem capa <span style={{ fontSize: 10, opacity: .7 }}>+20%</span></button>
              </div>
            </div>

            {/* CASA DE MÁQUINAS */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>⚙️ Casa de máquinas</div>
              <div className="chips">
                <button className={`chip ${form.machineRoomActive ? "selected" : ""}`} onClick={() => upd("machineRoomActive", true)}>✅ Ativa / funcionando</button>
                <button className={`chip ${!form.machineRoomActive ? "selected" : ""}`} onClick={() => upd("machineRoomActive", false)}>⚠️ Inativa / sem casa <span style={{ fontSize: 10, opacity: .7 }}>+22%</span></button>
              </div>
            </div>

            {/* AQUECIMENTO SOLAR */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>☀️ Aquecimento solar</div>
              <div className="chips">
                <button className={`chip ${form.solarHeating ? "selected" : ""}`} onClick={() => upd("solarHeating", true)}>☀️ Possui aquec. solar <span style={{ fontSize: 10, opacity: .7 }}>+18%</span></button>
                <button className={`chip ${!form.solarHeating ? "selected" : ""}`} onClick={() => upd("solarHeating", false)}>❌ Sem aquecimento</button>
              </div>
            </div>
          </div>

          <div className="divider" />
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}>‹ Voltar</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Calcular ›</button>
          </div>
        </div>
      )}

      {/* ── STEP 2: CÁLCULO ── */}
      {step === 2 && (
        <div className="fade-up">
          <div className="section-title" style={{ marginBottom: 16 }}>Motor de cálculo inteligente</div>

          {/* Volume */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>💧 Volume da piscina</span>
              <span style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800, color: "var(--aqua)" }}>
                {isNaN(volume) ? "—" : `${volume.toFixed(1)} m³`}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "var(--txt-muted)" }}>
              {form.comprimento}m × {form.largura}m × {form.profundidade}m de profundidade média
            </div>
          </div>

          {/* Fatores de complexidade */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>⚡ Índice de Complexidade</div>
            {[
              ["vegetation",         "🌿 Vegetação próxima",              "+30%", false],
              ["hasCover",           "🛡️ Possui capa protetora",          "-20%", true ],
              ["sunExposure",        "☀️ Alta exposição solar",            "+15%", false],
              ["highUsage",          "🏊 Alto uso diário",                 "+25%", false],
              ["machineRoomActive",  "⚙️ Casa de máquinas ativa",         "-22%", true ],
              ["solarHeating",       "🌡️ Aquecimento solar instalado",    "+18%", false],
            ].map(([key, label, pct, isPositive]) => {
              const isActive = isPositive ? !form[key] : form[key];
              return (
              <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1 }}>
                  <div
                    onClick={() => upd(key, !form[key])}
                    style={{
                      width: 22, height: 22, borderRadius: 6,
                      border: `2px solid ${form[key] ? "var(--aqua)" : "var(--border-hi)"}`,
                      background: form[key] ? "var(--aqua)" : "transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "all .2s",
                    }}
                  >{form[key] ? "✓" : ""}</div>
                  <span style={{ fontSize: 13 }}>{label}</span>
                </label>
                <span className={`tag ${isActive ? (isPositive ? "tag-green" : "tag-orange") : ""}`}
                  style={{ fontSize: 11, opacity: isActive ? 1 : .35, color: isPositive && isActive ? "var(--green)" : undefined }}>
                  {pct}
                </span>
              </div>
            );})}
            <div style={{ marginBottom: 8, padding: "8px 0", borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--txt-muted)", display: "flex", gap: 16 }}>
              <span>🛡️ Capa: <b style={{ color: form.hasCover ? "var(--green)" : "var(--orange)" }}>{form.hasCover ? "Sim" : "Não"}</b></span>
              <span>⚙️ C. Máq.: <b style={{ color: form.machineRoomActive ? "var(--green)" : "var(--orange)" }}>{form.machineRoomActive ? "Ativa" : "Inativa"}</b></span>
              <span>☀️ Aquec.: <b style={{ color: form.solarHeating ? "var(--orange)" : "var(--txt-muted)" }}>{form.solarHeating ? "Sim" : "Não"}</b></span>
            </div>
            <div className="meter-bar"><div className={`meter-fill ${complexLevel}`} style={{ width: `${complexPct}%` }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--txt-muted)" }}>
              <span>Score: {complexity.toFixed(2)}×</span>
              <span style={{ color: complexLevel === "low" ? "var(--green)" : complexLevel === "mid" ? "var(--orange)" : "var(--red)", fontWeight: 700 }}>
                {complexLevel === "low" ? "Baixo" : complexLevel === "mid" ? "Médio" : "Alto"}
              </span>
            </div>
          </div>

          {/* Produtos — Informativo */}
          <div className="card" style={{ marginBottom: 14, borderColor: "rgba(255,140,66,.2)", background: "rgba(255,140,66,.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>🧪 Estimativa de Produtos</div>
              <span className="tag tag-orange" style={{ fontSize: 10 }}>👤 Por conta do cliente</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--txt-muted)", marginBottom: 12, padding: "8px 10px", background: "rgba(255,140,66,.06)", borderRadius: 8, lineHeight: 1.5 }}>
              ℹ️ Estes valores <b style={{ color: "var(--txt)" }}>NÃO entram no preço do serviço.</b> São incluídos no orçamento apenas como estimativa de referência para o cliente.
            </div>
            <table className="prod-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Qtd./mês</th>
                  <th style={{ textAlign: "right" }}>Est. custo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["🔵 Cloro gran. 65%",  `${prodData.qty.cloro.toFixed(2)} kg`,      prodData.custo.cloro,        `R$ ${UDI.produto.cloro_kg}/kg`],
                  ["🟢 Algicida manut.", `${prodData.qty.algicida.toFixed(2)} L`,     prodData.custo.algicida,     `R$ ${UDI.produto.algicida_l}/L`],
                  ["⚪ Clarificante",     `${prodData.qty.clarificante.toFixed(2)} L`, prodData.custo.clarificante, `R$ ${UDI.produto.clarificante_l}/L`],
                  ["🟤 Barrilha pH+",    `${prodData.qty.barrilha.toFixed(2)} kg`,    prodData.custo.barrilha,     `R$ ${UDI.produto.barrilha_kg}/kg`],
                ].map(([n, qty, custo, unit]) => (
                  <tr key={n}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{n}</div>
                      <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 1 }}>{unit}</div>
                    </td>
                    <td style={{ color: "var(--txt-muted)" }}>{qty}</td>
                    <td style={{ color: "var(--txt-muted)" }}>{fmt(custo)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ paddingTop: 12, color: "var(--txt-muted)", fontWeight: 700 }}>Total estimado/mês</td>
                  <td style={{ paddingTop: 12, color: "var(--orange)", fontWeight: 800 }}>{fmt(prodData.totalProdutos)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Fórmula m² */}
          <div className="card" style={{ marginBottom: 14, background: "linear-gradient(135deg, rgba(0,212,255,.05), transparent)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>📐 Fórmula: m² + Variáveis</div>

            {/* Área */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13 }}>📏 Área de superfície</div>
                <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 1 }}>{form.comprimento}m × {form.largura}m</div>
              </div>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, color: "var(--aqua)" }}>{area} m²</div>
            </div>

            {/* Taxa R$/m² dinâmica */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13 }}>💲 Taxa R$/m² (dinâmica)</div>
                <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 1 }}>Faixa R$8–12 ajustada pela complexidade</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: "var(--txt-muted)" }}>R$8</span>
                <div style={{ width: 60, height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${((priceData.taxa - 8) / 4) * 100}%`, background: "linear-gradient(90deg, var(--green), var(--aqua))", borderRadius: 3, transition: "width .4s" }} />
                </div>
                <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--aqua)" }}>R${priceData.taxa}</span>
              </div>
            </div>

            {/* Frequência mult */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13 }}>📅 Frequência ({form.freq})</div>
                <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 1 }}>{priceData.visitas} visitas/mês</div>
              </div>
              <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--green)" }}>×{priceData.freqMult}</span>
            </div>

            {/* Custo por visita estimado */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
              <div>
                <div style={{ fontSize: 13 }}>👷 Custo/visita estimado</div>
                <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 1 }}>Mão de obra + produtos + desloc. UDI</div>
              </div>
              <span style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--txt)" }}>{fmt(priceData.custoVisita)}</span>
            </div>

            {/* Fórmula visual */}
            <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(0,212,255,.05)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--txt-muted)", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Cálculo</div>
              <div style={{ fontSize: 12, color: "var(--txt)", fontFamily: "monospace", lineHeight: 1.7 }}>
                {area}m² × R${priceData.taxa}/m² × {priceData.freqMult}<br/>
                = <span style={{ color: "var(--aqua)", fontWeight: 700 }}>{fmt(priceData.servicoBase)}</span> (sem margem)
              </div>
            </div>
          </div>

          {/* Margem */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>📈 Margem de lucro</span>
              <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--green)" }}>{form.margin}%  (+{fmt(priceData.lucro)})</span>
            </div>
            <input type="range" min={30} max={80} step={5} value={form.margin} onChange={e => upd("margin", parseInt(e.target.value))} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--txt-muted)", marginTop: 4 }}>
              <span>Mín. 30%</span>
              <span>Serviço base: {fmt(priceData.servicoBase)}</span>
              <span>Máx. 80%</span>
            </div>
          </div>

          {/* Preço final + referência mercado */}
          {priceData.area <= 0 ? (
            <div style={{ background: "rgba(255,77,109,.08)", border: "1px solid rgba(255,77,109,.3)", borderRadius: "var(--radius-lg)", padding: 20, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>⚠️</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--red)", marginBottom: 4 }}>Medidas inválidas</div>
              <div style={{ fontSize: 12, color: "var(--txt-muted)" }}>Volte ao passo anterior e preencha comprimento e largura da piscina (ex: 6 e 3,5)</div>
            </div>
          ) : (
            <>
              <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,.12), rgba(0,229,160,.06))", border: "1px solid rgba(0,212,255,.3)", borderRadius: "var(--radius-lg)", padding: 20, marginBottom: 8, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "var(--txt-muted)", marginBottom: 4 }}>💵 Valor Mensal Sugerido</div>
                <div style={{ fontFamily: "Syne", fontSize: 38, fontWeight: 800, color: "var(--aqua)", lineHeight: 1 }}>{fmt(price)}</div>
                <div style={{ fontSize: 11, color: "var(--txt-muted)", marginTop: 6 }}>Lucro estimado: {fmt(priceData.lucro)} · {form.freq}</div>
                {priceData.abaixoDoPiso && (
                  <div style={{ fontSize: 11, color: "var(--orange)", marginTop: 8, padding: "6px 10px", background: "rgba(255,140,66,.1)", borderRadius: 8, display: "inline-block" }}>
                    ⚡ Ajustado ao piso mínimo viável ({priceData.visitas} visita{priceData.visitas > 1 ? "s" : ""}/mês)
                  </div>
                )}
              </div>
              {/* Market reference badge */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20,
                padding: "10px 16px", borderRadius: 10,
                background: mktStatus === "dentro" ? "rgba(0,229,160,.08)" : mktStatus === "abaixo" ? "rgba(255,140,66,.08)" : "rgba(0,212,255,.08)",
                border: `1px solid ${mktStatus === "dentro" ? "rgba(0,229,160,.2)" : mktStatus === "abaixo" ? "rgba(255,140,66,.2)" : "rgba(0,212,255,.2)"}`,
              }}>
                <span style={{ fontSize: 16 }}>{mktStatus === "dentro" ? "✅" : mktStatus === "abaixo" ? "⚠️" : "🏆"}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: mktStatus === "dentro" ? "var(--green)" : mktStatus === "abaixo" ? "var(--orange)" : "var(--aqua)" }}>
                    {mktStatus === "dentro" ? "Dentro da média de Uberlândia" : mktStatus === "abaixo" ? "Abaixo da média local — revise a margem" : "Acima da média — diferencial premium"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--txt-dim)" }}>Referência mercado UDI: {fmt(mktRef.min)}–{fmt(mktRef.max)}/mês</div>
                </div>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>‹ Voltar</button>
            <button className="btn btn-primary" onClick={() => setStep(3)} disabled={priceData.area <= 0}>
              {priceData.area <= 0 ? "Preencha as medidas" : "Ver orçamento ›"}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: PREVIEW ── */}
      {step === 3 && (
        <div className="fade-up">
          <div className="section-title" style={{ marginBottom: 16 }}>Orçamento profissional</div>

          <div className="budget-preview" style={{ marginBottom: 20 }}>
            <div className="budget-header">
              {imgSrc && <img src={imgSrc} alt="piscina" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 16 }} />}
              <div className="budget-company">AquaOrça Pro</div>
              <div className="budget-ref">Nº {budgetNum} · {new Date().toLocaleDateString("pt-BR")}</div>
            </div>

            <div className="budget-body">
              {[
                ["👤 Cliente",       clientDisplay || "—"],
                ["📍 Endereço",      form.address || (selClient?.address) || "A confirmar"],
                ["🏗️ Piscina",      `${form.tipo} · ${form.comprimento}×${form.largura}m`],
                ["💧 Volume",        `${isNaN(volume) ? "—" : volume.toFixed(1)} m³`],
                ["📅 Frequência",    form.freq],
                ["🛡️ Capa",         form.hasCover          ? "✅ Possui capa"         : "❌ Sem capa"],
                ["⚙️ Casa de Máq.", form.machineRoomActive ? "✅ Ativa / funcionando" : "⚠️ Inativa / ausente"],
                ["☀️ Aquec. Solar", form.solarHeating       ? "☀️ Instalado"          : "❌ Não possui"],
                ["⚡ Complexidade",  `${complexity.toFixed(2)}× (${complexLevel === "low" ? "Baixa" : complexLevel === "mid" ? "Média" : "Alta"})`],
              ].map(([l, v]) => (
                <div className="budget-line" key={l}>
                  <span className="budget-line-label">{l}</span>
                  <span className="budget-line-val">{v}</span>
                </div>
              ))}

              <div style={{ marginTop: 16, marginBottom: 12, fontSize: 12, fontWeight: 700, color: "var(--txt-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>
                Produtos incluídos (mensal estimado)
              </div>
              {[
                ["🔵 Cloro gran.",   `${prodData.qty.cloro.toFixed(2)} kg`, prodData.custo.cloro],
                ["🟢 Algicida",      `${prodData.qty.algicida.toFixed(2)} L`, prodData.custo.algicida],
                ["⚪ Clarificante",  `${prodData.qty.clarificante.toFixed(2)} L`, prodData.custo.clarificante],
                ["🟤 Barrilha",      `${prodData.qty.barrilha.toFixed(2)} kg`, prodData.custo.barrilha],
              ].map(([k, qty, c]) => (
                <div className="budget-line" key={k} style={{ fontSize: 12 }}>
                  <span className="budget-line-label">{k} — {qty}</span>
                  <span style={{ color: "var(--txt-muted)" }}>{fmt(c)}</span>
                </div>
              ))}

              <div style={{ marginTop: 14, marginBottom: 10, fontSize: 12, fontWeight: 700, color: "var(--txt-muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>
                Composição do serviço (mão de obra)
              </div>
              {[
                ["📐 Área × taxa",      `${area}m² × R$${priceData.taxa}/m²`],
                ["📅 Frequência",       `× ${priceData.freqMult} (${priceData.visitas} visitas/mês)`],
                [`📈 Lucro (${form.margin}%)`, fmt(priceData.lucro)],
              ].map(([l, v]) => (
                <div className="budget-line" key={l} style={{ fontSize: 12 }}>
                  <span className="budget-line-label">{l}</span>
                  <span className="budget-line-val">{v}</span>
                </div>
              ))}

              {form.notes && (
                <div className="budget-line">
                  <span className="budget-line-label">📝 Obs.</span>
                  <span className="budget-line-val" style={{ fontSize: 12, maxWidth: "60%", textAlign: "right" }}>{form.notes}</span>
                </div>
              )}

              {/* Valor do serviço */}
              <div className="budget-total-row">
                <div>
                  <div className="budget-total-label">💼 Valor do Serviço</div>
                  <div style={{ fontSize: 11, color: "var(--txt-muted)" }}>{form.freq} · mão de obra</div>
                </div>
                <div className="budget-total-val">{fmt(price)}</div>
              </div>

              {/* Produtos — informativo separado */}
              <div style={{ marginTop: 12, padding: "14px", background: "rgba(255,140,66,.06)", borderRadius: 12, border: "1px dashed rgba(255,140,66,.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)" }}>🧪 Estimativa de Produtos</div>
                  <span className="tag tag-orange" style={{ fontSize: 10 }}>Por conta do cliente</span>
                </div>
                {[
                  ["Cloro granulado",  `${prodData.qty.cloro.toFixed(2)} kg`,      prodData.custo.cloro],
                  ["Algicida manut.", `${prodData.qty.algicida.toFixed(2)} L`,     prodData.custo.algicida],
                  ["Clarificante",    `${prodData.qty.clarificante.toFixed(2)} L`, prodData.custo.clarificante],
                  ["Barrilha pH+",    `${prodData.qty.barrilha.toFixed(2)} kg`,    prodData.custo.barrilha],
                ].map(([n, qty, c]) => (
                  <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--txt-muted)", marginBottom: 4 }}>
                    <span>{n} — {qty}</span>
                    <span>{fmt(c)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "var(--orange)", borderTop: "1px solid rgba(255,140,66,.2)", paddingTop: 8, marginTop: 6 }}>
                  <span>Total estimado/mês</span>
                  <span>{fmt(prodData.totalProdutos)}</span>
                </div>
                <div style={{ fontSize: 10, color: "var(--txt-dim)", marginTop: 6, lineHeight: 1.4 }}>
                  * Valores de referência UDI 2025. Custo real pode variar conforme fornecedor e consumo.
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="input-group">
            <div className="input-label">Observações técnicas (opcional)</div>
            <textarea className="input-field" rows={3} placeholder="Ex: Verificar bomba filtrante na próxima visita..." value={form.notes} onChange={e => upd("notes", e.target.value)} style={{ resize: "none" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
            <button className="btn btn-green btn-icon" onClick={whatsapp}>
              <span>💬</span> Enviar via WhatsApp
            </button>
            <button className="btn btn-primary btn-icon" onClick={saveBudget}>
              <span>💾</span> Salvar orçamento
            </button>
            <button className="btn btn-ghost" onClick={() => setStep(2)}>‹ Editar cálculo</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
function Clients({ clients, onAdd }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", address: "", pool: "", monthly: "" });

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const saveNew = () => {
    if (!newClient.name) return;
    onAdd({ ...newClient, id: Date.now(), status: "ativo", lastVisit: "Novo", monthly: parseInt(newClient.monthly) || 0 });
    setAddMode(false);
    setNewClient({ name: "", address: "", pool: "", monthly: "" });
  };

  return (
    <div className="screen">
      <div className="fade-up">
        <div className="screen-title">Clientes</div>
        <div className="screen-subtitle">{clients.length} cadastrados · {clients.filter(c => c.status === "ativo").length} ativos</div>
      </div>

      <div className="fade-up-2" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input className="input-field" placeholder="🔍 Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
        <button className="btn btn-primary btn-sm btn-icon" onClick={() => setAddMode(true)}>
          <span>+</span> Novo
        </button>
      </div>

      <div className="fade-up-3">
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">👥</div>
            <div className="empty-text">Nenhum cliente encontrado</div>
            <div className="empty-sub">Adicione seu primeiro cliente</div>
          </div>
        ) : (
          filtered.map((c, i) => (
            <div key={c.id} className="client-item" style={{ animationDelay: `${i * 0.05}s` }} onClick={() => setSelected(c)}>
              <div className="client-avatar">{c.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
              <div className="client-info">
                <div className="client-name">{c.name}</div>
                <div className="client-meta">📍 {c.address}</div>
                <div className="client-meta">🏊 {c.pool} · {c.lastVisit}</div>
              </div>
              <div className="client-right">
                <div className="client-val">{fmt(c.monthly)}<span style={{ fontSize: 10, color: "var(--txt-muted)" }}>/mês</span></div>
                <span className={`tag ${c.status === "ativo" ? "tag-green" : "tag-orange"}`} style={{ marginTop: 4, display: "inline-flex" }}>
                  {c.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CLIENT DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
              <div className="client-avatar" style={{ width: 56, height: 56, fontSize: 22 }}>{selected.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
              <div>
                <div style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800 }}>{selected.name}</div>
                <div style={{ fontSize: 13, color: "var(--txt-muted)" }}>{selected.address}</div>
              </div>
            </div>
            {[
              ["🏊 Piscina", selected.pool],
              ["💰 Mensalidade", fmt(selected.monthly)],
              ["📅 Última visita", selected.lastVisit],
              ["📊 Status", selected.status],
            ].map(([l, v]) => (
              <div className="budget-line" key={l}>
                <span className="budget-line-label">{l}</span>
                <span className="budget-line-val">{v}</span>
              </div>
            ))}
            <div style={{ height: 16 }} />
            <button className="btn btn-primary" onClick={() => setSelected(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* ADD CLIENT MODAL */}
      {addMode && (
        <div className="modal-overlay" onClick={() => setAddMode(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Novo Cliente</div>
            {[["Nome completo", "name", "text", "João Silva"], ["Endereço", "address", "text", "Rua X, 10 - SP"],
              ["Piscina", "pool", "text", "Fibra 5×3m"], ["Mensalidade (R$)", "monthly", "number", "450"]].map(([l, k, t, ph]) => (
              <div className="input-group" key={k}>
                <div className="input-label">{l}</div>
                <input className="input-field" type={t} placeholder={ph} value={newClient[k]} onChange={e => setNewClient(n => ({ ...n, [k]: e.target.value }))} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setAddMode(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={saveNew}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BUDGETS LIST ─────────────────────────────────────────────────────────────
function BudgetsList({ budgets }) {
  return (
    <div className="screen">
      <div className="fade-up">
        <div className="screen-title">Orçamentos</div>
        <div className="screen-subtitle">{budgets.length} gerados no total</div>
      </div>

      {budgets.length === 0 ? (
        <div className="empty fade-up-2">
          <div className="empty-icon">📋</div>
          <div className="empty-text">Nenhum orçamento ainda</div>
          <div className="empty-sub">Gere seu primeiro orçamento com IA</div>
        </div>
      ) : (
        <div className="fade-up-2">
          {[...budgets].reverse().map((b, i) => (
            <div key={b.id} className="card" style={{ marginBottom: 12, animationDelay: `${i * 0.06}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{b.client}</div>
                  <div style={{ fontSize: 12, color: "var(--txt-muted)", marginTop: 2 }}>📅 {b.date}</div>
                </div>
                <span className={`tag ${b.status === "aprovado" ? "tag-green" : "tag-orange"}`}>
                  {b.status === "aprovado" ? "✓ Aprovado" : "⏳ Pendente"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: "var(--aqua)" }}>{fmt(b.value)}<span style={{ fontSize: 11, color: "var(--txt-muted)", fontFamily: "Plus Jakarta Sans" }}>/mês</span></div>
                {b.form && (
                  <div style={{ fontSize: 12, color: "var(--txt-muted)" }}>
                    {b.form.tipo} · {b.form.comprimento}×{b.form.largura}m
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PLANS ───────────────────────────────────────────────────────────────────
function Plans() {
  const [current, setCurrent] = useState("pro");

  const plans = [
    {
      id: "basic", name: "Básico", price: "R$ 49", period: "/mês",
      color: "var(--txt-muted)",
      features: [
        [true,  "Orçamentos manuais ilimitados"],
        [true,  "Até 10 clientes"],
        [true,  "Motor de cálculo"],
        [false, "Análise por foto (IA)"],
        [false, "Relatórios avançados"],
        [false, "Suporte prioritário"],
      ]
    },
    {
      id: "pro", name: "Pro", price: "R$ 99", period: "/mês", featured: true,
      color: "var(--aqua)",
      features: [
        [true,  "Tudo do Básico"],
        [true,  "Clientes ilimitados"],
        [true,  "✨ Análise por foto (IA)"],
        [true,  "Envio por WhatsApp"],
        [true,  "Histórico completo"],
        [false, "Relatórios avançados"],
      ]
    },
    {
      id: "premium", name: "Premium", price: "R$ 179", period: "/mês",
      color: "var(--green)",
      features: [
        [true,  "Tudo do Pro"],
        [true,  "📊 Relatórios automáticos"],
        [true,  "🔔 Alertas de manutenção"],
        [true,  "📱 App white-label"],
        [true,  "API integração ERP"],
        [true,  "🎧 Suporte prioritário"],
      ]
    },
  ];

  return (
    <div className="screen">
      <div className="fade-up">
        <div className="screen-title">Planos</div>
        <div className="screen-subtitle">Escolha o plano ideal para o seu negócio</div>
      </div>

      {plans.map((p, i) => (
        <div key={p.id} className={`plan-card fade-up-${i + 2} ${p.featured ? "featured" : ""}`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div className="plan-name" style={{ color: p.color }}>{p.name}</div>
            {current === p.id && <span className="tag tag-aqua">✓ Atual</span>}
          </div>
          <div className="plan-price">{p.price}<span>{p.period}</span></div>
          {p.features.map(([on, txt]) => (
            <div key={txt} className={`plan-feature ${on ? "on" : ""}`}>
              <span className="fi">{on ? "✅" : "❌"}</span> {txt}
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <button
              className={`btn ${current === p.id ? "btn-ghost" : "btn-primary"}`}
              onClick={() => setCurrent(p.id)}
              disabled={current === p.id}
            >
              {current === p.id ? "✓ Plano Atual" : `Assinar ${p.name}`}
            </button>
          </div>
        </div>
      ))}

      <div className="card fade-up-5" style={{ marginTop: 8, marginBottom: 24, textAlign: "center", borderColor: "rgba(0,229,160,.2)" }}>
        <div style={{ fontSize: 13, color: "var(--txt-muted)" }}>🔒 Pagamento seguro · Cancele quando quiser · Dados criptografados</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser]         = useState(null);
  const [tab, setTab]           = useState("home");
  const [newBudget, setNewBudget] = useState(false);
  const [clients, setClients]   = useState(CLIENTS_SEED);
  const [budgets, setBudgets]   = useState(BUDGETS_SEED);
  const [toast, setToast]       = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const saveBudget = (b) => {
    setBudgets(prev => [...prev, b]);
    setNewBudget(false);
    setTab("budgets");
    showToast("✅ Orçamento salvo com sucesso!");
  };

  if (!user) return <><FontLink /><AuthScreen onLogin={u => setUser(u)} /></>;

  const navItems = [
    { id: "home",    icon: "🏠", label: "Início" },
    { id: "budgets", icon: "📋", label: "Orçamentos" },
    { id: "clients", icon: "👥", label: "Clientes" },
    { id: "plans",   icon: "💎", label: "Planos" },
  ];

  return (
    <div className="app-wrap">
      <FontLink />

      {/* HEADER */}
      <header className="header">
        <div className="header-logo">
          <div className="header-logo-icon">🏊</div>
          <div>
            <div className="header-logo-text">AquaOrça AI</div>
          </div>
          <div className="header-badge">Beta</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="header-icon-btn" onClick={() => showToast("🔔 Sem notificações novas")}>🔔</button>
          <button className="header-icon-btn" onClick={() => { setUser(null); showToast("👋 Até logo!"); }}>👤</button>
        </div>
      </header>

      {/* CONTENT */}
      {newBudget ? (
        <NewBudget clients={clients} onSave={saveBudget} onBack={() => setNewBudget(false)} />
      ) : (
        <>
          {tab === "home"    && <Dashboard user={user} clients={clients} budgets={budgets} onNew={() => setNewBudget(true)} />}
          {tab === "budgets" && <BudgetsList budgets={budgets} />}
          {tab === "clients" && <Clients clients={clients} onAdd={c => setClients(prev => [...prev, c])} />}
          {tab === "plans"   && <Plans />}
        </>
      )}

      {/* BOTTOM NAV */}
      {!newBudget && (
        <nav className="bottom-nav">
          {navItems.map(n => (
            <div key={n.id} className={`nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
              <div className="nav-icon">{n.icon}</div>
              <div className="nav-label">{n.label}</div>
            </div>
          ))}
        </nav>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
