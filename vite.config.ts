import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { localVisualEditor } from './local-visual-editor/vite';
export default defineConfig({ plugins: [react(), localVisualEditor()] });
