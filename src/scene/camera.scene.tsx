/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import { ContainerFill } from "../components/container.scene"
import { useDispatch } from "react-redux"
import { setCameraPosition } from "../store/camera.slice"
import { useAppSelector } from "../store"

export function CameraScene() {
  const dispath = useDispatch()
  const scene = useAppSelector(x => x.scene)
  const container = useRef<HTMLDivElement | null>(null)

  if (scene.name !== "camera") {
    return null;
  }

  function onResize() {
    if (container.current) {
      dispath(setCameraPosition({
        x: 0,
        y: 0,
        width: container.current.offsetWidth,
        height: container.current.offsetHeight,
      }))
    }
  }
  
  useEffect(() => {
    if (scene.name === "camera") {
      window.addEventListener('resize', onResize)
    } else {
      window.removeEventListener('resize', onResize)
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [scene])
  
  useEffect(() => {
    if (container.current)   {
      onResize()
      container.current.addEventListener('resize', onResize)
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('resize', onResize)
      }
    }
  }, [container, dispath])
  
  return (
    <ContainerFill ref={container} />
  )
}