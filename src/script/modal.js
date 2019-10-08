let buttonForCreateStore = document.getElementsByName("btn-create-for-stores-details");
let overlay = document.getElementsByClassName("overlay");
let cancelCreateStore = document.getElementById("cancel-create-store");



function clickCreateForStoresList() {
  overlay[0].style.opacity = "1";
  overlay[0].style.visibility = "visible";
  document.onkeydown = function(escape) {
    escape = escape || window.event;
    if (escape.keyCode == 27) {
      overlay[0].style.opacity = "0.0";
      overlay[0].style.visibility = "hidden";
    }
  };
}

function clickCreateForStoresDetails() {
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
}
let currentid = 0; /////////////////////fooooooooooooooooooooooo
function setProduct(id) {
  currentid = id;
}

function deleteStoreProduct(currentProduct) {
  let chosenTable = document.getElementsByClassName("store-details-main-info-label");
  let chosenTableId = chosenTable[0].attributes[1].value;
  let productId = currentProduct;
  overlay[2].style.opacity = "1";
  overlay[2].style.visibility = "visible";

  document.onkeydown = function(escape) {
    escape = escape || window.event;
    if (escape.keyCode == 27) {
      overlay[2].style.opacity = "0.0";
      overlay[2].style.visibility = "hidden";
    }
  };
  setProduct(productId);

}
function clickDeleteStore(){
  overlay[3].style.opacity = "1";
  overlay[3].style.visibility = "visible";

  document.onkeydown = function(escape) {
    escape = escape || window.event;
    if (escape.keyCode == 27) {
      overlay[3].style.opacity = "0.0";
      overlay[3].style.visibility = "hidden";
    }
  };
}
function clickCancelCreateStore() {
  overlay[0].style.opacity = "0.0";
  overlay[0].style.visibility = "hidden";
}

function clickCancelCreateStoreDetail() {
  overlay[1].style.opacity = "0.0";
  overlay[1].style.visibility = "hidden";
}

function clickCancelCreateTable() {
  overlay[0].style.opacity = "0.0";
  overlay[0].style.visibility = "hidden";
}

function clickCancelCreateTable() {
  overlay[1].style.opacity = "0.0";
  overlay[1].style.visibility = "hidden";
}

function clickCancelDeleteProductInTable() {
  overlay[2].style.opacity = "0.0";
  overlay[2].style.visibility = "hidden";
  overlay[3].style.opacity = "0.0";
  overlay[3].style.visibility = "hidden";
}

function clickCreateStore() {
  let storeName = document.getElementsByName("store-name")[0].value;
  let storeEmail = document.getElementsByName("store-email")[0].value;
  let storePhoneNumber = document.getElementsByName("store-phone-number")[0].value;
  let storeAddress = document.getElementsByName("store-address")[0].value;
  let storeEstablishedDate = document.getElementsByName("store-date")[0].value;
  let storeFloorArea = +document.getElementsByName("store-floor-area")[0].value;
  let newStore = {
    "Name": `${storeName}`,
    "Email": `${storeEmail}`,
    "PhoneNumber": `${storePhoneNumber}`,
    "Address": `${storeAddress}`,
    "Established": `${storeEstablishedDate}`,
    "FloorArea": `${+storeFloorArea}`,
    "id": null
  }
  postAjaxCall("http://localhost:3000/api/Stores", newStore).then(
      response => console.log(response)),
    error => console.log(`Rejected: ${error}`)

}
function clickDeleteStoreInTable(){
  deleteStore();
  window.location.reload();
}
function clickDeleteProductInTable() {
  clickCancelDeleteProductInTable();
  deleteProduct();
  window.location.reload();
}

function deleteProduct() {
  let chosenTable = document.getElementsByClassName("store-details-main-info-label");
  let chosenTableId = chosenTable[0].attributes[1].value;
  postAjaxDeleteCall(`http://localhost:3000/api/Stores/${+chosenTableId}/rel_Products/${+currentid}`).then(
      response => console.log(response)),
    error => console.log(`Rejected: ${error}`)
}
function deleteStore(){
  let chosenTable = document.getElementsByClassName("store-details-main-info-label");
  let chosenTableId = chosenTable[0].attributes[1].value;
  postAjaxDeleteCall(`  http://localhost:3000/api/Stores/${+chosenTableId}`).then(
      response => console.log(response)),
    error => console.log(`Rejected: ${error}`)
}
function clickCreateProductTable() {
  let chosenTable = document.getElementsByClassName("store-details-main-info-label");
  let chosenTableId = chosenTable[0].attributes[1].value;
  console.log(chosenTableId);
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
    "Price": `${productPrice}`,
    "Photo": null,
    "Specs": `${productSpecs}`,
    "Rating": `${+productRating}`,
    "SupplierInfo": `${productSupInfo}`,
    "MadeIn": `${productMadeIn}`,
    "ProductionCompanyName": `${productCompany}`,
    "Status": `${productStatus}`,
    "StoreId": `${chosenTableId}`,
    "id": null
  }
  postAjaxCall(`http://localhost:3000/api/Stores/${chosenTableId}/rel_Products`, newTableRow).then(
      response => console.log(response)),
    error => console.log(`Rejected: ${error}`)
}

function postAjaxCall(url, data) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('post', url,false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send(JSON.stringify(data));
  });

  // async () => {
  //   const rawResponse = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   const content = await rawResponse.json();
  //
  //   console.log(content);
  // })();
};

function postAjaxDeleteCall(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('DELETE', url);
    req.onload = function() {
      if (req.status == 200 || req.status == 204) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send(null);
  });
};
