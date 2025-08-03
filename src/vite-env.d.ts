/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BACKEND_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
