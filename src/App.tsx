import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { easeExit, easeSignature } from './lib/motion'
import { PageToneProvider } from './lib/pageTone'
import { ScrollManager, scrollToCurrentLocation } from './lib/ScrollManager'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { HallowpartyPage } from './pages/HallowpartyPage'

/** Transição entre páginas: cortina coral sobe e revela a nova página. */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.01 } }}
      exit={{ opacity: 1 }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-coral"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease: easeSignature, delay: 0.05 } }}
        exit={{ scaleY: 0 }}
        style={{ originY: 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] bg-coral"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.4, ease: easeExit } }}
        style={{ originY: 1 }}
      />
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user": respeita prefers-reduced-motion (remove deslocamentos, mantém opacidade)
    <MotionConfig reducedMotion="user">
      <PageToneProvider>
        <ScrollManager />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">
          <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToCurrentLocation}>
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/hallowparty" element={<HallowpartyPage />} />
                {/* Cases de projetos guardados para o futuro — reativar com:
                    <Route path="/projetos/:slug" element={<ProjectPage />} /> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </PageToneProvider>
    </MotionConfig>
  )
}
