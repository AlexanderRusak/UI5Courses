/**
 * Using pattern mvc
  @module view
  @method {function} overlayDialog -returns element for overlay
  @method {function} generateStoreList -@param {array} arrayList -generates all stores list in DOM
  @method {function} openDialogWindowForCreateStore - open modal window for creating new store and closing modal window when you press esc button
  @method {function} getInfoAboutNewStore -returns array with information about new store
  @method {function} generateStars @param {number} countStars -returns HTML with rating where  @param {number} countStars counts of full rating stars
  @method {function} localIndex -get Local index for tableId
  @method {function} unclickedOdject -display header of table when click on store and hide picture
  @method {function} deleteProductInTable - method for delete information from DOM when you choose another store
  @method {function} setLocalIndex - magic method for set localIndex
  @method {function} insertTable - @param {array} arrayOfTableList -generates HTML for product and stores data then insert that HTML in DOM
  @method {function} insertDetailsOfStore -@param {array} arrayList -generates and inserts HTML in DOM with stores information
  @method {function} onInputSearch - search in stores list
  @method {function} onClearInputSearch -clear input for search
  @method {function} getElementsForDetailsStatistics - returns  elements for details of store
  @method {function} onClickAll -returns all shops in table
  @method {function} onClickOk -returns shops with ok status in table
  @method {function} onClickStorage - returns shops with storage status in table
  @method {function} onClickOut  - returns shops with OUT_OF_STOCK status in table
  @method {function} onClickSort - sort by price
  @method {function} openDialogWindowForCreateProduct -open modal window for creating new product and closing modal window when you press esc button
  @method {function} getInfoAboutNewProduct -gets information from form for creating new product and returns it
  @method {function} validation - validate and add styles for inputs
  @method {function} unValidation - unvalidate and remove styles for inputs
  @method {function} openDialogWindowForQustion - open modal window for question
  @method {function} getProductId -
  @method {function} deleteProductFromTable @param {number} compareId - fake delete product from table
  @method {function} openDialogWindowForStoreQustion - question delete or cancel store
  @method {function} deleteStoretFromDOM - fake delete store
  @method {function} setEditIndex
  @method {function} openDialogWindowForEditProduct -open modal window for edition  product and closing modal window when you press esc button
  @method {function} generateEditArrayOfDataProduct -generates display data and set in input
  @method {function} editArrayOfDataProduct -returns array with new data for edition
 */




