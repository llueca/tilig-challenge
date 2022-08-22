import { ReactNode } from "react";

export function Title({children}: { children: ReactNode }) {
  return <h1 className="title">{children}</h1>
}
