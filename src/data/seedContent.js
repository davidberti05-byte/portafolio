// Contenuti di esempio mostrati al primo avvio.
// Una volta che entri nell'Admin Panel e salvi qualcosa,
// questi dati vengono sostituiti da ciò che salvi tu (persistito in localStorage).

export const SEED_CONTENT = [
  {
    id: 'seed-1',
    title: 'Dashboard Analytics in tempo reale',
    category: 'Progetto',
    description:
      "Una dashboard per il monitoraggio di metriche di prodotto in tempo reale, costruita con React e websocket. Include grafici interattivi, filtri temporali e un sistema di alert configurabile per soglie personalizzate.",
    codeLanguage: 'javascript',
    code: `function useRealtimeMetric(channel) {
  const [value, setValue] = useState(null)

  useEffect(() => {
    const socket = new WebSocket(channel)
    socket.onmessage = (e) => setValue(JSON.parse(e.data))
    return () => socket.close()
  }, [channel])

  return value
}`,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: 'seed-2',
    title: 'Debounce vs Throttle: quando usarli',
    category: 'Tip',
    description:
      "Due tecniche spesso confuse tra loro. Il debounce ritarda l'esecuzione finché gli eventi non smettono di arrivare (utile per campi di ricerca); il throttle limita l'esecuzione a intervalli fissi (utile per eventi di scroll o resize).",
    codeLanguage: 'javascript',
    code: `function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}`,
    image:
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'seed-3',
    title: 'Guida: autenticazione JWT con refresh token',
    category: 'Guida',
    description:
      "Come strutturare un sistema di autenticazione sicuro con access token a vita breve e refresh token httpOnly. Copre rotazione dei token, revoca e gestione della scadenza lato client.",
    codeLanguage: 'javascript',
    code: `app.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.sendStatus(401)

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = signAccessToken(user)
    res.json({ accessToken })
  })
})`,
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: 'seed-4',
    title: 'Chi sono',
    category: 'Descrizione',
    description:
      "Sviluppatore full-stack con qualche anno di esperienza tra frontend e backend. Mi interessano le interfacce curate, le architetture pulite e tutto ciò che si trova all'incrocio tra design e ingegneria.",
    codeLanguage: '',
    code: '',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
]
