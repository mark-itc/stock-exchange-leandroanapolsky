const linkParams = new URLSearchParams(window.location.search);
const companySymbol = linkParams.get("symbol");

const loader2 = document.getElementById("loader2");

const newURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
  companySymbol;

const chartURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" +
  companySymbol +
  "?serietype=line";

//COMPANY INFO

async function addCompanyInfo(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    const companyProfile = results.profile;

    const logo = document.getElementById("companyLogo");
    const name = document.getElementById("companyName");
    const symbolName = document.getElementById("companySymbolName");
    const info = document.getElementById("companyInfo");
    const price = document.getElementById("stockPrice");
    const change = document.getElementById("stockChange");

    companyLogo.src = companyProfile.image;
    name.innerHTML = companyProfile.companyName;
    name.href = companyProfile.website;
    symbolName.innerHTML = results.symbol;
    info.innerHTML = companyProfile.description;
    price.innerHTML = "$" + companyProfile.price;

    if (companyProfile.changes > 0) {
      change.innerHTML = "(+" + companyProfile.changes + "%)";
      change.style.color = "#1d8519";
    } else {
      change.innerHTML = "(-" + companyProfile.changes + "%)";
      change.style.color = "#851919";
    }
  } catch (error) {
    console.log("error", error);
  }
}

//CHART

var closeData = [];
var datesData = [];

async function buildChart() {
  await getChartData(chartURL);

  var ctx = document.getElementById("myChart").getContext("2d");

  var chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: datesData,
      datasets: [
        {
          label: "Stock history",
          backgroundColor: "green",
          borderColor: "grey",

          data: closeData,
        },
      ],
    },
    options: {},
  });
}

async function getChartData(url) {
  loader2.style.display = "block";
  try {
    const response = await fetch(url);
    const results = await response.json();

    const dates = results.historical.map((x) => x.date);

    const close = results.historical.map((x) => x.close);

    closeData = close;
    datesData = dates;
    loader2.style.display = "none";
  } catch (error) {
    console.log("error", error);
  }
}

//ONLOAD

window.onload = () => {
  addCompanyInfo(newURL);
  buildChart();
};
