// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        container: false
    },
    theme: {
        extend: {
            colors: {
                orange: '#ee4d2d'
            }
        }
    },
    plugins: [
        plugin(({ addComponents, theme }) => {
            addComponents({
                '.container': {
                    // maxWidth: theme('columns.7xl'),
                    maxWidth: '1200px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4')
                }
            });
        })
    ]
};
