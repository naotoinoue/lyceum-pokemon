// useFetchがimportされている理由が不明。
// [推測]useFetchのauto-importはvueファイルの<script>内の話で、通常のjsではimportが必要かもしれない
import { useFetch, useRuntimeConfig } from "#app";

export default (trainerName, pokemonName) => {
  console.log("useAddPokemon.js");
  console.log("trainerName:"+trainerName);
  console.log("pokemonName:"+pokemonName);
  const config = useRuntimeConfig();
  const response = useFetch("/api/trainer/"+trainerName+"/pokemon", {
    method:"POST",
    baseURL: config.public.backendOrigin,
    body:{"name":pokemonName}
  });
  return response;
};
