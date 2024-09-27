const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// 1. Create an endpoint that takes a newItemPrice and cartTotal as a query parameter and returns total cart value.
function totalCartValue(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCartValue(newItemPrice, cartTotal).toString());
});

// 2. Create an endpoint that takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.
function isMemberDiscount(cartTotal, isMember) {
  if (isMember === 'true') {
    let discount = cartTotal - cartTotal * (10 / 100);
    return discount;
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(isMemberDiscount(cartTotal, isMember).toString());
});

// 3. Create an endpoint that takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.
function totalTax(cartTotal, tax) {
  let taxApplied = cartTotal * (5 / 100);
  return taxApplied;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = parseFloat(req.query.tax);
  res.send(totalTax(cartTotal, tax).toString());
});

// 4. Create an endpoint that takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.
function estimateDelivery(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return (standardDelivery = distance / 50);
  } else shippingMethod === 'express';
  return (expressDelivery = distance / 100);
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());
});

// 5. Create an endpoint that takes weight and distance as query parameters and returns the shipping cost of the packages.
function shippingCost(weight, distance) {
  return weight * distance * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance).toString());
});

// 6. Create an endpoint that takes purchaseAmount as query parameters and returns the loyalty points.
function loyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(loyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
