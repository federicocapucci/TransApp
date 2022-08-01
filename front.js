//----------Variables---------------//
let listOfTrxns = [];
pickedColumn = "";
const url = "http://127.0.0.1:3000/";

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
balance.classList.add("amounts");
const form = document.getElementById("form");
const trxnContainer = document.getElementById("trxnContainer");
const errorp = document.getElementsByClassName("errorp")[0];
const hTitle = document.getElementById("h-title");
const hDate = document.getElementById("h-date");
const hAmount = document.getElementById("h-amount");
const filters = document.getElementById("filter");

//--------Event Listeners-------------//

window.addEventListener("load", initialLoad);
form.addEventListener("submit", getFormData);
hTitle.addEventListener("click", sortList);
hDate.addEventListener("click", sortList);
hAmount.addEventListener("click", sortList);
filters.addEventListener("click", filterTrxns);

//----------Functions---------------//

//Runs a few functions on site load
function initialLoad() {
  currentDate();
  fillTrxnList("");
}

//Gets today date and updates the date input accordingly.
function currentDate() {
  var currentDate = {
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString(),
    date: new Date().getDate().toString(),
  };

  if (currentDate.month < 10) currentDate.month = "0" + currentDate.month;
  if (currentDate.date < 10) currentDate.date = "0" + currentDate.date;

  document.getElementById("date").value =
    currentDate.year + "-" + currentDate.month + "-" + currentDate.date;
}

//Sorts the columns depending on clicked column header
function sortList(e) {
  hTitle.classList.remove("picked");
  hTitle.classList.remove("picked2");
  hDate.classList.remove("picked");
  hDate.classList.remove("picked2");
  hAmount.classList.remove("picked");
  hAmount.classList.remove("picked2");

  if (pickedColumn === e.currentTarget.textContent.toLowerCase()) {
    trxnContainer.innerHTML = "";
    e.currentTarget.classList.toggle("picked");
    e.currentTarget.classList.toggle("picked2");

    return fillTrxnList(listOfTrxns.reverse());
  } else {
    e.currentTarget.classList.add("picked");

    pickedColumn = e.currentTarget.textContent.toLowerCase();

    if (listOfTrxns.length > 0) {
      listOfTrxns.map((a) => (a.amount = parseInt(a.amount)));

      let sortedCopy;
      if (pickedColumn == "title") {
        sortedCopy = listOfTrxns.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sortedCopy = listOfTrxns.sort((a, b) =>
          a[pickedColumn] > b[pickedColumn] ? 1 : -1
        );
      }

      trxnContainer.innerHTML = "";
      return fillTrxnList(sortedCopy);
    }
    return null;
  }
}

//Capture the Data form when '+' button is clicked.
function getFormData(e) {
  e.preventDefault();
  let form = e.currentTarget;
  let formData = new FormData(form);
  let formDataObject = Object.fromEntries(formData.entries());
  if (formDataObject.entryType === "out")
    formDataObject.amount = -Math.abs(formDataObject.amount);
  formDataObject.date = document.getElementById("date").value.toString();
  postTrxn(formDataObject);
  title.value = "";
  amount.value = "";
}

