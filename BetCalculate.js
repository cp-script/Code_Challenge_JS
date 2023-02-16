function longMultiply(num1, num2) {
  let len1 = num1.length;
  let len2 = num2.length;
  if (len1 == 0 || len2 == 0) return "0";

  let result = new Array(len1 + len2).fill(0);

  let i_n1 = 0;
  let i_n2 = 0;

  for (var i = len1 - 1; i > -1; i--) {
    let carry = 0;
    let n1 = (num1[i]).charCodeAt(0) - 48;
    i_n2 = 0;

    for (var j = len2 - 1; j > -1; j--) {
      let n2 = (num2[j]).charCodeAt(0) - 48;
      let summ = n1 * n2 + result[i_n1 + i_n2] + carry;
      carry = Math.floor(summ / 10);
      result[i_n1 + i_n2] = summ % 10;
      i_n2 += 1;
    }

    if (carry > 0) result[i_n1 + i_n2] += carry;
    i_n1 += 1;

  }
  i = result.length - 1
  while (i >= 0 && result[i] == 0) i -= 1

  if (i == -1) return "0"

  let s = ""
  while (i >= 0) {
    s += String.fromCharCode(result[i] + 48)
    i -= 1
  }

  return s
}

const longSubtract = (num1, num2) => {
  let result = "";
  let n1 = num1, n2 = num2;
  let len1 = n1.length, len2 = n2.length;
  if (n1 < n2 && len1 == len2 || len1 < len2) {
    result = "-";
    let n = n1; n1 = n2; n2 = n;
    let len = len1; len1 = len2; len2 = len;
    return "error";
  }
  let carry = 0, res = "";

  for (let i = 0; i < len1; i++) {
    const n2_item = len2 - i - 1 < 0 ? "0" : n2[len2 - i - 1];
    let subtract = n1[len1 - i - 1] - n2_item - carry;
    if (subtract < 0) {
      subtract += 10
      carry = 1;
    }
    else carry = 0;
    res = subtract + res;
  }
  while (res[0] == '0' && res.length > 1) {
    res = res.slice(1);
  }
  return result + res;
}

function longDivision(number, divisor, remain = 0) {
  let result = "";
  let idx = divisor.length;
  if (number.length == 0 || number == "0") return "0";
  number += "0".repeat(remain);
  if (number.length < divisor.length || number < divisor && number.length == divisor.length) return "0";
  let temp = number.slice(0, idx);
  if (temp < divisor) {
    temp += number[idx];
    idx++;
  }

  while (number.length > idx) {
    let ans = 0;
    while (temp >= divisor && temp.length == divisor.length || temp.length > divisor.length) {
      temp = longSubtract(temp, divisor);
      ans++;
    }
    result += ans;

    temp = temp == '0' ? number[idx] : temp + number[idx];
    idx++;
  }

  let ans = 0;
  while (temp >= divisor && temp.length == divisor.length || temp.length > divisor.length) {
    temp = longSubtract(temp, divisor);
    ans++;
  }
  result += ans;

  if (result.length == 0) result = "0";
  if (remain > 0) {
    if (result.length <= remain) result = "0." + "0".repeat(remain - result.length) + result;
    else result = result.slice(0, -remain) + "." + result.slice(-remain);
  }
  return result;
}

const factorial = (number) => {
  let result = "1";
  if (number == 0) return result;
  for (let i = 1; i <= number; i++) {
    result = longMultiply(result, i + "");
  }
  return result;
}

const combination = (k, n) => {
  const divisor = longMultiply(factorial(k), factorial(n - k));
  const number = factorial(n);
  return longDivision(number, divisor);
}

const permutation = (k, n) => {
  const number = factorial(n);
  const divisor = factorial(n - k);
  return longDivision(number, divisor);
}

const winner = (k, n, m) => {
  const select = combination(k, n);
  const all = permutation(n - k - 1, m - k + 1);
  return longMultiply(select, all);
}

const empty = (k, n, m) => {
  const select = combination(k, n);
  const all = permutation(n - k - 1, m + 1);
  return longMultiply(select + "", all);
}

const betCalculate = (bet, n) => {
  const all = permutation(n * n - 1, bet + 1);
  const win = winner(3, n * n, bet);
  const emp = empty(3, n * n, bet);
  const remainWin = all.length - win.length + 1;
  const remainEmp = all.length - emp.length + 1;
  console.log(longDivision(win, all, remainWin));
  console.log(longDivision(emp, all, remainEmp));
}

const result = betCalculate(511, 16);