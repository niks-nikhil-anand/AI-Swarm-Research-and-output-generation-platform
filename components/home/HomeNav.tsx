"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "../swarm/ui";
import styles from "./home.module.css";

const navItems = [
  ["About", "#about"],
  ["How it works", "#how"],
  ["AI Nexus Chat", "#nexus"],
  ["Tech", "#tech"],
  ["Founder", "#founder"],
];

export function HomeNav() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.navWrap}>
      <nav className={styles.nav} aria-label="Homepage navigation">
        <Link href="/" className={styles.brand} aria-label="AI Swarm home" onClick={closeMenu}>
          <Image src="/logo/logo.png" alt="" width={30} height={30} className={styles.logoImage} priority />
          AI Swarm
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "x" : "menu"} size={17} />
        </button>

        <div className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}>
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <Link href="/new-swarm" className={styles.mobileLaunch} onClick={closeMenu}>Launch app</Link>
        </div>

        {open && <button type="button" className={styles.menuBackdrop} aria-label="Close menu" onClick={closeMenu} />}

        <Link href="/new-swarm" className={styles.githubLink}>Launch app</Link>
      </nav>
    </header>
  );
}
