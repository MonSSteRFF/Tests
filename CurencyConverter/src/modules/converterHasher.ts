import type { Ref, UnwrapRef } from "vue";

type HasherType = (
  values: string[],
  initSelected: Ref<UnwrapRef<string>>,
  resolveSelected: Ref<UnwrapRef<string>>,
  initInput: Ref<UnwrapRef<string>>
) => void;

const converterHasher: HasherType = (values, initSelected, resolveSelected, initInput) => {
  const hash = {
    init: "",
    resolve: "",
    amount: "",
  };
  document.location.hash
    .slice(1)
    .split("&")
    .forEach((item) => {
      const spl = item.split("=");
      if (spl[0] === "init") {
        hash.init = spl[1];
      }
      if (spl[0] === "resolve") {
        hash.resolve = spl[1];
      }
      if (spl[0] === "amount"){
        hash.amount = spl[1];
      }
    });

  hash.init =
    hash.init !== ""
      ? hash.init
      : values.filter((item: string) => item !== hash.resolve)[0];
  hash.resolve =
    hash.resolve !== ""
      ? hash.resolve
      : values.filter((item: string) => item !== hash.init)[0];
  hash.amount = hash.amount !== "" ? hash.amount : initInput.value

  initSelected.value = hash.init;
  resolveSelected.value = hash.resolve;
  initInput.value = hash.amount;

  document.location.hash = `#init=${hash.init}&resolve=${hash.resolve}&amount=${hash.amount}`;
};

export default converterHasher;
