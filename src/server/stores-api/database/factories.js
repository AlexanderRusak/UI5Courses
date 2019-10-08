'use strict';
const app = require('../server/server');

app.seeder.createFactory('Store', {
  'Name'       : '{{company.companyName}}',
  'Email'      : '{{internet.email}}',
  'PhoneNumber': '{{phone.phoneNumber}}',
  'Address'    : '{{address.stateAbbr}}, {{address.cityPrefix}}, {{address.streetAddress}}',
  'Established': '{{date.past}}',
  'FloorArea'  : '{{random.number({"min":1000, "max":10000})}}'
});

app.seeder.createFactory('Product', {
  'Name'                 : '{{commerce.productName}}',
  'Price'                : '{{random.number({"min":1000, "max":10000})}}',
  'Photo'                : '{{image.avatar}}',
  'Specs'                : '{{lorem.paragraph}}',
  'Rating'               : '{{random.number({"min":1, "max":5})}}',
  'SupplierInfo'         : '{{lorem.paragraph}}',
  'MadeIn'               : '{{address.country}}',
  'ProductionCompanyName': "{{company.companyName}}",
  'Status'               : '{{random.arrayElement(["OK", "STORAGE", "OUT_OF_STOCK"])}}',
  'StoreId'              : '{{random.number({"min":1, "max":10})}}'
});

app.seeder.createFactory('ProductComment', {
  'Author'   : '{{name.firstName}} {{name.lastName}}',
  'Message'  : '{{lorem.paragraph}}',
  'Rating'   : '{{random.number({"min":1, "max":10})}}',
  'Posted'   : '{{date.past}}',
  'ProductId': '{{random.number({"min":1, "max":100})}}',
});

// app.seeder.createFactory('Store2Product', {
//   'StoreId'      : '{{random.number({"min":1, "max":10})}}',
//   'ProductId'    : '{{random.number({"min":1, "max":100})}}'
// });