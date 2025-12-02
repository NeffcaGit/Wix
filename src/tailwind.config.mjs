/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.03em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.03em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.05em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.06em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.07em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "space grotesk",
                paragraph: "azeret-mono"
            },
            colors: {
                text: '#F1F1F1',
                icon1: '#F1F1F1',
                icon2: '#B2A8A8',
                icon3: '#000000',
                icon4: '#0B1AAE',
                icon6: '#5964B8',
                icon7: '#C9CCF1',
                icon8: '#050C84',
                'color-key1': '#3E54A9',
                'color-key2': '#C0C0C0',
                shape: '#414DBA',
                'shape-stroke': '#F1F1F1',
                background: '#000000',
                secondary: '#3342D2',
                'secondary-foreground': '#F1F1F1',
                'primary-foreground': '#F1F1F1',
                primary: '#414DBA'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
