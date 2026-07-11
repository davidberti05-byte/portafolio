import React, { createContext, useContext, useEffect, useState } from 'react'
import { SEED_CONTENT } from '../data/seedContent.js'

const STORAGE_KEY = 'portfolio_content_v1'
const ContentContext = createContext(null)

function loadInitialContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (err) {
    console.error('Impossibile leggere i contenuti salvati, uso i dati di esempio.', err)
  }
  return SEED_CONTENT
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadInitialContent)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch (err) {
      console.error('Impossibile salvare i contenuti in localStorage.', err)
    }
  }, [content])

  function addContent(item) {
    const newItem = {
      ...item,
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    }
    setContent((prev) => [newItem, ...prev])
    return newItem
  }

  function updateContent(id, updates) {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  function deleteContent(id) {
    setContent((prev) => prev.filter((item) => item.id !== id))
  }

  function getContentById(id) {
    return content.find((item) => item.id === id) || null
  }

  const value = { content, addContent, updateContent, deleteContent, getContentById }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent deve essere usato dentro ContentProvider')
  return ctx
}
