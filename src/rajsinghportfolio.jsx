import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import rajPhoto from "./raj_image.jpg";

// Certificate images
import csharpCertImage from "./csharp_certificate.jpeg";
import blockchainCertImage from "./image.png";
import javaCertImage from "./java_certificate.jpg";
import aiCertImage from "./ai.png";
import automationEdgeCert from "./Certificate_Raj_Singh_Automation_Edge_Foundation.png"; // PDF for experience section

// Tech icons (react-icons)
import { FaJava, FaPython, FaGitAlt, FaPhp } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJavascript,
  SiHtml5,
  //SiCss3,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSelenium,
} from "react-icons/si";
import { TbStack2 } from "react-icons/tb";
import { VscTerminalBash } from "react-icons/vsc";

// ========== STYLES (unchanged) ==========
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@400;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .rbs-portfolio {
    font-family: 'DM Mono', monospace;
    background: #0a0a0f;
    color: #e8e6e0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .rbs-grid-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(99,240,180,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,240,180,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .rbs-content { position: relative; z-index: 1; }

  .rbs-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    border-bottom: 1px solid rgba(99,240,180,0.12);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,10,15,0.88);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .rbs-nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #63f0b4;
    letter-spacing: -0.02em;
  }

  .rbs-nav-links { 
    display: flex; 
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .rbs-nav-links a {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232,230,224,0.5);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Mono', monospace;
  }

  .rbs-nav-links a:hover { color: #63f0b4; }

  .rbs-hero {
    padding: 7rem 3rem 5rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .rbs-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #63f0b4;
    margin-bottom: 1.5rem;
  }

  .rbs-hero-tag::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #63f0b4;
    animation: rbs-blink 1.5s ease-in-out infinite;
  }

  @keyframes rbs-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .rbs-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 7vw, 6rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #e8e6e0;
    margin-bottom: 0.5rem;
  }

  .rbs-name-font {
    font-family: 'Playfair Display', serif;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .rbs-hero h1 .rbs-accent { color: #63f0b4; }

  .rbs-hero-sub {
    font-size: 13px;
    color: rgba(232,230,224,0.45);
    letter-spacing: 0.04em;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    max-width: 520px;
    line-height: 1.9;
  }

  .rbs-hero-links { display: flex; gap: 1rem; flex-wrap: wrap; }

  .rbs-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.6rem 1.4rem;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid rgba(99,240,180,0.4);
    background: transparent;
    color: #63f0b4;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    border-radius: 2px;
  }

  .rbs-btn:hover {
    background: rgba(99,240,180,0.08);
    border-color: #63f0b4;
  }

  .rbs-btn.rbs-fill {
    background: #63f0b4;
    color: #0a0a0f;
    border-color: #63f0b4;
  }

  .rbs-btn.rbs-fill:hover { background: #4ed49e; }

  .rbs-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 3rem;
    border-top: 1px solid rgba(99,240,180,0.08);
  }

  .rbs-section-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(99,240,180,0.6);
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rbs-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(99,240,180,0.2), transparent);
  }

  .rbs-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .rbs-skill-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(99,240,180,0.15);
    padding: 0.6rem 1rem;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: rgba(232,230,224,0.7);
    border-radius: 2px;
    transition: all 0.2s;
    font-family: 'DM Mono', monospace;
  }

  .rbs-skill-pill:hover {
    border-color: rgba(99,240,180,0.5);
    color: #63f0b4;
    background: rgba(99,240,180,0.04);
  }

  .rbs-skill-icon {
    font-size: 18px;
    color: #63f0b4;
  }

  .rbs-exp-card {
    border: 1px solid rgba(99,240,180,0.12);
    padding: 2rem;
    border-radius: 4px;
    background: rgba(99,240,180,0.02);
    transition: border-color 0.2s;
  }

  .rbs-exp-card:hover { border-color: rgba(99,240,180,0.3); }

  .rbs-exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rbs-exp-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e8e6e0;
  }

  .rbs-exp-company {
    font-size: 12px;
    color: #63f0b4;
    margin-top: 3px;
    letter-spacing: 0.06em;
  }

  .rbs-exp-date {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: rgba(232,230,224,0.35);
    border: 1px solid rgba(99,240,180,0.15);
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .rbs-exp-list { list-style: none; margin-top: 1rem; }

  .rbs-exp-list li {
    font-size: 12px;
    color: rgba(232,230,224,0.6);
    line-height: 1.7;
    padding: 0.25rem 0;
    padding-left: 1.2rem;
    position: relative;
  }

  .rbs-exp-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #63f0b4;
    font-size: 10px;
  }

  .rbs-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .rbs-project-card {
    border: 1px solid rgba(99,240,180,0.12);
    padding: 1.75rem;
    border-radius: 4px;
    background: rgba(99,240,180,0.02);
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .rbs-project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: #63f0b4;
    transition: height 0.3s ease;
  }

  .rbs-project-card:hover { border-color: rgba(99,240,180,0.3); }
  .rbs-project-card:hover::before { height: 100%; }

  .rbs-project-thumb {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 1rem;
    border: 1px solid rgba(99,240,180,0.2);
    background: #111;
  }

  .rbs-project-num {
    font-size: 10px;
    letter-spacing: 0.15em;
    color: rgba(99,240,180,0.4);
    margin-bottom: 0.5rem;
  }

  .rbs-project-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #e8e6e0;
    margin-bottom: 0.3rem;
  }

  .rbs-project-arch {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(99,240,180,0.5);
    margin-bottom: 0.75rem;
  }

  .rbs-project-desc {
    font-size: 12px;
    color: rgba(232,230,224,0.5);
    line-height: 1.75;
    margin-bottom: 1rem;
    flex: 1;
  }

  .rbs-project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 1.25rem;
  }

  .rbs-tag {
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(99,240,180,0.7);
    border: 1px solid rgba(99,240,180,0.2);
    padding: 2px 8px;
    border-radius: 2px;
  }

  .rbs-project-links { display: flex; gap: 10px; flex-wrap: wrap; }

  .rbs-project-link {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(232,230,224,0.4);
    text-decoration: none;
    border: 1px solid rgba(232,230,224,0.12);
    padding: 4px 10px;
    border-radius: 2px;
    transition: all 0.2s;
  }

  .rbs-project-link:hover {
    color: #63f0b4;
    border-color: rgba(99,240,180,0.4);
  }

  .rbs-cert-list { display: flex; flex-direction: column; gap: 10px; }

  .rbs-cert-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(99,240,180,0.1);
    padding: 0.9rem 1.2rem;
    border-radius: 3px;
    transition: border-color 0.2s;
    cursor: pointer;
  }

  .rbs-cert-item:hover {
    border-color: rgba(99,240,180,0.3);
    background: rgba(99,240,180,0.03);
  }

  .rbs-cert-icon {
    width: 32px;
    height: 32px;
    background: rgba(99,240,180,0.08);
    border: 1px solid rgba(99,240,180,0.2);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #63f0b4;
    flex-shrink: 0;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
  }

  .rbs-cert-name {
    font-size: 13px;
    color: rgba(232,230,224,0.75);
  }

  .rbs-cert-org {
    font-size: 11px;
    color: rgba(99,240,180,0.5);
    margin-top: 2px;
  }

  .rbs-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10,10,15,0.95);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .rbs-modal {
    max-width: 95vw;
    max-height: 90vh;
    background: #0f0f15;
    border: 1px solid rgba(99,240,180,0.3);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 20px 35px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  .rbs-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(99,240,180,0.2);
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rbs-modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #63f0b4;
  }

  .rbs-modal-close {
    background: none;
    border: none;
    color: rgba(232,230,224,0.5);
    font-size: 24px;
    cursor: pointer;
    transition: color 0.2s;
    line-height: 1;
  }

  .rbs-modal-close:hover { color: #63f0b4; }

  .rbs-modal-image {
    max-width: 100%;
    max-height: 55vh;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid rgba(99,240,180,0.2);
  }

  .rbs-modal-buttons {
    display: flex;
    gap: 0.8rem;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .rbs-edu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .rbs-edu-card {
    border: 1px solid rgba(99,240,180,0.1);
    padding: 1.25rem 1.5rem;
    border-radius: 3px;
    background: rgba(99,240,180,0.015);
    transition: border-color 0.2s;
  }

  .rbs-edu-card:hover { border-color: rgba(99,240,180,0.3); }

  .rbs-edu-degree {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #e8e6e0;
    margin-bottom: 4px;
  }

  .rbs-edu-univ {
    font-size: 11px;
    color: rgba(99,240,180,0.6);
    margin-bottom: 6px;
  }

  .rbs-edu-meta {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rbs-edu-year {
    font-size: 11px;
    letter-spacing: 0.06em;
    color: rgba(232,230,224,0.35);
  }

  .rbs-edu-score {
    font-size: 11px;
    color: rgba(99,240,180,0.55);
  }

  .rbs-contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 600px;
    margin-top: 1rem;
  }

  .rbs-form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .rbs-form-group label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(99,240,180,0.6);
  }

  .rbs-form-group input,
  .rbs-form-group textarea {
    background: rgba(10,10,15,0.8);
    border: 1px solid rgba(99,240,180,0.2);
    padding: 0.75rem;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #e8e6e0;
    border-radius: 2px;
    transition: border-color 0.2s;
  }

  .rbs-form-group input:focus,
  .rbs-form-group textarea:focus {
    outline: none;
    border-color: #63f0b4;
  }

  .rbs-form-group textarea {
    resize: vertical;
    min-height: 100px;
  }

  .rbs-form-success {
    font-size: 12px;
    color: #63f0b4;
    margin-top: 0.5rem;
  }

  .rbs-footer {
    text-align: center;
    padding: 3rem;
    border-top: 1px solid rgba(99,240,180,0.08);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: rgba(232,230,224,0.2);
  }

  .rbs-footer span { color: rgba(99,240,180,0.4); }

  .rbs-hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .rbs-hero-text { flex: 1; min-width: 240px; }

  .rbs-photo-wrap {
    flex-shrink: 0;
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }

  .rbs-photo-wrap::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: conic-gradient(#63f0b4, transparent, #63f0b4);
    animation: rbs-spin 6s linear infinite;
  }

  @keyframes rbs-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .rbs-photo-wrap::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: #0a0a0f;
    z-index: 1;
  }

  .rbs-photo {
    position: absolute;
    inset: 5px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50% 15%;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    z-index: 2;
    filter: grayscale(15%);
  }

  @media (max-width: 768px) {
    .rbs-nav { padding: 1rem 1.5rem; flex-direction: column; text-align: center; }
    .rbs-nav-links { gap: 1rem; justify-content: center; }
    .rbs-nav-links a { font-size: 10px; }
    .rbs-hero { padding: 4rem 1.5rem 3rem; }
    .rbs-section { padding: 3rem 1.5rem; }
    .rbs-hero-inner { flex-direction: column-reverse; text-align: center; }
    .rbs-hero-sub { margin-left: auto; margin-right: auto; }
    .rbs-hero-links { justify-content: center; }
    .rbs-photo-wrap { width: 140px; height: 140px; margin-bottom: 1rem; }
    .rbs-projects-grid { grid-template-columns: 1fr; }
    .rbs-edu-grid { grid-template-columns: 1fr; }
    .rbs-skills-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  }

  @media (max-width: 640px) {
    .rbs-nav-links { gap: 0.8rem; }
    .rbs-nav-links a { font-size: 9px; }
    .rbs-hero h1 { font-size: clamp(2rem, 8vw, 3rem); line-height: 1.1; }
    .rbs-hero-tag { font-size: 10px; }
    .rbs-hero-sub { font-size: 12px; }
    .rbs-btn { padding: 0.5rem 1rem; font-size: 10px; }
    .rbs-section-label { font-size: 9px; margin-bottom: 1.5rem; }
    .rbs-exp-card { padding: 1.25rem; }
    .rbs-exp-title { font-size: 16px; }
    .rbs-project-card { padding: 1.25rem; }
    .rbs-cert-item { padding: 0.7rem 1rem; }
    .rbs-cert-name { font-size: 12px; }
    .rbs-modal { padding: 0.75rem; }
    .rbs-modal-buttons button { padding: 0.4rem 0.8rem; font-size: 9px; }
  }

  @media (max-width: 480px) {
    .rbs-nav { padding: 0.75rem 1rem; }
    .rbs-hero { padding: 2rem 1rem; }
    .rbs-section { padding: 2rem 1rem; }
    .rbs-skills-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .rbs-skill-pill { font-size: 10px; padding: 0.4rem 0.6rem; }
    .rbs-exp-list li { font-size: 11px; }
    .rbs-project-desc { font-size: 11px; }
    .rbs-photo-wrap { width: 120px; height: 120px; }
    .rbs-modal .rbs-btn { font-size: 9px; padding: 0.4rem 0.8rem; }
  }
