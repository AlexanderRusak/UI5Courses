let storeDetailPattern = []; /// array of store details
let storeOtherDetailPattern = []; // array of other stores Details
let storePattern = []; //array pattern for store-list
let storePatternTable = []; ///table array
let listOfShops;
let getStoresListFromhttp = []; //

//console.log(listOfShops);
/////////////////////////////////////////////////////
function httpGetStoresList(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });
}

httpGetStoresList("http://localhost:3000/api/Stores")
  .then(
    response => generateStoreList(response)),
  error => console.log(`Rejected: ${error}`)

/////////////////////////////////////////////////////////////////////////////

function clickForReturnListInStoresList() { //функция для сброса результатов поиска
  let getPatternElements = document.getElementsByClassName("store-pattern");
  let getPatternElementsArr = Array.from(getPatternElements); // привели htmlcollection к js массиву
  let searchResult = document.getElementById("stores-search"); /////строка для поиска
  getPatternElementsArr.forEach((sectionPattern, index) => {
    getPatternElements[index].style.display = "block";
  });
  searchResult.value = "";
}
/////////////////////////////////////////////////
function generateStoreList(arrayList) { // при  загрузке страницы на основе httpGetStoresList формирует список магазинов
  arrayList = JSON.parse(arrayList);
  //  console.log(arrayList)
  storePattern = arrayList.map((storeList, index) => {
    return (`<section id="store-pattern-${storeList.id}" localIndex="${index+1}"  onclick="clickStoresList(this.id,this)" class="store-pattern">
        <h3 class="store-list-store-name">${storeList.Name}</h3>
        <p class="store-list-store-addres">${storeList.Address}</p>
        <p class="store-list-store-disntance">${storeList.FloorArea}</p>
        <p class="store-list-store-mesure">sq.m</p>
      </section> `);
  });

  let storePatternList = []
  for (var i = 0; i < storePattern.length; i++) {
    storePatternList = document.querySelector(".container-for-stores-list").insertAdjacentHTML("beforeEnd", storePattern[i]);
  }
}
////////////////////////////////////////////////////
function clickForSearchInStoresList() { //функция для поиска
  let searchResult = document.getElementById("stores-search"); /////строка для поиска
  let getPatternElements = document.getElementsByClassName("store-pattern"); //  получаю элементы с классом store-pattern
  let getPatternElementsArr = Array.from(getPatternElements); // привели htmlcollection к js массиву
  getPatternElementsArr.forEach((sectionPattern, index) => { // т.к. это теперь массив его перебераю children[0], children[1], children[2] это строки для которых будет производиться поиск соответственно исключая строку с единицами измерения
    if (sectionPattern.children[0].innerText.indexOf(searchResult.value) !== -1 || // возвращает при нахождении подстроки  true, иначе false
      sectionPattern.children[1].innerText.indexOf(searchResult.value) !== -1 ||
      sectionPattern.children[2].innerText.indexOf(searchResult.value) !== -1) {
      getPatternElements[index].style.display = "block"; // при нахождении подстроки ставлю свойство блок т.к. это проще черем ломать DOM и прересовывать заново
    } else {
      getPatternElements[index].style.display = "none";
    }
  });
}


