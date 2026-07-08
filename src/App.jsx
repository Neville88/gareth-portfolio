import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Navbar morphs from transparent to blurred surface once the hero is passed.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  const openModal = () => setModalOpen(true)

  return (
    <div className="relative min-h-screen bg-night text-light">
      <NoiseOverlay />
      <Navbar scrolled={scrolled} onOpenModal={openModal} />

      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <Philosophy />
        <Protocol />
        <GetStarted onOpenModal={openModal} />
      </main>

      <Footer />

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
