let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

let leadsfromlocal = JSON.parse(localStorage.getItem("arr"));

if (leadsfromlocal) {
  myLeads = leadsfromlocal;
  renderLeads();
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });

  inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("arr", JSON.stringify(myLeads));
    renderLeads();
  });

  delBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    renderLeads();
  });

  function renderLeads() {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
      listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
  }
});
