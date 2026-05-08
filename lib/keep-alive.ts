// Keep-alive mechanism to prevent Neon DB from going idle
// Neon auto-suspends after 5 minutes of inactivity
// This hook pings the database every 4 minutes to keep it alive

export function initDbKeepAlive() {
  if (typeof window === 'undefined') return // Only run on client
  
  const KEEP_ALIVE_INTERVAL = 4 * 60 * 1000 // 4 minutes
  
  const pingDatabase = async () => {
    try {
      await fetch('/api/health')
    } catch (error) {
      console.warn('Database keep-alive ping failed:', error)
    }
  }
  
  // Initial ping after 1 minute
  setTimeout(() => {
    pingDatabase()
    // Then set up interval
    setInterval(pingDatabase, KEEP_ALIVE_INTERVAL)
  }, 60_000)
}
