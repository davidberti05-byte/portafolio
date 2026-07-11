import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useContent } from '../context/ContentContext.jsx'

export default function ContentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getContentById } = useContent()
  const item = getContentById(id)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  if (!item) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-xl">
        <div className="glass w-full max-w-md rounded-2xl p-8 text-center">
          <p className="mb-5 text-[15px] text-secondary">
            Questo contenuto non esiste o è stato rimosso.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-white/[0.1]"
          >
            <ArrowLeft size={14} /> Torna alla home
          </Link>
        </div>
      </div>
    )
  }

  function handleCopy() {
    navigator.clipboard.writeText(item.code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} /> Torna alla home
        </button>

        <div className="animate-scaleIn overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-glass">
          {item.image && (
            <div className="max-h-96 w-full overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full object-cover" />
            </div>
          )}

          <div className="p-7 sm:p-10">
            <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-secondary">
              {item.category}
            </span>

            <h1 className="mb-5 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              {item.title}
            </h1>

            {item.description && (
              <p className="mb-8 whitespace-pre-line text-[15px] leading-relaxed text-secondary">
                {item.description}
              </p>
            )}

            {item.code && (
              <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-secondary">
                    {item.codeLanguage || 'codice'}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[12px] text-secondary transition-colors hover:text-primary"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copiato' : 'Copia'}
                  </button>
                </div>
                <SyntaxHighlighter
                  language={item.codeLanguage || 'javascript'}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    background: 'rgba(0,0,0,0.4)',
                    padding: '1.25rem',
                    fontSize: '13px',
                  }}
                  wrapLongLines
                >
                  {item.code}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
