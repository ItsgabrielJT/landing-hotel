import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import './index.css'
import App from './App.jsx'

function SmoothScroller({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update) // if ScrollTrigger is used later

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return children
}

// Temporary patch to quiet missing ScrollTrigger if not installed/registered
const ScrollTrigger = { update: () => {} };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroller>
      <App />
    </SmoothScroller>
  </StrictMode>,
)
