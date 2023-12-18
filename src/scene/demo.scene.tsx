/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { ContainerFill } from "../components/container.scene";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { setCameraPosition, toogleCamera } from "../store/camera.slice";

export function DemoScene() {
  const dispatch = useDispatch()
  const scene = useAppSelector(x => x.scene)

  if (scene.name !== "demo") {
    return null;
  }

  function onResize() {
    dispatch(setCameraPosition({
      x: window.innerWidth - 150,
      y: 0,
      width: 150,
      height: 150,
    }))
  }

  useEffect(() => {
    if (scene.name === "demo") {
      dispatch(toogleCamera(true))
      onResize()
      window.addEventListener('resize', onResize)
    } else {
      window.removeEventListener('resize', onResize)
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [scene])

  return (
    <ContainerFill className="bg-[#0e0e0e]">
      <div>

      </div>
    </ContainerFill>
  )
}