////////////////////////////////////
function clickStoresList(id, index) { //  функция которая вызывается при клике на магазин в списке магазинов и принимает  id этого магазина
  let getIDforCurrentTable = id.replace(/[^\d,]/g, "", id); //получаю порядковый номер id
  httpGetStoresList(`http://localhost:3000/api/Stores/${getIDforCurrentTable}/rel_Products`)
    .then(
      response => insertPatternStoreTable(response)),
    error => console.log(`Rejected: ${error}`)

  httpGetStoresList("http://localhost:3000/api/Stores")
    .then(
      response => insertOtherDetails(response)),
    error => console.log(`Rejected: ${error}`)


  let displayHeaderOfTable = document.getElementById("displayTable");
  let unClickedDisplayStore = document.getElementById("unClickedDisplayStore");
  let deleteDisplayTable = document.getElementsByClassName("for-stores-list-row-pattern");
  let deleteDetailData = document.getElementsByClassName("store-details-main-info-label");
  let deleteDetailOtherData = document.getElementsByClassName("store-details-other");

  displayHeaderOfTable.style.display = "block";
  unClickedDisplayStore.style.display = "none";

  function deleteShopsInTable(displayTableArray) { //удаляет елементы in DOM tree
    while (displayTableArray.length > 0) {
      displayTableArray[0].parentNode.removeChild(displayTableArray[0]);
    }
  }

  deleteShopsInTable(deleteDisplayTable); //удаляет елементы самой таблицы
  deleteShopsInTable(deleteDetailData); //удаляет елементы в секции store detail
  deleteShopsInTable(deleteDetailOtherData); //удаляет елементы в дополнительной секции







  function insertOtherDetails(arrayOfOtherDetails) {
    arrayOfOtherDetails = JSON.parse(arrayOfOtherDetails);
    console.log(arrayOfOtherDetails);
    let storeDetailPattern = arrayOfOtherDetails.map((detail) => { // здесь я преобразую дату в нужный вид
      let established = new Date(Date.parse(detail.Established));
      let mounthEstablished = String(established).substring(4, 7);
      let dayEstablished = String(established).substring(8, 10);
      let yearEstablished = String(established).substring(11, 15);
      return (`
        <label class="store-details-main-info-label" tableId="${detail.id}" for="email">Email: <p>${detail.Email}</p></label>
        <label class="store-details-main-info-label" for="established-date">Established Date: <p>${mounthEstablished} ${dayEstablished}, ${yearEstablished}</p></label>
        <label class="store-details-main-info-label" for="phone-number">Phone Number: <p>${detail.PhoneNumber}</p></label>
        <label class="store-details-main-info-label" for="floor-area">Floor Area: <p>${detail.FloorArea}</p></label>
        <label class="store-details-main-info-label" for="address">Addres: <p>${detail.Address}</p></label>  `);
    });
    ////////
    let storeOtherDetailData;
    storeOtherDetailData = document.querySelector(".store-details-main-info").insertAdjacentHTML("beforeEnd", storeDetailPattern[index.getAttribute("localIndex") - 1]);
    ////////
  }

  function insertPatternStoreTable(arrayOfTableList) {
    arrayOfTableList = JSON.parse(arrayOfTableList);
    let storePatternTable = arrayOfTableList.map((tableList) => {
      ////////// генерация звезд рейтинга
      function generateStars(countStars) { //  моя любимая функция ну хотя бы не for )))))))
        let returnStars;
        switch (countStars) { //fas -полная звезда far-пустая
          case 4:
            returnStars = `<i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>`;
            break;
          case 3:
            returnStars = `<i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>`;
            break;
          case 1:
            returnStars = `<i class="fas fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>`;
            break;
          case 2:
            returnStars = `<i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>`;
            break;
          case 5:
            returnStars = `<i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>`;
            break;
          default:
            returnStars = `<i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>`;
            break;
        }
        return returnStars;
      }
      return (`
        <pattern  class="for-stores-list-row-pattern ${tableList.Status}" price="${tableList.Price}" id="${tableList.id}" raiting="${tableList.Rating}" store-table-index=${index.getAttribute("localIndex")-1}>
          <section class="for-stores-list-header-name">
            <h3>${tableList.Name}</h3>
            <label for="for-stores-list-id">${tableList.id}</label>
          </section>
          <section class="for-stores-list-header-price-2">
            <h3>${tableList.Price}</h3>
            <label for="for-stores-list-money">USD</label>
          </section>
          <section class="for-stores-list-header-specs">
            <p>${tableList.Specs} </p>
          </section>
          <section class="for-stores-list-header-supinfo">
            <p>${tableList.SupplierInfo}</p>
          </section>
          <section class="for-stores-list-header-country">
            <p>${tableList.MadeIn}</p>
          </section>
          <section class="for-stores-list-header-company">
            <p>${tableList.ProductionCompanyName}</p>
          </section>
          <section class="for-stores-list-header-raiting">
            ${generateStars(tableList.Rating)}
          </section>
          <section onclick="deleteStoreProduct(${tableList.id})" class="for-stores-list-header-button">
            <button><i class="far fa-times-circle"></i></button>
          </section>
          <section  class="for-stores-list-header-button">
            <button><i class="fas fa-chevron-right"></i></button>
          </section>
        </pattern>
        `);
    });
    let tableWithStore;
    for (var i = 0; i < arrayOfTableList.length; i++) { /// не оч я знаю
      tableWithStore = document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", storePatternTable[i]);
    } //пришлось использовать цикл т.к. строка кода снижу вводила в разметку запятую котрая была в массиве



    let statOk = 0;
    let statStorage = 0;
    let statOutOfStock = 0;
    let storeOtherDetailPatternLength = 0;
    storeOtherDetailPattern = arrayOfTableList.map((otherDetail) => { // супер метод который отрисовывает секцию с доп инфой
      storeOtherDetailPatternLength = arrayOfTableList.length;
      // statOk = otherDetail.filter(ok => ok.Status === "OK"); // счетчики
      // statStorage = otherDetail.filter(storage => storage.Status === "STORAGE");
      // statOutOfStock = otherDetail.filter(out => out.Status === "OUT_OF_STOCK");
      if (otherDetail.Status === "OK") {
        statOk++;
      }
      if (otherDetail.Status === "STORAGE") {
        statStorage++
      }
      if (otherDetail.Status === "OUT_OF_STOCK") {
        statOutOfStock++
      }
      return (
        `
            <pattern id="store-detail-other-${otherDetail.id}" class="store-details-other">
              <label onclick="clickAll()" for="number-of-some-info">${storeOtherDetailPatternLength}<p>All</p></label>
              <ul class="store-details-statistics">
                <li>
                  <section id="store-details-ok" onclick="clickOk()"><i class="far fa-check-square"></i></section>
                  <p class="statistics-check" for="">OK</p>
                </li>
                <p class="statistics-index">${statOk}</p>
                <li>
                  <section id="store-details-storage" onclick="clickStorage()"><i class="fas fa-exclamation-triangle"></i></section>
                  <p class="statistics-check" for="">Storage</p>
                </li>
                <p class="statistics-index">${statStorage}</p>
                <li>
                  <section id="store-details-out" onclick="clickOut()"><i class="fas fa-exclamation-circle"></i></section>
                  <p class="statistics-check" for="">Out of stock</p>
                </li>
                <p class="statistics-index">${statOutOfStock}</p>
              </ul>
            </pattern>
            `
      )

    });
    storeDetailEmpty = `
    <pattern  class="store-details-other">
      <label onclick="clickAll()" for="number-of-some-info">0<p>All</p></label>
      <ul class="store-details-statistics">
        <li>
          <section id="store-details-ok" onclick="clickOk()"><i class="far fa-check-square"></i></section>
          <p class="statistics-check" for="">OK</p>
        </li>
        <p class="statistics-index">0</p>
        <li>
          <section id="store-details-storage" onclick="clickStorage()"><i class="fas fa-exclamation-triangle"></i></section>
          <p class="statistics-check" for="">Storage</p>
        </li>
        <p class="statistics-index">0</p>
        <li>
          <section id="store-details-out" onclick="clickOut()"><i class="fas fa-exclamation-circle"></i></section>
          <p class="statistics-check" for="">Out of stock</p>
        </li>
        <p class="statistics-index">0</p>
      </ul>
    </pattern>`;
    let storeOtherDetailPatternInsert;
    if (storeOtherDetailPatternLength  <= 0) {
      storeOtherDetailPatternInsert = document.querySelector(".store-details-other-container").insertAdjacentHTML("beforeEnd", storeDetailEmpty);
    } else {
      storeOtherDetailPatternInsert = document.querySelector(".store-details-other-container").insertAdjacentHTML("beforeEnd", storeOtherDetailPattern[storeOtherDetailPatternLength - 1]);
    }


  }
}

