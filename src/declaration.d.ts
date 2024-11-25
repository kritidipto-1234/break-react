// declare module '*.svg' {
//   const content: any
//   export default content
// }

// declare module 'lodash.random' {
//   function random(lower: number, upper?: number): number;
//   export = random;
// }

// declare global {
//     interface Window {
//     //   a: any;
//     }
//   }

declare namespace JSX {
    interface IntrinsicElements {
      mycustelement: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }