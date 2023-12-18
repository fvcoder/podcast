import { Detection, FaceDetector, FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision"
import { useEffect, useRef, useState } from "react"

async function setup(options?: MediaStreamConstraints) {
  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm")
  const mediaStream = await navigator.mediaDevices.getUserMedia(Object.assign({
    video: true,
    audio: true
  }, options))

  const faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
    },
    runningMode: 'VIDEO',
  })

  return {
    mediaStream,
    faceDetector
  }
}

export function useCameraAi() {
  let lastVideoTime = -1
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [detector, setDetector] = useState<ObjectDetector | null>(null)
  const [result, setResult] = useState<Detection[]>([])
  const video = useRef<HTMLVideoElement | null>(null) 
  
  useEffect(() => {
    setup().then(x => {
      setStream(x.mediaStream)
      setDetector(x.faceDetector)
    })
  }, [])

  async function predict() {
    // eslint-disable-next-line prefer-const
    let nowInMs = Date.now()
    if (video.current && (lastVideoTime !== video.current.currentTime)) {
      lastVideoTime = video.current.currentTime;
      const faceResult = detector?.detectForVideo(video.current, nowInMs);

      if (faceResult && faceResult.detections && stream) {
        const settingsCam = stream.getVideoTracks()[0].getSettings()
        const scaleX = video.current.offsetWidth / (settingsCam.width as number)
        const scaleY = video.current.offsetHeight / (settingsCam.height as number)

        setResult(faceResult.detections.map(x => {
          if (x.boundingBox) {
            x.boundingBox.width = Math.round(x.boundingBox.width * scaleX)
            x.boundingBox.height = Math.round(x.boundingBox.height * scaleY)
            x.boundingBox.originX = Math.round(x.boundingBox.originX * scaleX)
            x.boundingBox.originY = Math.round(x.boundingBox.originY * scaleY)
          }
          return x;
        }));

      }
    }
    setTimeout(() => {
      window.requestAnimationFrame(predict)
    }, 1000);
  }

  return {
    stream,
    video,
    predict,
    result,
  }
}