function clickAll() {
  let okStat = document.getElementById("store-details-ok");
  let okStatFar = document.querySelector(".fa-check-square");
  let storageStat = document.getElementById("store-details-storage");
  let storageStatFar = document.querySelector(".fa-exclamation-triangle");
  let outStat = document.getElementById("store-details-out");
  let outStatFar = document.querySelector(".fa-exclamation-circle");
  let getTablesWithAllStatus = document.querySelectorAll(".for-stores-list-row-pattern");
  let getLabelWithAllStatus = document.querySelector(".store-details-other label");
  getLabelWithAllStatus.style.border = "none";
  getLabelWithAllStatus.style.border = "2px solid #353535";
  getTablesWithAllStatus.forEach((all) => {
    all.style.display = "flex";
  })
  okStat.style.backgroundColor = "#eff4f8";
  okStatFar.style.color = "#2d8028";
  storageStat.style.backgroundColor = "#eff4f8";
  storageStatFar.style.color = "#eb8807";
  outStat.style.backgroundColor = "#eff4f8";
  outStatFar.style.color = "#c60005";
  storageStat, storageStatFar, outStat, outStatFar = null;
}

function clickOk() {
  let okStat = document.getElementById("store-details-ok");
  let okStatFar = document.querySelector(".fa-check-square");
  let storageStat = document.getElementById("store-details-storage");
  let storageStatFar = document.querySelector(".fa-exclamation-triangle");
  let outStat = document.getElementById("store-details-out");
  let outStatFar = document.querySelector(".fa-exclamation-circle");
  let getLabelWithAllStatus = document.querySelector(".store-details-other label");
  getLabelWithAllStatus.style.border = "none";
  let getTablesWithStorageStatus = document.querySelectorAll(".STORAGE");
  getTablesWithStorageStatus.forEach((storage) => {
    storage.style.display = "none"
  })
  let getTablesWithOutStatus = document.querySelectorAll(".OUT_OF_STOCK");
  getTablesWithOutStatus.forEach((out) => {
    out.style.display = "none"
  })
  let getTablesWithOkStatus = document.querySelectorAll(".OK");
  getTablesWithOkStatus.forEach((ok) => {
    ok.style.display = "none"
  })
  getTablesWithOkStatus.forEach((ok) => {
    ok.style.display = "flex"
  })
  /////// return old colors
  storageStat.style.backgroundColor = "#eff4f8";
  storageStatFar.style.color = "#eb8807";
  outStat.style.backgroundColor = "#eff4f8";
  outStatFar.style.color = "#c60005";

  okStat.style.backgroundColor = "#2d8028";
  okStatFar.style.color = "#eff4f8";
  storageStat, storageStatFar, outStat, outStatFar = null;
}

function clickStorage() {
  let okStat = document.getElementById("store-details-ok");
  let okStatFar = document.querySelector(".fa-check-square");
  let storageStat = document.getElementById("store-details-storage");
  let storageStatFar = document.querySelector(".fa-exclamation-triangle");
  let outStat = document.getElementById("store-details-out");
  let outStatFar = document.querySelector(".fa-exclamation-circle");
  let getLabelWithAllStatus = document.querySelector(".store-details-other label");
  getLabelWithAllStatus.style.border = "none";
  let getTablesWithStorageStatus = document.querySelectorAll(".STORAGE");
  getTablesWithStorageStatus.forEach((storage) => {
    storage.style.display = "none"
  })
  let getTablesWithOutStatus = document.querySelectorAll(".OUT_OF_STOCK");
  getTablesWithOutStatus.forEach((out) => {
    out.style.display = "none"
  })
  let getTablesWithOkStatus = document.querySelectorAll(".OK");
  getTablesWithOkStatus.forEach((ok) => {
    ok.style.display = "none"
  })
  getTablesWithStorageStatus.forEach((storage) => {
    storage.style.display = "flex"
  })
  okStat.style.backgroundColor = "#eff4f8";
  okStatFar.style.color = "#2d8028";
  outStat.style.backgroundColor = "#eff4f8";
  outStatFar.style.color = "#c60005";

  storageStat.style.backgroundColor = "#eb8807";
  storageStatFar.style.color = "#eff4f8";
  storageStat, storageStatFar, outStat, outStatFar = null;
}

function clickOut() {
  let okStat = document.getElementById("store-details-ok");
  let okStatFar = document.querySelector(".fa-check-square");
  let storageStat = document.getElementById("store-details-storage");
  let storageStatFar = document.querySelector(".fa-exclamation-triangle");
  let outStat = document.getElementById("store-details-out");
  let outStatFar = document.querySelector(".fa-exclamation-circle");
  let getLabelWithAllStatus = document.querySelector(".store-details-other label");
  getLabelWithAllStatus.style.border = "none";
  okStat.style.backgroundColor = "#eff4f8";
  okStatFar.style.color = "#2d8028";
  storageStat.style.backgroundColor = "#eff4f8";
  storageStatFar.style.color = "#eb8807";


  let getTablesWithStorageStatus = document.querySelectorAll(".STORAGE");
  getTablesWithStorageStatus.forEach((storage) => {
    storage.style.display = "none"
  })
  let getTablesWithOutStatus = document.querySelectorAll(".OUT_OF_STOCK");
  getTablesWithOutStatus.forEach((out) => {
    out.style.display = "none"
  })

  let getTablesWithOkStatus = document.querySelectorAll(".OK");
  getTablesWithOkStatus.forEach((ok) => {
    ok.style.display = "none"
  })
  getTablesWithOutStatus.forEach((out) => {
    out.style.display = "flex"
  })
  outStat.style.backgroundColor = "#c60005";
  outStatFar.style.color = "#eff4f8";
  storageStat, storageStatFar, outStat, outStatFar = null;
}

