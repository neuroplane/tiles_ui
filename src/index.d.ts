import type { App, Plugin, DefineComponent } from 'vue'

export const Tile: DefineComponent<Record<string, any>, any, any>
export const TilesContainer: DefineComponent<Record<string, any>, any, any>
export const Button: DefineComponent<Record<string, any>, any, any>
export const Dialog: DefineComponent<Record<string, any>, any, any>
export const Input: DefineComponent<Record<string, any>, any, any>
export const Toast: DefineComponent<Record<string, any>, any, any>
export const Skeleton: DefineComponent<Record<string, any>, any, any>

declare const TilesUI: Plugin & {
  install(app: App): void
}

export default TilesUI
