import { useEffect } from "react"
import { useCameraAi } from "../hook/camera.hook"

export function CameraScene() {
  const { stream, video, predict, result } = useCameraAi()

  useEffect(() => {
    if (stream && video.current) {
      video.current.srcObject = stream
      video.current.addEventListener('loadeddata', predict)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream, video])
  
  return (
    <div className="bg-black h-full w-full">
      <div className="bg-red-500 w-fit h-fit relative">
        <video
          ref={video}
          autoPlay
          playsInline
          />
        {result.map(x => {
          return (
            <div
              className="border-2 absolute"
              key={`person-${x}`}
              style={{
                top: x.boundingBox?.originY,
                left: x.boundingBox?.originX,
                width: x.boundingBox?.width,
                height: x.boundingBox?.height
              }}
            />
          )
        })}
      </div>
    </div>
  )
}