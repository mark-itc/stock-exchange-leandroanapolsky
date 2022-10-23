const linkParams = new URLSearchParams(window.location.search);
const companySymbol = linkParams.get("symbol");
const marquee = document.getElementById("marquee");

const marqueeURL =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ";

async function buildMarquee(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    for (i = 0; i < results.length; i++) {
      let companyListPrice = results[i].price;
      let companyListSymbol = results[i].symbol;

      let marqueeCompany = document.createElement("div");

      marqueeCompany.innerHTML = companyListSymbol + " " + companyListPrice;
      marqueeCompany.classList.add("marquee-data");

      marquee.appendChild(marqueeCompany);
    }
  } catch (error) {
    console.log("error", error);
  }
}

window.onload = () => {
  buildMarquee(marqueeURL);
};
