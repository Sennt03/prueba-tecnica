import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// Inicializa TestBed una sola vez
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

// Intentamos auto-cargar specs cuando sea posible, pero sin romper si no está disponible.
try {
  // webpack / karma
  // @ts-ignore
  if (typeof (require as any).context === 'function') {
    // @ts-ignore
    const context = (require as any).context('./', true, /\.spec\.ts$/);
    context.keys().map(context);
  } else if (typeof (import.meta as any).glob === 'function') {
    // Vite / esbuild
    // @ts-ignore
    const modules = (import.meta as any).glob('./**/*.spec.ts', { eager: true });
    Object.values(modules);
  } else {
    console.warn('No se detectó require.context ni import.meta.glob.');
  }
} catch (e) {
  console.warn('Advertencia al intentar cargar specs automáticamente:', e);
}