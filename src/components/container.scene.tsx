import { ComponentProps, forwardRef } from "react";
import { clsx } from "clsx";

export const ContainerFill = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => {
  return (
    <div ref={ref} {...props} className={clsx("absolute inset-0", props.className)} />
  )
})