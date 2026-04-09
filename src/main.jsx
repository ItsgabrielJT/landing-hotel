import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

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

    // Sincronizacion directa sin lag extra
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    // Evitar acumulacion de lags en gsap ticker por renders
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroller>
      <App />
    </SmoothScroller>
  </StrictMode>,
)
