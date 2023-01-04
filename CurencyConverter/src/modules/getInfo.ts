import type { Ref, UnwrapRef } from "vue";
import axios from "axios";

const getInfo: (
  init: string,
  resolve: string,
  info: Ref<UnwrapRef<string>>
) => void = (init, resolve, info) => {
  axios
    .get(
      `https://api.exchangerate.host/convert?from=${init}&to=${resolve}`
    )
    .then(({ data }) => {
      info.value = data.result;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getInfo