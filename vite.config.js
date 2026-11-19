import {defineConfig} from 'vite';
export default defineConfig({root:'site',base:'./',build:{outDir:'../dist',emptyOutDir:true},server:{host:'0.0.0.0',allowedHosts:['.e2b.app']},preview:{host:'0.0.0.0',allowedHosts:['.e2b.app']}});
