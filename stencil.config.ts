import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: false,
      copy: [
        {
          src: "tincan.xml",
          warn: true
        }
      ]
    }
  ]
};
