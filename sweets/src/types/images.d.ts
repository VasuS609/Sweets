// Allow importing image files in TypeScript modules
declare module '*.avif'
declare module '*.bmp'
declare module '*.gif'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.png'
declare module '*.webp'
declare module '*.svg' {
  import * as React from 'react'
  const content: string
  export default content
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}
