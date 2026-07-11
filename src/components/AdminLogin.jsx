import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const ok = login(password)
    if (ok) {
      navigate('/admin')
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 1600)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-bg px-6">
      <div className="w-full max-w-sm">
        <div
          className={`glass-strong rounded-2xl p-8 shadow-glass transition-transform ${
            error ? 'animate-[shake_0.3s_ease-in-out]' : ''
          }`}
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
              <Lock size={17} className="text-primary" />
            </div>
            <h1 className="text-lg font-semibold text-primary">Area riservata</h1>
            <p className="mt-1 text-[13px] text-secondary">
              Inserisci la password per accedere al pannello.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-primary placeholder:text-white/25 outline-none transition-colors focus:border-accent/60"
            />

            {error && (
              <p className="text-[13px] text-red-400/90">Password non corretta.</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-white/[0.1] py-3 text-[14px] font-medium text-primary transition-colors hover:bg-white/[0.15]"
            >
              Accedi
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-5 flex items-center justify-center gap-2 text-[13px] text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} /> Torna al sito
        </Link>
      </div>
    </div>
  )
}
