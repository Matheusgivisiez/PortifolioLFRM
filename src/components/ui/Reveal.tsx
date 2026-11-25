import { motion, type HTMLMotionProps } from 'motion/react'
import { fadeUp, viewportOnce } from '../../lib/motion'

type RevealProps = HTMLMotionProps<'div'> & { delay?: number }

/** Entrada padrão ao rolar: sobe 24px + opacidade, uma única vez. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
