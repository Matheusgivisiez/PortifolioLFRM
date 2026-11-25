import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { FitLine, vhMax } from '../components/ui/FitLine'
import { PendingTag } from '../components/ui/PendingTag'
import { Reveal } from '../components/ui/Reveal'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Tape } from '../components/ui/Tape'
import { profile, type ContactChannel } from '../data/profile'
import { easeSignature, fadeUp, stagger, viewportOnce } from '../lib/motion'

const lineMax = vhMax(0.25)

/** Canal de contato como botão gigante. Sem link definido, fica desativado com selo. */
function ChannelButton({ channel, index }: { channel: ContactChannel; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  const inner = (
    <>
      {/* preenchimento coral que sobe no hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-coral transition-transform duration-500 ease-(--ease-signature) group-hover:scale-y-100"
      />
      <span className="flex items-center gap-4 md:gap-8">
        <span className="font-sans text-sm font-semibold opacity-70">{number}</span>
        <span className="font-display text-[clamp(1.6rem,7.5vw,7.5rem)] uppercase leading-[0.95] transition-transform duration-500 ease-(--ease-signature) md:group-hover:translate-x-4">
          {channel.label}
        </span>
      </span>
      <span className="flex items-center gap-4">
        {channel.href ? (
          <>
            <span className="hidden text-lg font-medium lg:inline">{channel.value}</span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-(--ease-signature) group-hover:rotate-45 md:size-16">
              <ArrowUpRight aria-hidden className="size-6" />
            </span>
          </>
        ) : (
          <PendingTag />
        )}
      </span>
    </>
  )

  const base =
    'group relative isolate flex min-h-20 items-center justify-between gap-4 border-b border-paper/30 px-1 py-4 md:px-3 md:py-5'

  return (
    <motion.li variants={fadeUp}>
      {channel.href ? (
        <a
          href={channel.href}
          target={channel.id === 'email' ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={`${channel.label}: ${channel.value}`}
          className={`${base} transition-colors duration-300 hover:text-ink`}
        >
          {inner}
        </a>
      ) : (
        <div className={`${base} text-paper/60`}>
          {inner}
        </div>
      )}
    </motion.li>
  )
}

export function Contact() {
  const { contact } = profile

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="on-violet relative isolate overflow-hidden bg-violet text-paper"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      {/* cartaz final — headline em tela cheia */}
      <div className="shell relative flex min-h-svh flex-col justify-center pb-16 pt-28">
        <SectionLabel index="06" className="text-paper/80">
          Contato
        </SectionLabel>

        <h2
          id="contato-titulo"
          aria-label={contact.headline}
          className="display relative mt-8 uppercase"
        >
          <motion.span
            className="block"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {['Vamos', 'criar', 'algo?'].map((word, i) => (
              <span key={word} className="line-mask block">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: '105%' },
                    visible: { y: '0%', transition: { duration: 0.95, ease: easeSignature } },
                  }}
                >
                  {i === 1 ? (
                    <FitLine fill={0.9} max={lineMax} className="py-[0.06em] pl-[0.05em]">
                      <Tape className="bg-coral text-ink" tilt={-2.5}>
                        Criar
                      </Tape>
                    </FitLine>
                  ) : i === 2 ? (
                    <FitLine max={lineMax} className="pt-[0.04em]">
                      Algo<span className="text-coral">?</span>
                    </FitLine>
                  ) : (
                    <FitLine fill={0.7} max={lineMax}>Vamos</FitLine>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h2>

        {/* adesivos */}
        <motion.span
          aria-hidden
          className="absolute right-[4%] top-[22%] hidden size-24 md:grid place-items-center rounded-full bg-paper text-center font-display text-lg uppercase leading-none text-violet md:size-40 md:text-3xl"
          initial={{ scale: 0, rotate: -40 }}
          whileInView={{ scale: 1, rotate: 12 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, type: 'spring', stiffness: 220, damping: 14 }}
        >
          Bora?
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute bottom-[14%] left-[46%] hidden size-14 rotate-12 bg-ink md:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.8, duration: 0.6, ease: easeSignature }}
        />

        <Reveal className="mt-10 max-w-md md:mt-14">
          <p className="text-[length:var(--text-lead)] leading-snug">{contact.text}</p>
        </Reveal>
      </div>

      {/* canais como botões gigantes */}
      <div className="shell">
        <motion.ul
          aria-label="Canais de contato"
          className="border-t-[3px] border-paper"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {contact.channels.map((channel, i) => (
            <ChannelButton key={channel.id} channel={channel} index={i} />
          ))}
        </motion.ul>
      </div>

      {/* assinatura gigante cortada na base */}
      <div aria-hidden className="shell mt-20 select-none overflow-hidden md:mt-28">
        <FitLine className="display translate-y-[22%] leading-[0.78] text-ink">LFRM</FitLine>
      </div>
    </section>
  )
}
