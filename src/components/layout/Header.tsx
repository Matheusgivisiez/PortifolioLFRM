import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { navItems, profile } from '../../data/profile'
import { easeSignature } from '../../lib/motion'
import { usePageTone } from '../../lib/pageTone'
import { useActiveSection } from '../../lib/useActiveSection'
import { Logo } from '../ui/Logo'
import { SectionLink } from '../ui/SectionLink'

const ids = navItems.filter((n) => !n.route).map((n) => n.id)
const none: string[] = []

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const { pathname } = useLocation()
  const pageTone = usePageTone()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(pathname === '/' ? ids : none)
  const isActive = (item: (typeof navItems)[number]) =>
    item.route ? pathname === item.route : pathname === '/' && active === item.id

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 420 && !open)
  })

  // fecha o menu ao trocar de página
  useEffect(() => setOpen(false), [pathname])

  // trava a rolagem e fecha com Esc quando o menu mobile está aberto
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // sobre o topo colorido da página: texto claro (ou escuro, no coral)
  const onTone = !scrolled && !open && pageTone !== 'paper'
  const light = open || (onTone && pageTone !== 'coral')
  const fg = light ? 'text-paper' : 'text-ink'
  const bar = light ? 'bg-paper' : 'bg-ink'
  const cta = light ? 'bg-paper text-ink hover:bg-coral' : 'bg-ink text-paper hover:bg-violet'

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: easeSignature }}
      >
        <div
          className={`border-b transition-[background-color,border-color] duration-500 ${
            scrolled && !open ? 'border-line bg-paper/90 backdrop-blur-md' : 'border-transparent'
          }`}
        >
          <nav
            aria-label="Principal"
            className={`shell flex h-16 items-center justify-between transition-colors duration-300 md:h-20 ${fg}`}
          >
            <Link to="/" aria-label={`${profile.name} — início`} className="relative z-10">
              <Logo tone={light ? 'paper' : 'ink'} className="transition-colors duration-300" />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    section={item.id}
                    route={item.route}
                    aria-current={isActive(item) ? 'true' : undefined}
                    className="group relative block px-4 py-2 text-[0.95rem] font-medium"
                  >
                    {item.route && <span aria-hidden className="mr-1.5 inline-block size-1.5 -translate-y-0.5 rounded-full bg-coral" />}
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-4 bottom-1 h-[2px] origin-left transition-transform duration-500 ease-(--ease-signature) ${
                        light ? 'bg-coral' : onTone ? 'bg-ink' : 'bg-violet'
                      } ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    />
                  </SectionLink>
                </li>
              ))}
            </ul>

            <SectionLink
              section="contato"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 md:inline-flex ${cta}`}
            >
              <span aria-hidden className={`size-2 rounded-full ${pageTone === 'coral' && onTone ? 'bg-paper' : 'bg-coral'}`} />
              Vamos conversar
            </SectionLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="relative z-10 -mr-2 grid size-12 place-items-center md:hidden"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-[2px] w-full transition-all duration-500 ease-(--ease-signature) ${bar} ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] transition-all duration-500 ease-(--ease-signature) ${bar} ${
                    open ? 'top-[5px] w-full -rotate-45' : 'top-[10px] w-4/6'
                  }`}
                />
              </span>
            </button>
          </nav>
        </div>
        <motion.div aria-hidden className="h-[3px] origin-left bg-coral" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="on-dark fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: easeSignature }}
          >
            <nav aria-label="Menu mobile" className="shell flex flex-1 flex-col justify-center pt-16">
              <ul className="space-y-2">
                {navItems.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: easeSignature }}
                    >
                      <SectionLink
                        section={item.id}
                        route={item.route}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-1 font-display text-[clamp(1.9rem,9vw,3.5rem)] uppercase leading-none"
                      >
                        <span className="font-sans text-sm font-semibold text-coral">0{i + 2}</span>
                        {item.label}
                      </SectionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="shell flex items-end justify-between pb-8 text-sm text-paper/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45 } }}
            >
              <span>{profile.concept}</span>
              <span aria-hidden className="size-10 rounded-full bg-violet" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
