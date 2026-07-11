import React, { useMemo, useState } from 'react'
import { useContent } from '../context/ContentContext.jsx'
import { CATEGORIES } from '../config/siteConfig.js'
import { SITE_CONFIG } from '../config/siteConfig.js'
import ContentCard from './ContentCard.jsx'

export default function Home() {
  const { content } = useContent()
  const [filter, setFilter] = useState('Tutti')

  const filters = ['Tutti', ...CATEGORIES]

  const filtered = useMemo(() => {
    const sorted = [...content].sort((a, b) => b.createdAt - a.createdAt)
    if (filter === 'Tutti') return sorted
    return sorted.filter((item) => item.category === filter)
  }, [content, filter])

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      {/* Hero minimale */}
      <section className="mb-14 animate-fadeIn">
        <h1 className="mb-3 text-[28px] font-semibold tracking-tight text-primary sm:text-4xl">
          {SITE_CONFIG.role}
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-secondary">
          {SITE_CONFIG.bio}
        </p>
      </section>

      {/* Filtri categoria */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all ${
              filter === f
                ? 'border-white/20 bg-white/[0.08] text-primary'
                : 'border-white/[0.06] bg-white/[0.02] text-secondary hover:border-white/[0.12] hover:text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Griglia dinamica */}
      {filtered.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center rounded-2xl px-6 py-20 text-center">
          <p className="text-[15px] text-secondary">
            Nessun contenuto in questa categoria, per ora.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  )
}
