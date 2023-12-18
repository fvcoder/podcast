/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import { useCameraAi } from "../hook/camera.hook"
import { useAppSelector } from "../store"
import { motion } from "framer-motion"
import { BoundingBox } from "@mediapipe/tasks-vision"

export function Camera() {
  const state = useAppSelector(x => x.camera)
  const container = useRef<HTMLDivElement | null>(null)
  const { stream, video, predict, result } = useCameraAi()
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if (stream && video.current) {
      video.current.srcObject = stream
      video.current.addEventListener('loadeddata', predict)

    }
    return () => {
      if (video.current) {
        video.current.removeEventListener('loadeddata', predict)
      }
    }
  }, [stream, video])

  useEffect(() => {
    if (state.isEnabled) {
      if (!container.current) {
        return;
      }
      container.current.style.display = 'block'
      container.current.style.top = state.y + 'px'
      container.current.style.left = state.x + 'px'
      container.current.style.width = state.width + 'px'
      container.current.style.height = state.height + 'px'

      /*
      if (!video.current) {
        return;
      }
      if (state.width > video.current.offsetWidth) {
        video.current.style.width = state.width + "px"
      }
      if (state.height > video.current.offsetHeight) {
        video.current.style.height = state.height + "px"
      }
*/
      // relacion aspecto 1:1 u otros...
      if ((state.width - state.height) === 0) {
        setIsFocus(true)
        container.current.children[0].classList.remove('w-full')

      } else {
        setIsFocus(false)
        container.current.children[0].classList.add('w-full')
        if (video.current) {
          video.current.style.height = '100%'
          video.current.style.width = '100%'
          video.current.style.objectFit = 'cover'
        }
      }
    } else {
      if (container.current) {
        container.current.style.display = 'none'
      }
      if (video.current) {
        video.current.removeEventListener('loadeddata', predict)
      }
    }
  }, [video, state.width, state.height])

  function getFocusBox(face?: BoundingBox) {
    if (!isFocus || !face) {
      return {}
    }
    if (!video.current || !container.current) {
      return {}
    }

    // Calcular la escala necesaria para ajustar la imagen al contenedor
    const escalaX = container.current.clientWidth / face.width;
    const escalaY = container.current.clientHeight / face.height;
    const escala = Math.max(escalaX, escalaY) - 3;
    
    // Calcular la nueva posición y tamaño de la imagen para centrarla
    const newWidth = face.width * escala;
    const newHeight = face.height * escala;
    const nuevaX = -face.originX * escala + (container.current.clientWidth - newWidth) / 2;
    const nuevaY = -face.originY * escala + (container.current.clientHeight - newHeight) / 2;
    return {
      // transform: 'scale(' + escala + ')',
      // width: newWidth + 'px',
      // height: newHeight + 'px',
      transform:'translate(' + nuevaX + 'px,' + nuevaY + 'px) scale(' + escala + ')',
    }
  }
  
  return (
    <div
      ref={container}
      className="fixed bg-black z-50"
      style={{
        top: state.y,
        left: state.x,
        width: state.width,
        height: state.height
      }}
    >
      <div className="absolute overflow-hidden z-40 h-full">
        <motion.video
          className="object-cover transition-all duration-500 ease-in-out"
          ref={video}
          autoPlay
          playsInline
          initial={false}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            transformOrigin: 'top left',
            ...getFocusBox(result[0] ? result[0]?.boundingBox : undefined),
          }}
          />
        {/*result.map((x, i) => {
          let width = x.boundingBox?.width
          let height = x.boundingBox?.height
          if (container.current && x.boundingBox) {
            width = container.current.offsetWidth <= x.boundingBox?.width ? container.current.offsetWidth : x.boundingBox?.width
            height = container.current.offsetHeight <= x.boundingBox?.height ? container.current.offsetHeight : x.boundingBox?.height
          }
          return (
            <motion.div
              className="border-4 absolute bg-transparent"
              key={`person-${i}`}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              animate={{
                top: x.boundingBox?.originY,
                left: x.boundingBox?.originX,
                width,
                height,
              }}
            />
          )
        })*/}
      </div>
    </div>
  )
}