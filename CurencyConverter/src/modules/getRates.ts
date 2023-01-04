import axios from "axios";
import type { Ref, UnwrapRef } from "vue";
import Curency from "../assets/Curency.json";
import type { TCurency, TCursItem } from "@/assets/Curency.type";

const getRates = (type: string, list: Ref<UnwrapRef<TCursItem[]>>) => {
  const curency: TCurency[] = Curency;

  axios
    .get(`https://api.exchangerate.host/latest?base=${type}`)
    .then(({data}) => {
      list.value = curency.map((item) => {
        return {
          name: item.name,
          fullName: item.fullName,
          property: data.rates[item.name],
        };
      });;
    });
};

export default getRates;