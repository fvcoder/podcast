import { motion, Variants } from "framer-motion"
import "./intro.scene.css"
import { useEffect, useState } from "react"
import { useAppSelector } from "../store"

const boxAnimations: Variants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
}

const borderAnimations: Variants = {
  initial: {
    background: 'linear-gradient(90deg, rgba(10,111,252,1) 0%, rgba(155,150,134,1) 100%)',
  },
  active: {
    background: 'linear-gradient(-190deg, rgba(10,111,252,1) 0%, rgba(155,150,134,1) 100%)',
  },
}

const textAnimations: Variants = {
  initial: {
    opacity: 0,
    y: 1400,
  },
  active: {
    opacity: 1,
    y: 0,
  },
}

export function IntroScene() {
  const scene = useAppSelector(x => x.scene)
  const [state, setState] = useState<'initial' | 'active'>('initial')

  useEffect(() => {
    if (scene.name === 'intro') {
      setState('active')
    } else {
      setState('initial')
    }
  }, [scene])

  return (
    <motion.div
      layout
      className="box py-16 px-28 h-full"
      initial={{ opacity: 0 }}
      variants={boxAnimations}
      animate={state}
      transition={{ delayChildren: 1 }}
    >
      <motion.div
        layout
        className="border-intro"
        variants={borderAnimations}
        animate={state}
        transition={{ duration: 2, times: [0, .15, .5, .65, 1], delayChildren: 1 }}
      >
        <div className="h-full bg-black px-10 py-6">
          <motion.h1
            className="text-[#ded9cd] text-[5rem]"
            initial={{ opacity: 0 }}
            variants={textAnimations}
            animate={state}
            transition={{ duration: 1.5 }}
          >
            Un texto muy bonito Un texto muy bonito Un texto muy bonito Un texto muy bonito
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            variants={textAnimations}
            animate={state}
            transition={{ duration: 1.5 }}
            className="text-gray-500 text-[3.5rem]"
          >
            Lldasd - P01O01
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const backgroundColor = 'white'