`;

// ========== DATA ==========
const skillsWithIcons = [
  { name: "Core Java", icon: <FaJava /> },
  { name: "React.js", icon: <SiReact /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Express.js", icon: <SiExpress /> },
  { name: "Python", icon: <FaPython /> },
  { name: "HTML / CSS", icon: <SiHtml5 /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Git / GitHub", icon: <FaGitAlt /> },
  { name: "Java Selenium", icon: <SiSelenium /> },
  { name: "REST APIs", icon: <VscTerminalBash /> },
  { name: "MERN Stack", icon: <TbStack2 /> },
  { name: "PHP", icon: <FaPhp /> },
  { name: "Agile / SDLC", icon: <VscTerminalBash /> },
];

const experience = {
  title: "Software Trainee",
  company: "LA Esfera Multiservices LLP",
  date: "Dec 2025 – Mar 2026",
  points: [
    "Designed and implemented workflow automation solutions using AutomationEdge (Process Studio)",
    "Developed automation scripts using Java Selenium for testing web-based applications",
    "Contributed to AI products — Voice Transcription & Speech-to-Text systems using OLLAMA models",
    "Built Python backend services for transcription processing and REST APIs",
    "Developed responsive frontend components using React.js",
    "Managed and queried relational data using PostgreSQL",
    "Collaborated in an agile team to design, test, and deploy scalable applications",
  ],
};

const projects = [
  {
    num: "// 01",
    name: "QuickPick",
    arch: "MERN Stack · Full-Stack",
    desc: "A full-featured e-commerce platform built on the MERN stack. The React.js frontend handles dynamic product listings, cart state, and a responsive UI. The Node.js + Express.js backend exposes RESTful APIs for authentication (JWT), product CRUD, order management, and payment processing. MongoDB stores product, user, and order data. A separate admin panel enables inventory and order management.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST API"],
    github: "https://github.com/rajsingh18/QUICKPICK1",
    live: "https://quick-pick-h7ap.vercel.app/",
    image: "/quickpick.png",
  },
  {
    num: "// 02",
    name: "EatHub",
    arch: "Web App · Restaurant System",
    desc: "An online restaurant and table-booking system deployed on Netlify. The frontend uses HTML, CSS, and JavaScript to render menus, hero sliders, event sections, and a real-time reservation form with date/time/guest selectors. PHP handles backend booking logic and form processing. Supports both customer-facing reservations and operational management for restaurant owners.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Netlify"],
    github: "https://github.com/rajsingh18/eathub",
    live: "https://grand-unicorn-6563c9.netlify.app/",
    image: "/eathub-preview.png",
  },
];

const certifications = [
  { icon: "C#", name: "Foundational C# with Microsoft", org: "freeCodeCamp", image: csharpCertImage },
  { icon: "BC", name: "Blockchain & its Application", org: "NPTEL (SWAYAM) — 2025", image: blockchainCertImage },
  { icon: "JV", name: "Certificate of Excellence — Java Development", org: "QUASTECH — May–Oct 2024", image: javaCertImage },
  { icon: "AI", name: "AI for Future Workforce Program", org: "Intel & DELL Technologies", image: aiCertImage },
  // Automation Edge certificate removed from here - now in Experience section
];

const education = [
  { degree: "MCA", univ: "University of Mumbai", year: "2024–2026", score: "CGPI 8.74 · Pursuing" },
  { degree: "B.Sc. IT", univ: "University of Mumbai", year: "2021–2024", score: "CGPI 8.03" },
  { degree: "HSC (12th)", univ: "Maharashtra State Board", year: "2019–2021", score: "73.5%" },
  { degree: "SSC (10th)", univ: "ICSE Board", year: "2019", score: "72%" },
];

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Exp", id: "exp" },
  { label: "Projects", id: "projects" },
  { label: "Certs", id: "certs" },
  { label: "Contact", id: "contact" },
  { label: "Education", id: "edu" },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ========== MAIN COMPONENT ==========
export default function RajSinghPortfolio() {
  const styleRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!document.getElementById("rbs-portfolio-styles")) {
      const tag = document.createElement("style");
      tag.id = "rbs-portfolio-styles";
      tag.textContent = styles;
      document.head.appendChild(tag);
      styleRef.current = tag;
    }
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, []);

  const openModal = (cert) => {
    if (cert.image) {
      setSelectedCert(cert);
      setModalOpen(true);
    } else {
      alert(`Certificate image for "${cert.name}" is not yet available. Please add the image file.`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCert(null);
  };

  const downloadAsPDF = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedCert.name}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
            img { max-width: 100%; height: auto; box-shadow: 0 0 10px rgba(0,0,0,0.2); }
          </style>
        </head>
        <body>
          <img src="${selectedCert.image}" alt="${selectedCert.name}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadAsWord = () => {
    const htmlContent = `
      <html>
        <head>
          <title>${selectedCert.name}</title>
        </head>
        <body style="text-align: center; font-family: Arial, sans-serif;">
          <h1>${selectedCert.name}</h1>
          <p>${selectedCert.org}</p>
          <img src="${selectedCert.image}" style="max-width: 100%; height: auto;" />
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "application/msword" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${selectedCert.name.replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ========== UPDATED: Resume PDF now opens in a new tab ==========
  const handleDownloadResume = () => {
    window.open("/RAJ_BRIJESH_SINGH_Resume.pdf", "_blank");
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = "service_ajgncyb";
    const TEMPLATE_ID = "template_rnvhsyg";
    const PUBLIC_KEY = "HCs-JOblTrA_coczH";

    const now = new Date();
    const formattedTime = now.toLocaleString();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: formattedTime,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSent(false), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rbs-portfolio">
      <div className="rbs-grid-bg" />
      <div className="rbs-content">

        {/* NAVIGATION */}
        <nav className="rbs-nav">
          <div className="rbs-nav-logo">RBS/</div>
          <div className="rbs-nav-links">
            {navItems.map((item) => (
             <button 
             key={item.id} 
              onClick={() => scrollToSection(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
              >
                {item.label}
                </button>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <div className="rbs-hero">
          <div className="rbs-hero-inner">
            <div className="rbs-hero-text">
              <div className="rbs-hero-tag">Available for opportunities</div>
              <h1>
                <span className="rbs-name-font">
                  Raj Brijesh<br />
                  <span className="rbs-accent">Singh</span>
                </span>
              </h1>
              <p className="rbs-hero-sub">
                Full-Stack Developer &amp; Software Trainee — building scalable web
                applications with the MERN stack, workflow automation, and
                AI-powered systems.<br />
                Based in Kandivali, Mumbai · MCA (Pursuing)
              </p>
              <div className="rbs-hero-links">
                <a
                  className="rbs-btn rbs-fill"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=rajbrijeshsingh1804@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email me
                </a>
                <a
                  className="rbs-btn"
                  href="https://www.linkedin.com/in/raj-singh-603449223/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  className="rbs-btn"
                  href="https://github.com/rajsingh18"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
                <button className="rbs-btn" onClick={handleDownloadResume}>
                  Resume PDF ↗
                </button>
              </div>
            </div>
            <div className="rbs-photo-wrap">
              <img className="rbs-photo" src={rajPhoto} alt="Raj Brijesh Singh" />
            </div>
          </div>
        </div>

        {/* ABOUT ME */}
        <section id="about" className="rbs-section">
          <div className="rbs-section-label">About me</div>
          <div style={{ maxWidth: "800px", fontSize: "14px", lineHeight: "1.8", color: "rgba(232,230,224,0.7)" }}>
            <p>
              I'm a passionate Full-Stack Developer and MCA student at the University of Mumbai,
              driven by a love for building clean, efficient, and user‑centric digital experiences.
              My journey began with a curiosity for how things work under the hood — now I craft
              scalable web apps using the MERN stack, experiment with AI automation, and constantly
              explore new technologies.
            </p>
            <p style={{ marginTop: "1rem" }}>
              I'm actively seeking <strong>Full‑Stack Developer / Software Engineer</strong> roles
              where I can contribute to impactful projects, collaborate with agile teams, and
              continue growing as an engineer. When I'm not coding, you'll find me contributing to
              open source or learning about blockchain and AI.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="rbs-section">
          <div className="rbs-section-label">Technical skills</div>
          <div className="rbs-skills-grid">
            {skillsWithIcons.map((skill) => (
              <div key={skill.name} className="rbs-skill-pill">
                <span className="rbs-skill-icon">{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="exp" className="rbs-section">
          <div className="rbs-section-label">Work experience</div>
          <div className="rbs-exp-card">
            <div className="rbs-exp-header">
              <div>
                <div className="rbs-exp-title">{experience.title}</div>
                <div className="rbs-exp-company">{experience.company}</div>
              </div>
              <div className="rbs-exp-date">{experience.date}</div>
            </div>
            <ul className="rbs-exp-list">
              {experience.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            {/* Certificate button added inside experience card */}
            <div style={{ marginTop: "1.5rem" }}>
              <button
                className="rbs-btn"
                onClick={() => window.open(automationEdgeCert, '_blank')}
                style={{ fontSize: "10px", padding: "0.4rem 1rem" }}
              >
                📜 View Automation Edge Foundation Certificate ↗
              </button>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="rbs-section">
          <div className="rbs-section-label">Projects</div>
          <div className="rbs-projects-grid">
            {projects.map((proj) => (
              <div key={proj.name} className="rbs-project-card">
                {proj.image && (
                  <img src={proj.image} alt={`${proj.name} preview`} className="rbs-project-thumb" />
                )}
                <div className="rbs-project-num">{proj.num}</div>
                <div className="rbs-project-name">{proj.name}</div>
                <div className="rbs-project-arch">{proj.arch}</div>
                <p className="rbs-project-desc">{proj.desc}</p>
                <div className="rbs-project-tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="rbs-tag">{tag}</span>
                  ))}
                </div>
                <div className="rbs-project-links">
                  <a className="rbs-project-link" href={proj.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                  {proj.live && (
                    <a className="rbs-project-link" href={proj.live} target="_blank" rel="noreferrer">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="rbs-section">
          <div className="rbs-section-label">Certifications</div>
          <div className="rbs-cert-list">
            {certifications.map((cert) => (
              <div key={cert.name} className="rbs-cert-item" onClick={() => openModal(cert)}>
                <div className="rbs-cert-icon">{cert.icon}</div>
                <div>
                  <div className="rbs-cert-name">{cert.name}</div>
                  <div className="rbs-cert-org">{cert.org}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="rbs-section">
          <div className="rbs-section-label">Contact me</div>
          <form className="rbs-contact-form" onSubmit={handleContactSubmit}>
            <div className="rbs-form-group">
              <label>Your name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="rbs-form-group">
              <label>Email address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="rbs-form-group">
              <label>Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="rbs-btn rbs-fill" style={{ width: "fit-content" }} disabled={isSending}>
              {isSending ? "Sending..." : "Send message"}
            </button>
            {formSent && <div className="rbs-form-success">✓ Message sent successfully!</div>}
          </form>
        </section>

        {/* EDUCATION */}
        <section id="edu" className="rbs-section">
          <div className="rbs-section-label">Education</div>
          <div className="rbs-edu-grid">
            {education.map((edu) => (
              <div key={edu.degree} className="rbs-edu-card">
                <div className="rbs-edu-degree">{edu.degree}</div>
                <div className="rbs-edu-univ">{edu.univ}</div>
                <div className="rbs-edu-meta">
                  <span className="rbs-edu-year">{edu.year}</span>
                  <span className="rbs-edu-score">{edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="rbs-footer">
          © 2026 &nbsp;·&nbsp; <span>Raj Brijesh Singh</span> &nbsp;·&nbsp; Mumbai, India
        </footer>
      </div>

      {/* MODAL */}
      {modalOpen && selectedCert && (
        <div className="rbs-modal-overlay" onClick={closeModal}>
          <div className="rbs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rbs-modal-header">
              <span className="rbs-modal-title">{selectedCert.name}</span>
              <button className="rbs-modal-close" onClick={closeModal}>×</button>
            </div>
            <img src={selectedCert.image} alt={selectedCert.name} className="rbs-modal-image" />
            <div className="rbs-modal-buttons">
              <button className="rbs-btn" onClick={downloadAsPDF}>Download as PDF</button>
              <button className="rbs-btn" onClick={downloadAsWord}>Download as Word</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}