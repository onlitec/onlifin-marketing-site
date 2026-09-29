// Platform base URL resolution. Moved verbatim from the previous App.tsx.
declare global {
  interface Window {
    __ONLIFIN_PLATFORM_BASE_URL__?: string;
  }
}

const normalizeBaseUrl = (value?: string | null) => {
  const nextValue = value?.trim();
  if (!nextValue) return null;
  return nextValue.replace(/\/+$/, '');
};

export const getPlatformBaseUrl = () => {
  const runtimeConfiguredBaseUrl = normalizeBaseUrl(window.__ONLIFIN_PLATFORM_BASE_URL__);
  if (runtimeConfiguredBaseUrl) {
    return runtimeConfiguredBaseUrl;
  }

  const buildConfiguredBaseUrl = normalizeBaseUrl(import.meta.env.VITE_PLATFORM_BASE_URL);
  if (buildConfiguredBaseUrl) {
    return buildConfiguredBaseUrl;
  }

  const url = new URL(window.location.origin);
  if (url.port === '80' || url.port === '') {
    url.port = '8081';
  }
  return url.origin;
};

export const normalizeRpcText = (value: string) => value.replace(/^"/, '').replace(/"$/, '').trim();
