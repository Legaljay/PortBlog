import type { Config } from "tailwindcss";
import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
	presets: [createPreset()],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	'./node_modules/fumadocs-ui/dist/**/*.js',
    './content/**/*.mdx',
    './mdx-components.tsx',
  ],
  theme: {
  	extend: {
		backgroundImage: {
			"gradient-dark":
				"radial-gradient(76.33% 76.59% at 50.15% 6.06%, #1A1A1A 0%, rgba(26, 26, 26, 0.38) 100%)",
			"gradient-light":
				"radial-gradient(76.33% 76.59% at 50.15% 6.06%, #FFFFFF 0%, rgba(255, 255, 255, 0.38) 100%)",
		},
		height: {
			"70vh": "70vh",
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			'scrollbar-thumb': '#888',
        	'scrollbar-track': 'hsl(var(--background))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
//   plugins: [require("tailwindcss-animate")],
plugins: [tailwindcssAnimate],
};
export default config;
