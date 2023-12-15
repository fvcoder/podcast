import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../store"

export function CameraScene() {
  const video = useRef<HTMLVideoElement | null>(null)
  const scene = useAppSelector(x => x.scene)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if(video.current) {
          video.current.srcObject = stream
        }
        setMediaStream(stream)
      })
      .catch(err => {
        alert(err)
      })
    if (scene.name === 'camera') {
      console.log('hola')
    }
  }, [scene])
  
  return (
    <div className="bg-black h-full w-full">
      <video
        ref={video}
        autoPlay
        playsInline
      />
    </div>
  )
}