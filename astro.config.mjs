import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://traiteur.bestofindiaparis.com',
  compressHTML: true,
  trailingSlash: 'always'
});
