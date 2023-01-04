import axios from "axios";
import type { Ref, UnwrapRef } from "vue";

const convert: (
  value: string,
  init: string,
  resolve: string,
  result: Ref<UnwrapRef<string>>
) => void = (value, init, resolve, result) => {
  axios
    .get(`https://api.exchangerate.host/convert?from=${init}&to=${resolve}&amount=${value}`)
    .then(({ data }) => {
      result.value = data.result;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default convert;