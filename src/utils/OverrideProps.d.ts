import { ComponentPropsWithRef, ElementType } from 'react'

export type OverrideProps<D extends ElementType, T> =
  T & Omit<ComponentPropsWithRef<D>, keyof T>
