interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
