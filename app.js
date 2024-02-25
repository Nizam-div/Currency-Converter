

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const fromCurr = document.querySelector("#fromCurr");
const toCurr = document.querySelector("#toCurr");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

fromCurr.addEventListener("change", () => updateFlag(fromCurr));
toCurr.addEventListener("change", () => updateFlag(toCurr));

const populateDropdown = (selectElement, currencyList) => {
  for (let currencyCode in currencyList) {
    let option = document.createElement('option');
    option.value = currencyCode;
    option.textContent = currencyCode;
    selectElement.appendChild(option);
  }
};

populateDropdown(fromCurr, countryList);
populateDropdown(toCurr, countryList);


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
