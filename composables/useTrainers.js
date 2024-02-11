// useFetchがimportされている理由が不明。
// [推測]useFetchのauto-importはvueファイルの<script>内の話で、通常のjsではimportが必要かもしれない
import { useFetch, useRuntimeConfig } from "#app";

export default () => {
  const config = useRuntimeConfig();
  const response = useFetch("/api/trainers", {
    default: () => [],
    server: false,
    baseURL: config.public.backendOrigin,
  });
  return response;
};
