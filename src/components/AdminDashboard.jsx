import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Pencil, Plus, Trash2, ExternalLink, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import ContentForm from './ContentForm.jsx'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { content, addContent, updateContent, deleteContent } = useContent()

  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const sorted = [...content].sort((a, b) => b.createdAt - a.createdAt)

  function handleLogout() {
    logout()
    navigate('/')
  }

  function openCreate() {
    setEditingItem(null)
    setFormOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormOpen(true)
  }

  function handleSave(formData) {
    if (editingItem) {
      updateContent(editingItem.id, formData)
    } else {
      addContent(formData)
    }
    setFormOpen(false)
    setEditingItem(null)
  }

  function handleDelete(item) {
    const confirmed = window.confirm(`Eliminare definitivamente "${item.title}"?`)
    if (confirmed) deleteContent(item.id)
  }

  return (
    <div className="min-h-screen bg-base-bg">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-primary">
              Pannello Admin
            </p>
            <p className="text-[12px] text-secondary">
              {content.length} contenuti pubblicati
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={14} /> Vedi sito
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-secondary transition-colors hover:text-primary"
            >
              <LogOut size={14} /> Esci
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">I tuoi contenuti</h1>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-soft"
          >
            <Plus size={15} /> Nuovo contenuto
          </button>
        </div>

        {sorted.length === 0 ? (
          <div className="glass rounded-2xl px-6 py-16 text-center">
            <p className="text-[14px] text-secondary">
              Non hai ancora creato nulla. Inizia con "Nuovo contenuto".
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-white/[0.14]"
              >
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                  {item.image && (
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">
                      {item.category}
                    </span>
                  </div>
                  <p className="truncate text-[14px] font-medium text-primary">
                    {item.title}
                  </p>
                </div>

                <div className="flex flex-shrink-0 items-center gap-1.5">
                  <Link
                    to={`/content/${item.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-secondary transition-colors hover:text-primary"
                    title="Visualizza"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <button
                    onClick={() => openEdit(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-secondary transition-colors hover:text-primary"
                    title="Modifica"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-secondary transition-colors hover:text-red-400"
                    title="Elimina"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <ContentForm
          initialData={editingItem}
          onSave={handleSave}
          onClose={() => {
            setFormOpen(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}