//Sends trxn info to the server
async function postTrxn(formData) {
  let fetchOptions = {
    method: "POST",
    body: JSON.stringify(formData),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await fetch(url, fetchOptions);
  trxnContainer.innerHTML = "";
  fillTrxnList("");
}

//Gets list of trxns from the server
async function getAlltrxns() {
  let fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  let trxns = await fetch(url, fetchOptions);
  let trxnsJson = await trxns.json();
  return trxnsJson;
}

//Once list of trxns is fetched, display them in the  trxn container
async function fillTrxnList(order) {
  listOfTrxns = [];
  let trxnList = await getAlltrxns();
  if (trxnList.length == 0) {
    trxnContainer.innerHTML = `<p class='errorp'>No transactions available</p>`;
    balance.innerHTML = `0`;
    return null;
  }

  trxnList.reverse(); //order them from newest to oldest;

  //For each trxn of the trxn list//
  for (let trxnItem of order || trxnList) {
    listOfTrxns.push(trxnItem);

    let newTrxn = document.createElement("div");
    newTrxn.classList.add("trxnRow");

    if (trxnItem.entryType === "inc") {
      newTrxn.classList.add("income");
    } else {
      newTrxn.classList.add("outcome");
    }

    const spanid = document.createElement("span");
    spanid.classList.add("hidden");
    const spantitle = document.createElement("span");
    spantitle.classList.add("row-title");
    const spandate = document.createElement("span");
    spandate.classList.add("row-date");
    const spanamount = document.createElement("span");
    spanamount.classList.add("row-amount", "amounts");
    const spanType = document.createElement("span");
    spanType.classList.add("row-type", "hidden");

    spanid.textContent = trxnItem.ID;
    spantitle.textContent = trxnItem.title;
    spanType.textContent = trxnItem.entryType;
    spandate.textContent = trxnItem.date;
    spanamount.textContent = trxnItem.amount;

    const editTrxn = document.createElement("span");
    editTrxn.classList.add("editButton");
    editTrxn.value = trxnItem.ID;
    editTrxn.innerHTML = "Edit";
    editTrxn.addEventListener("click", editTrxnInfo);
    const deleteTrxn = document.createElement("span");
    deleteTrxn.classList.add("deleteButton");
    deleteTrxn.value = trxnItem.ID;
    deleteTrxn.innerHTML = "Delete";
    deleteTrxn.addEventListener("click", deleteTrxnInfo);

    newTrxn.id = trxnItem.ID;
    newTrxn.append(
      spanid,
      spantitle,
      spanType,
      spandate,
      spanamount,
      editTrxn,
      deleteTrxn
    );
    trxnContainer.append(newTrxn);
  }

  let ListOfTrxnsAmounts = listOfTrxns.map((a) => parseInt(a.amount));
  let balanceAmount = ListOfTrxnsAmounts.reduce((a, b) => a + b);
  balance.innerHTML = `${balanceAmount}`;

  if (balance.innerHTML < 2) {
    balance.style.color = "red";
  } else {
    balance.style.color = "Green";
  }
}

//Allows for field editing on a single trxn.
async function editTrxnInfo() {
  const trxnID = this.value;
  this.textContent = "Save";

  let div = document.getElementById(trxnID);
  let title = document.getElementById(trxnID).children[1];
  let type = document.getElementById(trxnID).children[2];
  let date = document.getElementById(trxnID).children[3];
  let amount = document.getElementById(trxnID).children[4];
  let deletebtn = document.getElementById(trxnID).children[6];

  deletebtn.classList.add("hidden");
  let cancelbtn = document.createElement("span");
  cancelbtn.classList.add("deleteButton");
  cancelbtn.textContent = "Cancel";

  cancelbtn.addEventListener("click", function (e) {
    div.removeChild(cancelbtn);
    div.parentNode.removeChild(div);
    location.reload();
  });

  div.appendChild(cancelbtn);

  let titleInput = document.createElement("input");
  titleInput.classList.add("row-title");
  titleInput.type = "text";
  titleInput.value = title.textContent;
  title.classList.add("hidden");

  let dateInput = document.createElement("input");
  dateInput.classList.add("row-date");
  dateInput.type = "date";
  dateInput.value = date.textContent;
  date.classList.add("hidden");

  let amountInput = document.createElement("input");
  amountInput.classList.add("row-amount");
  amountInput.type = "number";
  amountInput.value = amount.textContent;
  amount.classList.add("hidden");

  div.insertBefore(titleInput, title);
  div.insertBefore(dateInput, date);
  div.insertBefore(amountInput, amount);

  this.addEventListener("click", async () => {
    if (
      isNaN(parseInt(amountInput.value)) ||
      titleInput.value == "" ||
      titleInput.value.length > 80 ||
      dateInput.value == "" ||
      dateInput.value.length > 10 ||
      amountInput.value > 9999999999999999999
    ) {
      alert("One or more fields have invalid information. Please try again");
      div.classList.add("hidden");
      location.reload();
      fillTrxnList("");
    } else {
      if (type.textContent === "inc") {
        amountInput.value = Math.abs(amountInput.value);
      } else {
        amountInput.value = -Math.abs(amountInput.value);
      }

      let fetchOptions = {
        method: "PUT",
        body: JSON.stringify({
          id: trxnID,
          title: titleInput.value,
          date: dateInput.value,
          amount: amountInput.value,
        }),

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      await fetch(url, fetchOptions);
      trxnContainer.innerHTML = "";
      fillTrxnList("");
    }
  });
}

//Deletes transaction from the server, reloads the page with current list of transactions
async function deleteTrxnInfo() {
  let fetchOptions = {
    method: "DELETE",
    body: JSON.stringify({ id: this.value }),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  await fetch(url, fetchOptions);
  trxnContainer.innerHTML = "";
  fillTrxnList("");
}

//Filter transactions according to selection
function filterTrxns(e) {
  const trxns = document.getElementsByClassName("row-type");

  if (e.target.value == "inc") {
    for (let trxn of trxns) {
      trxn.parentElement.style.position = "relative";
      trxn.parentElement.style.display = "flex";

      if (trxn.textContent != "inc") {
        trxn.parentElement.style.position = "absolute";
        trxn.parentElement.style.display = "none";
      }
    }
  }
  if (e.target.value == "out") {
    for (let trxn of trxns) {
      trxn.parentElement.style.position = "relative";
      trxn.parentElement.style.display = "flex";

      if (trxn.textContent != "out") {
        trxn.parentElement.style.position = "absolute";
        trxn.parentElement.style.display = "none";
      }
    }
  }
  if (e.target.value == "all") {
    for (let trxn of trxns) {
      trxn.parentElement.style.position = "relative";
      trxn.parentElement.style.display = "flex";
    }
  }
}