var view = {
  overlayDialog: function() {
    let overlay = document.getElementsByClassName("overlay");
    return overlay;
  },
  generateStoreList: function(arrayList) {
    arrayList = JSON.parse(arrayList);
    storePattern = arrayList.map((storeList, index) => {
      return (`<section id="store-pattern-${storeList.id}" localIndex="${index+1}"  onclick="controller.onClickStore(this.id,this)"  class="store-pattern">
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

  },
  openDialogWindowForCreateStore: function() {
    let overlayCreateStore = this.overlayDialog()[0];
    overlayCreateStore.style.opacity = "1";
    overlayCreateStore.style.visibility = "visible";
    document.onkeydown = function(escape) {
      escape = escape || window.event;
      if (escape.keyCode == 27) {
        overlayCreateStore.style.opacity = "0.0";
        overlayCreateStore.style.visibility = "hidden";
      }
    };
  },
  getInfoAboutNewStore: function() {
    let storeName = document.getElementsByName("store-name")[0].value;
    let storeEmail = document.getElementsByName("store-email")[0].value;
    let storePhoneNumber = document.getElementsByName("store-phone-number")[0].value;
    let storeAddress = document.getElementsByName("store-address")[0].value;
    let storeEstablishedDate = document.getElementsByName("store-date")[0].value;
    let storeFloorArea = document.getElementsByName("store-floor-area")[0].value;
    let newStore = {
      "Name": `${storeName}`,
      "Email": `${storeEmail}`,
      "PhoneNumber": `${storePhoneNumber}`,
      "Address": `${storeAddress}`,
      "Established": `${storeEstablishedDate}`,
      "FloorArea": parseInt(`${storeFloorArea}`),
      "id": null
    }
    return newStore;
  },
  generateStars: function(countStars) { //  моя любимая функция ну хотя бы не for )))))))
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
  },
  localIndex: {
    getLocalIndex: "0",
  },
  unclickedOdject: function() {
    let displayHeaderOfTable = document.getElementById("displayTable");
    let unClickedDisplayStore = document.getElementById("unClickedDisplayStore");
    let headerSelect = document.getElementById("header-selected");
    displayHeaderOfTable.style.display = "block";
    unClickedDisplayStore.style.display = "none";
    if (headerSelect != null) {
      headerSelect.style.display = "none";
    }

  },
  deleteProductInTable: function() {
    let deleteDisplayTable = document.getElementsByClassName("for-stores-list-row-pattern");
    let deleteDetailData = document.getElementsByClassName("store-details-main-info-label");
    let deleteDetailOtherData = document.getElementsByClassName("store-details-other");

    function deleteProducts(displayTableArray) {
      while (displayTableArray.length > 0) {
        displayTableArray[0].parentNode.removeChild(displayTableArray[0]);
      }
    }
    deleteProducts(deleteDisplayTable);
    deleteProducts(deleteDetailData);
    deleteProducts(deleteDetailOtherData);

  },
  setLocalIndex: function() {
    var localIndex = arguments[0].getAttribute("localindex");
    view.localIndex.getLocalIndex = localIndex;
  },
  insertTable: function(arrayOfTableList) {
    arrayOfTableList = JSON.parse(arrayOfTableList);

    let storePatternTable = arrayOfTableList.map((tableList) => {

      return (`
          <pattern  class="for-stores-list-row-pattern ${tableList.Status}" price="${tableList.Price}" id="${tableList.id}" raiting="${tableList.Rating}" store-table-index=${view.localIndex.getLocalIndex} name="${tableList.Name}">
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
              ${view.generateStars(tableList.Rating)}
            </section>
            <section onclick="controller.editStoreProduct(${tableList.id})"  class="for-stores-list-header-button">
              <button><i class="fas fa-pen"></i></button>
            </section>
            <section onclick="controller.deleteStoreProduct(${tableList.id})" class="for-stores-list-header-button">
              <button><i class="far fa-times-circle"></i></button>
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
                <label onclick="controller.clickAll()" for="number-of-some-info">${storeOtherDetailPatternLength}<p>All</p></label>
                <ul class="store-details-statistics">
                  <li>
                    <section id="store-details-ok" onclick="controller.clickOk()"><i class="far fa-check-square"></i></section>
                    <p class="statistics-check" for="">OK</p>
                  </li>
                  <p class="statistics-index">${statOk}</p>
                  <li>
                    <section id="store-details-storage" onclick="controller.clickStorage()"><i class="fas fa-exclamation-triangle"></i></section>
                    <p class="statistics-check" for="">Storage</p>
                  </li>
                  <p class="statistics-index">${statStorage}</p>
                  <li>
                    <section id="store-details-out" onclick="controller.clickOut()"><i class="fas fa-exclamation-circle"></i></section>
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
        <label onclick="controller.clickAll()" for="number-of-some-info">0<p>All</p></label>
        <ul class="store-details-statistics">
          <li>
            <section id="store-details-ok" onclick="controller.clickOk()"><i class="far fa-check-square"></i></section>
            <p class="statistics-check" for="">OK</p>
          </li>
          <p class="statistics-index">0</p>
          <li>
            <section id="store-details-storage" onclick="controller.clickStorage()"><i class="fas fa-exclamation-triangle"></i></section>
            <p class="statistics-check" for="">Storage</p>
          </li>
          <p class="statistics-index">0</p>
          <li>
            <section id="store-details-out" onclick="controller.clickOut()"><i class="fas fa-exclamation-circle"></i></section>
            <p class="statistics-check" for="">Out of stock</p>
          </li>
          <p class="statistics-index">0</p>
        </ul>
      </pattern>`;
    let storeOtherDetailPatternInsert;
    if (storeOtherDetailPatternLength <= 0) {
      storeOtherDetailPatternInsert = document.querySelector(".store-details-other-container").insertAdjacentHTML("beforeEnd", storeDetailEmpty);
    } else {
      storeOtherDetailPatternInsert = document.querySelector(".store-details-other-container").insertAdjacentHTML("beforeEnd", storeOtherDetailPattern[storeOtherDetailPatternLength - 1]);
    }


  },
  insertDetailsOfStore: function(arrayList) {
    arrayOfTableList = JSON.parse(arrayList);
    let storeDetailPattern = arrayOfTableList.map((detail) => { // здесь я преобразую дату в нужный вид
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
    storeOtherDetailData = document.querySelector(".store-details-main-info").insertAdjacentHTML("beforeEnd", storeDetailPattern[view.localIndex.getLocalIndex - 1]);
  },
  onInputSearch: function() {
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
  },
  onClearInputSearch: function() {
    let getPatternElements = document.getElementsByClassName("store-pattern");
    let getPatternElementsArr = Array.from(getPatternElements); // привели htmlcollection к js массиву
    let searchResult = document.getElementById("stores-search"); /////строка для поиска
    getPatternElementsArr.forEach((sectionPattern, index) => {
      getPatternElements[index].style.display = "block";
    });
    searchResult.value = "";
  },
  getElementsForDetailsStatistics: function() {
    let elementsForStatistics = {
      okStat: document.getElementById("store-details-ok"),
      okStatFar: document.querySelector(".fa-check-square"),
      storageStat: document.getElementById("store-details-storage"),
      storageStatFar: document.querySelector(".fa-exclamation-triangle"),
      outStat: document.getElementById("store-details-out"),
      outStatFar: document.querySelector(".fa-exclamation-circle"),
      getLabelWithAllStatus: document.querySelector(".store-details-other label"),
    }
    return elementsForStatistics;
  },
  onClickAll: function() {
    let elementsArray = view.getElementsForDetailsStatistics();
    let getTablesWithAllStatus = document.querySelectorAll(".for-stores-list-row-pattern");
    elementsArray.getLabelWithAllStatus.style.border = "none";
    elementsArray.getLabelWithAllStatus.style.border = "2px solid #353535";
    getTablesWithAllStatus.forEach((all) => {
      all.style.display = "flex";
    })
    elementsArray.okStat.style.backgroundColor = "#eff4f8";
    elementsArray.okStatFar.style.color = "#2d8028";
    elementsArray.storageStat.style.backgroundColor = "#eff4f8";
    elementsArray.storageStatFar.style.color = "#eb8807";
    elementsArray.outStat.style.backgroundColor = "#eff4f8";
    elementsArray.outStatFar.style.color = "#c60005";

  },
  onClickOk: function() {
    let elementsArray = view.getElementsForDetailsStatistics();
    elementsArray.getLabelWithAllStatus.style.border = "none";
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
    elementsArray.storageStat.style.backgroundColor = "#eff4f8";
    elementsArray.storageStatFar.style.color = "#eb8807";
    elementsArray.outStat.style.backgroundColor = "#eff4f8";
    elementsArray.outStatFar.style.color = "#c60005";
    elementsArray.okStat.style.backgroundColor = "#2d8028";
    elementsArray.okStatFar.style.color = "#eff4f8";


  },
  onClickStorage: function() {
    let elementsArray = view.getElementsForDetailsStatistics();
    elementsArray.getLabelWithAllStatus.style.border = "none";
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
    elementsArray.okStat.style.backgroundColor = "#eff4f8";
    elementsArray.okStatFar.style.color = "#2d8028";
    elementsArray.outStat.style.backgroundColor = "#eff4f8";
    elementsArray.outStatFar.style.color = "#c60005";
    elementsArray.storageStat.style.backgroundColor = "#eb8807";
    elementsArray.storageStatFar.style.color = "#eff4f8";
  },
  onClickOut: function() {
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
  },
  onClickSort: function() {
    let sorter = {
      sortUpByPrice: function(sortfunction) {
        let getSortIcon = document.querySelector(".for-stores-list-header-price .fa-sort");
        let getSortUpIcon = document.querySelector(".for-stores-list-header-price .fa-sort-up");
        let getDefultTableList = document.querySelectorAll(" .for-stores-list-row-pattern");
        let getSortByUpTableList = Array.from(getDefultTableList).slice();
        getDefultTableList.forEach((defaultItem) => {
          defaultItem.parentNode.removeChild(defaultItem);
        });

        getSortByUpTableList.sort(sortfunction);
        for (var i = 0; i < getSortByUpTableList.length; i++) {
          document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
          getSortByUpTableList[i].style.display = "flex";
        }
        getSortIcon.style.display = "none";
        getSortUpIcon.style.display = "inline-block";
      },
      sortDownByPrice: function(sortfunction) {
        let getSortUpIcon = document.querySelector(".for-stores-list-header-price .fa-sort-up");
        let getSortDownIcon = document.querySelector(".for-stores-list-header-price .fa-sort-down");
        let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
        let getSortByUpTableList = Array.from(getDefultTableList).slice();
        getDefultTableList.forEach((defaultItem) => {
          defaultItem.parentNode.removeChild(defaultItem);
        });

        getSortByUpTableList.sort(sortfunction);
        for (var i = 0; i < getSortByUpTableList.length; i++) {
          document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
          getSortByUpTableList[i].style.display = "flex";
        }
        getSortUpIcon.style.display = "none";
        getSortDownIcon.style.display = "inline-block";
      },
      sortByDefault: function(sortfunction) {
        let getSortDownIcon = document.querySelector(" .fa-sort-down");
        let getSortIcon = document.querySelector(" .fa-sort");

        let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
        let getSortByUpTableList = Array.from(getDefultTableList).slice();
        getDefultTableList.forEach((defaultItem) => {
          defaultItem.parentNode.removeChild(defaultItem);
        });

        getSortByUpTableList.sort(sortfunction);
        for (var i = 0; i < getSortByUpTableList.length; i++) {
          document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
          getSortByUpTableList[i].style.display = "flex";
        }
        getSortIcon.style.display = "inline-block";
        getSortDownIcon.style.display = "none";
      },
      sortUpByName: function(sortfunction) {
        let getSortIcon = document.querySelector(".for-stores-list-header-name .fa-sort");
        let getSortUpIcon = document.querySelector(".for-stores-list-header-name .fa-sort-up");
        let getDefultTableList = document.querySelectorAll(" .for-stores-list-row-pattern");
        let getSortByUpTableList = Array.from(getDefultTableList).slice();
        getDefultTableList.forEach((defaultItem) => {
          defaultItem.parentNode.removeChild(defaultItem);
        });

        getSortByUpTableList.sort(sortfunction);
        for (var i = 0; i < getSortByUpTableList.length; i++) {
          document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
          getSortByUpTableList[i].style.display = "flex";
        }
        getSortIcon.style.display = "none";
        getSortUpIcon.style.display = "inline-block";
      },
      sortDownByName: function(sortfunction) {
        let getSortUpIcon = document.querySelector(".for-stores-list-header-name .fa-sort-up");
        let getSortDownIcon = document.querySelector(".for-stores-list-header-name .fa-sort-down");
        let getDefultTableList = document.querySelectorAll(".for-stores-list-row-pattern");
        let getSortByUpTableList = Array.from(getDefultTableList).slice();
        getDefultTableList.forEach((defaultItem) => {
          defaultItem.parentNode.removeChild(defaultItem);
        });

        getSortByUpTableList.sort(sortfunction);
        for (var i = 0; i < getSortByUpTableList.length; i++) {
          document.querySelector(".for-stores-list-header").insertAdjacentHTML("beforeEnd", getSortByUpTableList[i].outerHTML);
          getSortByUpTableList[i].style.display = "flex";
        }
        getSortUpIcon.style.display = "none";
        getSortDownIcon.style.display = "inline-block";
      },
    }

    return sorter;
  },
  openDialogWindowForCreateProduct: function() {
    let overlay = document.getElementsByClassName("overlay");
    overlay[1].style.opacity = "1";
    overlay[1].style.visibility = "visible";
    document.onkeydown = function(escape) {
      escape = escape || window.event;
      if (escape.keyCode == 27) {
        overlay[1].style.opacity = "0.0";
        overlay[1].style.visibility = "hidden";
      }
    };
  },
  getInfoAboutNewProduct: function() {
    let chosenTable = document.getElementsByClassName("store-details-main-info-label");
    let chosenTableId = chosenTable[0].attributes[1].value;
    let url = `http://localhost:3000/api/Stores/${chosenTableId}/rel_Products`;
    let productName = document.getElementsByName("product-name")[0].value;
    let productPrice = +document.getElementsByName("product-price")[0].value;
    let productSpecs = document.getElementsByName("product-specs")[0].value;
    let productRating = +document.getElementsByName("product-rating")[0].value;
    let productSupInfo = document.getElementsByName("product-supplier-info")[0].value;
    let productMadeIn = document.getElementsByName("product-made-in")[0].value;
    let productCompany = document.getElementsByName("product-company")[0].value;
    let productStatus = document.getElementById("product-status").value;
    let newTableRow = {
      "Name": `${productName}`,
      "Price": +`${productPrice}`,
      "Photo": null,
      "Specs": `${productSpecs}`,
      "Rating": +`${productRating}`,
      "SupplierInfo": `${productSupInfo}`,
      "MadeIn": `${productMadeIn}`,
      "ProductionCompanyName": `${productCompany}`,
      "Status": `${productStatus}`,
      "StoreId": +`${chosenTableId}`,
      "id": null
    }
    let infoAboutNewProduct = {
      productInfo: newTableRow,
      urlPostAddress: url,
    }
    return infoAboutNewProduct;
  },
  validation: function() {
    let inputValidation = Array.from(document.querySelectorAll("input[required]"));
    inputValidation.forEach(item => {
      item.classList.add("req");
    })
  },
  unValidation: function() {
    let inputValidation = Array.from(document.querySelectorAll("input[required]"));
    inputValidation.forEach(item => {
      item.classList.remove("req");
    })
  },
  openDialogWindowForQustion: function() {
    let overlay = document.getElementsByClassName("overlay");
    overlay[2].style.opacity = "1";
    overlay[2].style.visibility = "visible";
    document.onkeydown = function(escape) {
      escape = escape || window.event;
      if (escape.keyCode == 27) {
        overlay[2].style.opacity = "0.0";
        overlay[2].style.visibility = "hidden";
      }
    };
  },
  getProductId: {
    productId: "0"
  },
  deleteProductFromTable: function(compareId) {
    let productTable = document.body.querySelectorAll(".for-stores-list-row-pattern");
    let productTableId = Array.from(document.body.querySelectorAll(".for-stores-list-header-name label"));
    productTableId.forEach((itemID, indexID) => {
      if (itemID.innerText == compareId) {
        productTable[indexID].remove();
      }
    })
  },
  openDialogWindowForStoreQustion: function() {
    let overlay = document.getElementsByClassName("overlay");
    overlay[3].style.opacity = "1";
    overlay[3].style.visibility = "visible";
    document.onkeydown = function(escape) {
      escape = escape || window.event;
      if (escape.keyCode == 27) {
        overlay[3].style.opacity = "0.0";
        overlay[3].style.visibility = "hidden";
      }
    };
  },
  deleteStoretFromDOM: function(storeID) {
    let productStore = Array.from(document.body.querySelectorAll(".container-for-stores-list section"));
    productStore.forEach((itemID, indexID) => {
      currentid = itemID.attributes[0].value.replace(/[^\d,]/g, "", itemID.attributes[0].value)
      if (currentid == storeID) {
        productStore[indexID].remove();
      }
    })
  },
  setEditIndex: {
    editIndex: "0"
  },
  openDialogWindowForEditProduct: function() {
    let overlay = document.getElementsByClassName("overlay");
    overlay[4].style.opacity = "1";
    overlay[4].style.visibility = "visible";
    document.onkeydown = function(escape) {
      escape = escape || window.event;
      if (escape.keyCode == 27) {
        overlay[4].style.opacity = "0.0";
        overlay[4].style.visibility = "hidden";
      }
    };
  },
  generateEditArrayOfDataProduct: function() {
    let editArray = document.getElementById(view.setEditIndex.editIndex);
    let productName = editArray.querySelector(".for-stores-list-header-name h3").innerText;
    let productPrice = editArray.querySelector(".for-stores-list-header-price-2 h3").innerText;
    let productSpecs = editArray.querySelector(".for-stores-list-header-specs p").innerText;
    let productRating = editArray.attributes[3].value;
    let productSupInfo = editArray.querySelector(".for-stores-list-header-supinfo p").innerText;
    let productMadeIn = editArray.querySelector(".for-stores-list-header-country p").innerText;
    let productCompany = editArray.querySelector(".for-stores-list-header-company p").innerText;
    //////
    let setEditName = document.body.querySelectorAll(".form-box input[name=product-name]")[1].value = productName;
    let setEditPrice = document.body.querySelectorAll(".form-box input[name=product-price]")[1].value = productPrice;
    let setEditSpecs = document.body.querySelectorAll(".form-box textarea[name=product-specs]")[1].value = productSpecs;
    let setEditRaiting = document.body.querySelectorAll(".form-box input[name=product-rating]")[1].value = productRating;
    let setEditSupInfo = document.body.querySelectorAll(".form-box textarea[name=product-supplier-info]")[1].value = productSupInfo;
    let setEditMadeIn = document.body.querySelectorAll(".form-box input[name=product-made-in]")[1].value = productMadeIn;
    let setEditCompany = document.body.querySelectorAll(".form-box input[name=product-company]")[1].value = productCompany;

  },
  editArrayOfDataProduct: function() {
    let setEditName = document.body.querySelectorAll(".form-box input[name=product-name]")[1].value;
    let setEditPrice = document.body.querySelectorAll(".form-box input[name=product-price]")[1].value;
    let setEditSpecs = document.body.querySelectorAll(".form-box textarea[name=product-specs]")[1].value;
    let setEditRaiting = +document.body.querySelectorAll(".form-box input[name=product-rating]")[1].value;;
    let setEditSupInfo = document.body.querySelectorAll(".form-box textarea[name=product-supplier-info]")[1].value;
    let setEditMadeIn = document.body.querySelectorAll(".form-box input[name=product-made-in]")[1].value;
    let setEditCompany = document.body.querySelectorAll(".form-box input[name=product-company]")[1].value;
    let storeID=document.body.querySelector(".store-details-main-info-label").attributes[1].value;
    let storeStatus=document.body.querySelector(".update-product-status");
    storeStatus=storeStatus.options[storeStatus.selectedIndex].value;
    let editArray = document.getElementById(view.setEditIndex.editIndex);
    let productName = editArray.querySelector(".for-stores-list-header-name h3").innerText=setEditName;
    let productPrice = editArray.querySelector(".for-stores-list-header-price-2 h3").innerText=setEditPrice;
    let productSpecs = editArray.querySelector(".for-stores-list-header-specs p").innerText=setEditSpecs;
    let productRating = editArray.querySelector(".for-stores-list-header-raiting").innerHTML="";
    productRating = editArray.querySelector(".for-stores-list-header-raiting").innerHTML=view.generateStars(setEditRaiting);
    let productSupInfo = editArray.querySelector(".for-stores-list-header-supinfo p").innerText=setEditSupInfo;
    let productMadeIn = editArray.querySelector(".for-stores-list-header-country p").innerText=setEditMadeIn;
    let productCompany = editArray.querySelector(".for-stores-list-header-company p").innerText=setEditCompany;
    let array = {
      productName: setEditName,
      productPrice: setEditPrice,
      productSpecs: setEditSpecs,
      productRating: setEditRaiting,
      productSupInfo: setEditSupInfo,
      productMadeIn: setEditMadeIn,
      productCompany: setEditCompany,
      storeID:storeID,
      storeStatus:storeStatus,
      productId:view.setEditIndex.editIndex,
    }
    return array;
  }
};





/**
* @module controller
  @method {function} createStoreClick - remove styles to input validation and then add styles to input validation
  @method {function} clickCancelCreateStore -hide modal window for create new store
  @method {function} clickCreateStore - use validate if it needs ajax querry to POST in db new Store
  @method {function} onClickStore  @param {number} id  @param {number} index insert data products of store
  @method {function} clickSearchInInput -call method from view to search in stores list
  @method {function} clickClearSearchInput - call method from view to clear input values
  @method {function} clickAll  - call method from view to display all products of store
  @method {function} clickOk -call method from view to display ok status products of store
  @method {function} clickStorage - call method from view to display storage status products of store
  @method {function} clickOut -call method from view to display OUT_OF_STOCK status products of store
  @method {function} clickSortUpByPrice - sort product in table by up price value
  @method {function} clickSortDownByPrice - sort product in table down up price value
  @method {function} clickSortByDefault -  sort product in table by id or default
  @method {function} clickCreateProduct - open madol window with inputs for new product with validate function
  @method {function} clickCancelCreateProduct - hide modal window with create product
  @method {function} clickCreateNewProduct - POST querry to db to generate new Product
  @method {function} deleteStoreProduct - open modal window with question
  @method {function} clickCancelDeleteProductProduct - hide  modal window with question
  @method {function} confirmDeleteStoreProduct -DELETE query to server for delete chosen product
  @method {function} clickDeleteStore - open modal window with question
  @method {function} clickCancelDeleteStore - hide  modal window with question
  @method {function} clickConfirmDeleteStore   -DELETE query to server for delete chosen store
  @method {function} editStoreProduct -open modal window with current values of edit product
  @method {function} clickEditProduct - PUT query to confirm edit of chosen table with fake edit in DOM
  @method {function} clickCancelEditProduct -hide  modal window with current values of edit product
*/

var controller = {

  createStoreClick: function() {
    view.unValidation();
    view.openDialogWindowForCreateStore();
  },
  clickCancelCreateStore: function() {
    let overlayCreateStore = view.overlayDialog()[0];
    overlayCreateStore.style.opacity = "0.0";
    overlayCreateStore.style.visibility = "hidden";
  },
  clickCreateStore: function() {
    view.validation();
    model.httpGetCreateStores(model.urlToGetCreateStoresList, "POST", view.getInfoAboutNewStore()).then(
        response => console.log(response)),
      error => console.log(`Rejected: ${error}`);
    controller.clickCreateStore();
  },
  onClickStore: function(id, index) {
    view.setLocalIndex(index);
    view.unclickedOdject();
    view.deleteProductInTable();
    let getIDforCurrentTable = id.replace(/[^\d,]/g, "", id);
    urlToGetListOfProducts = `http://localhost:3000/api/Stores/${getIDforCurrentTable}/rel_Products`;
    model.httpGetCreateStores(urlToGetListOfProducts, "GET",null).then(
        response => view.insertTable(response)),
      error => console.log(`Rejected: ${error}`)
    model.httpGetCreateStores(model.urlToGetCreateStoresList, "GET", null).then(
        response => view.insertDetailsOfStore(response)),
      error => console.log(`Rejected: ${error}`)
  },
  clickSearchInInput: function() {
    view.onInputSearch();
  },
  clickClearSearchInput: function() {
    view.onClearInputSearch();
  },
  clickAll: function() {
    view.onClickAll();
  },
  clickOk: function() {
    view.onClickOk();
  },
  clickStorage: function() {
    view.onClickStorage();
  },
  clickOut: function() {
    view.onClickOut();
  },
  clickSortUpByPrice: function() {
    let onSort = view.onClickSort();
    onSort.sortUpByPrice(model.onCompare().compareNumericByUp);
  },
  clickSortDownByPrice: function() {
    let onSort = view.onClickSort();
    onSort.sortDownByPrice(model.onCompare().compareNumericByDown);
  },
  clickSortByDefault: function() {
    let onSort = view.onClickSort();
    onSort.sortByDefault(model.onCompare().compareNumericByDefultId);
  },
  clickCreateProduct: function() {
    view.unValidation();
    view.openDialogWindowForCreateProduct();
  },
  clickCancelCreateProduct: function() {
    let overlayCreateProduct = document.getElementsByClassName("overlay");
    overlayCreateProduct[1].style.opacity = "0.0";
    overlayCreateProduct[1].style.visibility = "hidden";
  },
  clickCreateNewProduct: function() {
    view.validation();
    model.httpGetCreateStores(view.getInfoAboutNewProduct().urlPostAddress, "POST", view.getInfoAboutNewProduct().productInfo).then(
        response => model.clickCancelCreateProduct()),
      error => console.log(`Rejected: ${error}`)
  },
  deleteStoreProduct: function(id) {
    view.openDialogWindowForQustion();
    view.getProductId.productId = id;

  },
  clickCancelDeleteProductProduct: function() {
    let overlayCreateProduct = document.getElementsByClassName("overlay");
    overlayCreateProduct[2].style.opacity = "0.0";
    overlayCreateProduct[2].style.visibility = "hidden";
  },
  confirmDeleteStoreProduct: function() {
    let chosenTable = document.getElementsByClassName("store-details-main-info-label");
    let chosenTableId = chosenTable[0].attributes[1].value;
    model.httpDeleteStores(`http://localhost:3000/api/Stores/${chosenTableId}/rel_Products/${view.getProductId.productId}`, "DELETE").then(
        response => console.log(response)),
      error => console.log(`Rejected: ${error}`);
    view.deleteProductFromTable(view.getProductId.productId);
    controller.clickCancelDeleteProductProduct();
  },
  clickDeleteStore: function() {
    view.openDialogWindowForStoreQustion();
  },
  clickCancelDeleteStore: function() {
    let overlayCreateProduct = document.getElementsByClassName("overlay");
    overlayCreateProduct[3].style.opacity = "0.0";
    overlayCreateProduct[3].style.visibility = "hidden";
  },
  clickConfirmDeleteStore: function() {
    let chosenTable = document.getElementsByClassName("store-details-main-info-label");
    let chosenTableId = chosenTable[0].attributes[1].value;
    model.httpDeleteStores(`http://localhost:3000/api/Stores/${+chosenTableId}`, "DELETE").then(
        response => console.log(response)),
      error => console.log(`Rejected: ${error}`);
    view.deleteStoretFromDOM(chosenTableId);
    controller.clickCancelDeleteStore();
  },
  editStoreProduct: function(id) {
    view.setEditIndex.editIndex = id;
    let editor = document.getElementById(id);
    view.openDialogWindowForEditProduct();
    view.generateEditArrayOfDataProduct();
  },
  clickEditProduct: function() {
    controller.clickCancelEditProduct();
    var editArrayData=model.onEditObject(view.editArrayOfDataProduct());
    model.httpGetCreateStores(`http://localhost:3000/api/Stores/${editArrayData.StoreId}/rel_Products/${editArrayData.id}`,"PUT",editArrayData)

  },
  clickCancelEditProduct: function() {
    let overlayCreateProduct = document.getElementsByClassName("overlay");
    overlayCreateProduct[4].style.opacity = "0.0";
    overlayCreateProduct[4].style.visibility = "hidden";
  }


};



/**
 * @module model
   @method {function} urlToGetCreateStoresList @param {string} urlToGetCreateStoresList
   @method {function} httpGetCreateStores @param {string} url -query address, @param {string} type -type of querries, @param {array} data -array of data
   @method {function} httpDeleteStores @param {string} url -query address, @param {string} type -type of querries
   @method {function} onCompare -function which returns true or false for compare by numeric data in table
   @method {function} onEditObject @param {array} editTable return array with edition data of product which used in PUT querries
 */

var model = {
  urlToGetCreateStoresList: "http://localhost:3000/api/Stores",
  httpGetCreateStores: function(url, type, data) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(type, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (this.status < 400) {
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
      xhr.send(JSON.stringify(data));
    });
  },
  httpDeleteStores: function(url, type) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(type, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (this.status < 400) {
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
      xhr.send(null);
    });
  },
  onCompare: function() { ///model
    let comparer = {
      compareNumericByUp: function(a, b) {
        if (+(a.attributes[1].value) > +(b.attributes[1].value)) return 1;
        if (+(a.attributes[1].value) == +(b.attributes[1].value)) return 0;
        if (+(a.attributes[1].value) < +(b.attributes[1].value)) return -1;
      },
      compareNumericByDown: function(a, b) {
        if (+(a.attributes[1].value) > +(b.attributes[1].value)) return -1;
        if (+(a.attributes[1].value) == +(b.attributes[1].value)) return 0;
        if (+(a.attributes[1].value) < +(b.attributes[1].value)) return 1;
      },
      compareNumericByDefultId: function(a, b) {
        if (+(a.attributes[2].value) > +(b.attributes[2].value)) return 1;
        if (+(a.attributes[2].value) == +(b.attributes[2].value)) return 0;
        if (+(a.attributes[2].value) < +(b.attributes[2].value)) return -1;
      },
      // compareNameByUp:function(a, b) {
      //   if (+(a.attributes[4].value) > +(b.attributes[4].value)) return 1;
      //   if (+(a.attributes[4].value) == +(b.attributes[4].value)) return 0;
      //   if (+(a.attributes[4].value) < +(b.attributes[4].value)) return -1;
      // },
      // compareNameByDown:function(a, b) {
      //   if (+(a.attributes[4].value) > +(b.attributes[4].value)) return -1;
      //   if (+(a.attributes[4].value) == +(b.attributes[4].value)) return 0;
      //   if (+(a.attributes[4].value) < +(b.attributes[4].value)) return 1;
      // },

    }
    return comparer;
  },
  onEditObject: function(editTable) {
    let editTableRow = {
      "Name": `${editTable.productName}`,
      "Price": +`${editTable.productPrice}`,
      "Photo": null,
      "Specs": `${editTable.productSpecs}`,
      "Rating": +`${editTable.productRating}`,
      "SupplierInfo": `${editTable.productSupInfo}`,
      "MadeIn": `${editTable.productMadeIn}`,
      "ProductionCompanyName": `${editTable.productCompany}`,
      "Status": `${editTable.storeStatus}`,
      "StoreId": +`${editTable.storeID}`,
      "id": `${editTable.productId}`,
    }
    return editTableRow;
  }
};

window.onload = () => {
  (function() {

    var app = {
      init: function() {
        this.main();


        model.httpGetCreateStores(model.urlToGetCreateStoresList, "GET").then(
            response => view.generateStoreList(response)),
          error => console.log(`Rejected: ${error}`);

        this.event();

      },
      main: function() {

      },
      event: function() {
        var createStoresList = document.getElementById("btnCreateStoresList");
        createStoresList.onclick = controller.createStoreClick;
        var createNewStore = document.getElementById("create-store");
        createNewStore.onclick = controller.clickCreateStore;
        var cancelCreateStore = document.getElementById("cancel-create-store");
        cancelCreateStore.onclick = controller.clickCancelCreateStore;
        var clickSearch = document.getElementById("btn-search-in-input");
        clickSearch.onclick = controller.clickSearchInInput;
        var clickClear = document.getElementById("btn-clear-search");
        clickClear.onclick = controller.clickClearSearchInput;
        var sortUpByPrice = document.getElementById("sortUpByPrice");
        sortUpByPrice.onclick = controller.clickSortUpByPrice;
        var sortDownByPrice = document.getElementById("sortDownByPrice");
        sortDownByPrice.onclick = controller.clickSortDownByPrice;
        var sortByDefault = document.getElementById("sortByDefault");
        sortByDefault.onclick = controller.clickSortByDefault;
        // var sortUpByName = document.getElementById("sortUpByName");
        // sortUpByName.onclick = controller.clickSortUpByName;
        // var sortDownByName = document.getElementById("sortDownByName");
        // sortDownByName.onclick = controller.clickSortDownByName;
        var sortDownByPrice = document.getElementById("sortDownByPrice");
        sortDownByPrice.onclick = controller.clickSortDownByPrice;
        var createProduct = document.getElementById("btnCreateProduct");
        createProduct.onclick = controller.clickCreateProduct;
        var cancelCreateProduct = document.getElementById("cancel-create-product");
        cancelCreateProduct.onclick = controller.clickCancelCreateProduct;
        var createNewProduct = document.getElementById("create-product");
        createNewProduct.onclick = controller.clickCreateNewProduct;
        var cancelDeleteProduct = document.getElementById("cancel-delete-product");
        cancelDeleteProduct.onclick = controller.clickCancelDeleteProductProduct;
        var deleteProductFromTable = document.getElementById("delete-product");
        deleteProductFromTable.onclick = controller.confirmDeleteStoreProduct;
        var deleteStore = document.getElementById("deleteStore");
        deleteStore.onclick = controller.clickDeleteStore;
        var cancelDeleteStore = document.getElementById("cancel-delete-store");
        cancelDeleteStore.onclick = controller.clickCancelDeleteStore;
        var confirmDeleteStore = document.getElementById("delete-store");
        confirmDeleteStore.onclick = controller.clickConfirmDeleteStore;
        var editProduct = document.getElementById("update-product");
        editProduct.onclick = controller.clickEditProduct;
        var cancelEditProduct = document.getElementById("cancel-update-product");
        cancelEditProduct.onclick = controller.clickCancelEditProduct;
      }
    };
    app.init();
  }());
}
