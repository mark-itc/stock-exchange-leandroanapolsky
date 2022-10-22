const userInput = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");
const loader = document.getElementById("loader");
const listOfCompanies = document.getElementById("resultsList");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function searchInApi() {
  getData(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      userInput.value +
      "&limit=10&exchange=NASDAQ"
  );
}

async function getData(url) {
  showLoader();
  try {
    const response = await fetch(url);
    const results = await response.json();

    hideLoader();

    for (i = 0; i < 10; i++) {
      let companyListName = results[i].name;
      let companyListSymbol = results[i].symbol;
      const searchURL =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
        companyListSymbol;
      let listedCompany = document.createElement("li");
      listedCompany.classList.add("list-element");

      listedCompany.innerHTML =
        '<a target="_blank"  class="company-links" href=./company.html?symbol=' +
        companyListSymbol +
        ">" +
        companyListName +
        " " +
        "(" +
        companyListSymbol +
        ")</a>";

      listOfCompanies.appendChild(listedCompany);
    }
  } catch (error) {
    console.log("error", error);
  }
}

searchButton.addEventListener("click", searchInApi);
