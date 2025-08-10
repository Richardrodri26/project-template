import type { JSX } from "react";

export type TC<T> = (props: T) => JSX.Element | null;
export type TCchildren<T = object> = (props: T & { children: React.ReactNode }) => JSX.Element | null;
