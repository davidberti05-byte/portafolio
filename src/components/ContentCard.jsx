import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, FileText } from 'lucide-react'

const CATEGORY_TINT = {
  Progetto: 'from-accent/25',
  Tip: 'from-fuchsia-500/20',
  Guida: 'from-teal-400/20',
  Descrizione: 'from-white/10',
}

export default function ContentCard({ item }) {
  const tint = CATEGORY_TINT[item.category] || 'from-white/10'

  return (
    <Link
      to={`/content/${item.id}`}
      className="group relative flex h-72 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-glass transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16]"
    >
      {/* Immagine o sfondo sfumato di fallback */}
      <div className="absolute inset-0">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${tint} to-transparent`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </div>

      {/* Icona angolo */}
      <div className="relative z-10 flex justify-end p-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          <ArrowUpRight size={14} className="text-primary" />
        </span>
      </div>

      {/* Pannello vetro inferiore */}
      <div className="relative z-10 mt-auto border-t border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl glass-edge">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">
            {item.category}
          </span>
          {item.code ? (
            <Code2 size={13} className="text-secondary" />
          ) : (
            <FileText size={13} className="text-secondary" />
          )}
        </div>
        <h3 className="mb-1 line-clamp-1 text-[15px] font-semibold text-primary">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-secondary">
          {item.description}
        </p>
      </div>
    </Link>
  )
}
