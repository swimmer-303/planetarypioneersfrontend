'use client'

import { useEffect } from 'react'

export default function CopyProtection() {
  useEffect(() => {
    // Block keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+P, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || 
                      e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X' || 
                      e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || 
                      e.key === 'u' || e.key === 'U')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.key === 'F5') ||
        (e.ctrlKey && e.key === 'r')
      ) {
        e.preventDefault()
        e.stopPropagation()
        
        // Close tab for copy shortcuts
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
          window.close()
        }
        
        return false
      }
    }

    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Block text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Block drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Developer tools detection
    let devtools = { open: false, orientation: null }
    const threshold = 160

    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true
          // Refresh page when dev tools detected
          window.location.reload()
        }
      } else {
        devtools.open = false
      }
    }

    // Set up interval to check for dev tools
    const devToolsInterval = setInterval(detectDevTools, 500)

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('contextmenu', handleContextMenu, true)
    document.addEventListener('selectstart', handleSelectStart, true)
    document.addEventListener('dragstart', handleDragStart, true)

    // CSS to disable text selection
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      clearInterval(devToolsInterval)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('contextmenu', handleContextMenu, true)
      document.removeEventListener('selectstart', handleSelectStart, true)
      document.removeEventListener('dragstart', handleDragStart, true)
      document.head.removeChild(style)
    }
  }, [])

  return null
}
