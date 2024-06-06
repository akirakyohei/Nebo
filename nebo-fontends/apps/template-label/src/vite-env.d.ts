/// <reference types="vite/client" />

interface ImportMetaEnv{
    readonly VITE_OAUTH2_REDIRECT_URI: string;
    readonly VITE_GOOGLE_AUTH_URL: string;
    readonly VITE_FACEBOOK_AUTH_URL: string;
}

interface ImportMeta{
    readonly env: ImportMetaEnv;
}