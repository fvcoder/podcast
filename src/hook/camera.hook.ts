import { Detection, FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision"
import { useEffect, useRef, useState } from "react"

async function setup(options?: MediaStreamConstraints) {
  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm")
  const mediaStream = await navigator.mediaDevices.getUserMedia(Object.assign({
    video: true,
    audio: true
  }, options))

  const faceDetector = await ObjectDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite",
    },
    scoreThreshold: 0.5,
    runningMode: 'VIDEO',
    categoryAllowlist: ['person'],
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
      console.log('predict', video.current.currentTime, lastVideoTime, lastVideoTime)
      lastVideoTime = video.current.currentTime;
      const faceResult = detector?.detectForVideo(video.current, nowInMs);

      if (faceResult && faceResult.detections) {
        setResult(faceResult.detections)
      }
    }

    window.requestAnimationFrame(predict)
  }

  return {
    stream,
    video,
    predict,
    result
  }
}