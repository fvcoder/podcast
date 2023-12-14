import { motion } from "framer-motion"
import { IntroScene } from "./scene/intro.scene"

export function App() {
  return (
    <motion.div className="bg-transparent h-full w-full relative">
      <IntroScene />
    </motion.div>
  )
}

