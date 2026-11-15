/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'amp-story': any;
            'amp-story-page': any;
            'amp-story-grid-layer': any;
        }
    }
}
