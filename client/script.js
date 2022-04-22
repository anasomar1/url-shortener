const input = document.querySelector("input");
const form = document.querySelector("form");
const baseUrl = "http://localhost:5000";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = { fullUrl: input.value };
  fetch(`${baseUrl}/shortUrl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => showResults(data))
    .catch((error) => console.log(error));
});

const showResults = (data) => {
  const resultsBox = document.querySelector(".results");
  const paragraphElement = document.querySelector("p");
  const linkElement = document.querySelector("a");
  const copyButton = document.querySelector(".copy");
  const fullUrl = `${baseUrl}/${data.short}`;
  resultsBox.classList.add("show");
  linkElement.href = fullUrl;
  linkElement.textContent = fullUrl;
  paragraphElement.textContent = input.value;
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(fullUrl);
  });
};
