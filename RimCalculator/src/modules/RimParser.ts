interface IDigits {
  [key: string]: number;
}

const digits: IDigits = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

const RimToInt = (rim: string) => {
  let int = 0;

  for (let i = 0; i < rim.length; i++) {
    if (digits[rim.charAt(i)] < digits[rim.charAt(i + 1)]) {
      int -= digits[rim.charAt(i)];
    } else {
      int += digits[rim.charAt(i)];
    }
  }

  return int;
};

const IntToRim = (int: number) => {
  let roman = [],
    romanKeys = Object.keys(digits),
    curValue,
    index,
    count = 1;

  for (let i in digits) {
    curValue = digits[i];
    index = romanKeys.indexOf(i);

    while (int >= curValue) {
      if (count < 4) {
        roman.push(i);
      }
      if (count >= 4) {
        if (roman.indexOf(romanKeys[index - 1]) > -1) {
          roman.splice(roman.indexOf(romanKeys[index - 1]));
          roman.push(romanKeys[index], romanKeys[index - 2]);
        } else {
          roman.splice(-3);
          roman.push(romanKeys[index], romanKeys[index - 1]);
        }
      }
      int -= curValue;
      count++;
    }
    count = 1;
  }
  return roman.join("");
};

const RimParser = { RimToInt, IntToRim };

export { digits };

export default RimParser;
