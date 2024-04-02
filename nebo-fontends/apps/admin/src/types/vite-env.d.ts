/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly SERVER_PROXY_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
