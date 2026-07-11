import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '../config/siteConfig.js'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-70"
        >
          {SITE_CONFIG.name}
        </Link>

        <nav className="flex items-center gap-5">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-secondary transition-colors hover:text-primary"
          >
            <Github size={17} strokeWidth={1.75} />
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-secondary transition-colors hover:text-primary"
          >
            <Linkedin size={17} strokeWidth={1.75} />
          </a>
          <a
            href={SITE_CONFIG.social.email}
            aria-label="Email"
            className="text-secondary transition-colors hover:text-primary"
          >
            <Mail size={17} strokeWidth={1.75} />
          </a>
        </nav>
      </div>
    </header>
  )
}
