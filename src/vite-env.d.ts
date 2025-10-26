/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_TESTNETS: string
  readonly VITE_REOWN_PROJECT_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