function clickForSortUpByPrice() {
  let getSortIcon = document.querySelector(".fa-sort");
  let getSortUpIcon = document.querySelector(".fa-sort-up");
  let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
  let getSortByUpTableList = Array.from(getDefultTableList).slice();
  getDefultTableList.forEach((defaultItem) => {
    defaultItem.parentNode.removeChild(defaultItem);
  });

  getSortByUpTableList.sort(compareNumericByUp);
  console.log(getSortByUpTableList);
  for (var i = 0; i < getSortByUpTableList.length; i++) {
    document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
    getSortByUpTableList[i].style.display = "flex";
  }
  getSortIcon.style.display = "none";
  getSortUpIcon.style.display = "inline-block";
}
function clickForSortUpByRating() {
  let getSortIcon = document.querySelector(".fa-sort");
  let getSortUpIcon = document.querySelector(".fa-sort-up");
  let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
  let getSortByUpTableList = Array.from(getDefultTableList).slice();
  getDefultTableList.forEach((defaultItem) => {
    defaultItem.parentNode.removeChild(defaultItem);
  });

  getSortByUpTableList.sort(compareNumericByUp);
  console.log(getSortByUpTableList);
  for (var i = 0; i < getSortByUpTableList.length; i++) {
    document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
    getSortByUpTableList[i].style.display = "flex";
  }
  getSortIcon.style.display = "none";
  getSortUpIcon.style.display = "inline-block";
}
function clickForSortDownByPrice() {
  let getSortUpIcon = document.querySelector(".fa-sort-up");
  let getSortDownIcon = document.querySelector(".fa-sort-down");
  let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
  let getSortByUpTableList = Array.from(getDefultTableList).slice();
  getDefultTableList.forEach((defaultItem) => {
    defaultItem.parentNode.removeChild(defaultItem);
  });

  getSortByUpTableList.sort(compareNumericByDown);
  console.log(getSortByUpTableList);
  for (var i = 0; i < getSortByUpTableList.length; i++) {
    document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
    getSortByUpTableList[i].style.display = "flex";
  }
  getSortUpIcon.style.display = "none";
  getSortDownIcon.style.display = "inline-block";
}

function clickForSortDefaultByPrice() {
  let getSortDownIcon = document.querySelector(".fa-sort-down");
  let getSortIcon = document.querySelector(".fa-sort");

  let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
  let getSortByUpTableList = Array.from(getDefultTableList).slice();
  getDefultTableList.forEach((defaultItem) => {
    defaultItem.parentNode.removeChild(defaultItem);
  });

  getSortByUpTableList.sort(compareNumericByDefultId);
  console.log(getSortByUpTableList);
  for (var i = 0; i < getSortByUpTableList.length; i++) {
    document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
    getSortByUpTableList[i].style.display = "flex";
  }
  getSortIcon.style.display = "inline-block";
  getSortDownIcon.style.display = "none";

}

function compareNumericByUp(a, b) {
  if (+(a.attributes[1].value) > +(b.attributes[1].value)) return 1;
  if (+(a.attributes[1].value) == +(b.attributes[1].value)) return 0;
  if (+(a.attributes[1].value) < +(b.attributes[1].value)) return -1;
}

function compareNumericByDown(a, b) {
  if (+(a.attributes[1].value) > +(b.attributes[1].value)) return -1;
  if (+(a.attributes[1].value) == +(b.attributes[1].value)) return 0;
  if (+(a.attributes[1].value) < +(b.attributes[1].value)) return 1;
}

function compareNumericByDefultId(a, b) {
  if (+(a.attributes[2].value) > +(b.attributes[2].value)) return 1;
  if (+(a.attributes[2].value) == +(b.attributes[2].value)) return 0;
  if (+(a.attributes[2].value) < +(b.attributes[2].value)) return -1;
}
window.onload = () => {
  let store;
  for (var i = storePattern.length - 1; i >= 0; i--) {
    store = document.querySelector(".container-for-stores-list").insertAdjacentHTML("afterBegin", storePattern[i]);
  } //пришлось использовать цикл т.к. строка кода снижу вводила в разметку запятую котрая была в массиве
  //let store=document.querySelector(".container-for-stores-list").insertAdjacentHTML("afterBegin",storePattern);
}
