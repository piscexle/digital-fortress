/* eslint-disable no-var */
declare var jQuery: any;
declare var $: any;

export {};
declare global {
  interface Window {
    paypal: any;
    [key: string]: any;
  }
}
