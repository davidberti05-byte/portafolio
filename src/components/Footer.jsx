import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE_CONFIG } from '../config/siteConfig.js'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6">
        <p className="select-none text-xs text-secondary">
          © {new Date().getFullYear()} {SITE_CONFIG.name}
          {/* Punto di accesso nascosto: doppio click per entrare nell'area admin. */}
          <span
            onDoubleClick={() => navigate('/admin')}
            className="mx-1.5 inline-block cursor-default text-white/10 hover:text-white/20"
            title=""
          >
            ·
          </span>
          Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}
