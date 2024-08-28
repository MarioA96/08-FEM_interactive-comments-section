import { defineConfig } from 'astro/config';
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  site: 'https://marioa96.github.io/',
  base: '08-FEM_interactive-comments-section',
  integrations: [react()]
});