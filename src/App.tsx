import { motion } from "framer-motion"
import { IntroScene } from "./scene/intro.scene"
import { CameraScene } from "./scene/camera.scene"

export function App() {
  return (
    <motion.div className="bg-transparent w-screen h-screen relative overflow-hidden">
      <IntroScene />
      <CameraScene />
    </motion.div>
  )
}

