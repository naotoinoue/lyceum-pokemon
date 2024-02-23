// useFetchがimportされている理由が不明。
// [推測]useFetchのauto-importはvueファイルの<script>内の話で、通常のjsではimportが必要かもしれない
import { useFetch, useRuntimeConfig } from "#app";

export default (trainerName) => {
  const config = useRuntimeConfig();
  const response = useFetch("/api/trainer/"+trainerName, {
    default: () => [],
    server: false,
    baseURL: config.public.backendOrigin,
  });
  return response;
};
