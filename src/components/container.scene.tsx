import { ComponentProps, FC } from "react";
import { clsx } from "clsx";

export const ContainerFill: FC<ComponentProps<'div'>> = ({ children, ...props}) => {
  return (
    <div
      {...props}
      className={clsx("absolute inset-0", props.className)}
    >
        {children}
    </div>
  )
}