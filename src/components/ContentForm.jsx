import React, { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../config/siteConfig.js'

const EMPTY_FORM = {
  title: '',
  category: CATEGORIES[0],
  description: '',
  codeLanguage: 'javascript',
  code: '',
  image: '',
}

export default function ContentForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, ...initialData }))
  const [titleError, setTitleError] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setTitleError(true)
      return
    }
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-xl">
      <div className="glass-strong w-full max-w-xl animate-scaleIn rounded-2xl p-6 shadow-glass sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">
            {initialData ? 'Modifica contenuto' : 'Nuovo contenuto'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-secondary transition-colors hover:text-primary"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-secondary">
              Titolo
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                update('title', e.target.value)
                if (titleError) setTitleError(false)
              }}
              placeholder="Es. Dashboard Analytics"
              className={`w-full rounded-xl border bg-white/[0.04] px-4 py-2.5 text-[14px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60 ${
                titleError ? 'border-red-400/60' : 'border-white/[0.08]'
              }`}
            />
            {titleError && (
              <p className="mt-1 text-[12px] text-red-400/90">Il titolo è obbligatorio.</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-secondary">
              Categoria
            </label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] text-primary outline-none transition-colors focus:border-accent/60"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#111113]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-secondary">
              Descrizione
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              placeholder="Descrivi il contenuto..."
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-secondary">
                Linguaggio codice
              </label>
              <input
                type="text"
                value={form.codeLanguage}
                onChange={(e) => update('codeLanguage', e.target.value)}
                placeholder="javascript, python, bash..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-secondary">
                URL immagine
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => update('image', e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-secondary">
              Blocco di codice (opzionale)
            </label>
            <textarea
              value={form.code}
              onChange={(e) => update('code', e.target.value)}
              rows={6}
              placeholder="Incolla qui il codice..."
              spellCheck={false}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/40 px-4 py-2.5 font-mono text-[13px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-soft"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
