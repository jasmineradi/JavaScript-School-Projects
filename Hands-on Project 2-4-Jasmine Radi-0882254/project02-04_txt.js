/*    JavaScript 7th Edition
      Chapter 2
      Project 02-04

      Application to calculate the cost of a restaurant order plus tax
      Author: Jasmine Radi
      Date:   February 11, 2025

      Filename: project02-04.js
 */
 

// Function to display a numeric value as a text string in the format $##.## 
 function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }

 //Global variables
const CHICKEN_PRICE=10.95;
const HALIBUT_PRICE=13.95;
const BURGER_PRICE=9.95;
const SALMON_PRICE=18.95;
const SALAD_PRICE=7.95;
const SALES_TAX=0.07;

document.getElementById("chicken").onclick = calcTotal;
document.getElementById("halibut").onclick = calcTotal;
document.getElementById("burger").onclick = calcTotal;
document.getElementById("salmon").onclick = calcTotal;
document.getElementById("salad").onclick = calcTotal;


function calcTotal() {
   let cost=0;
   let buyChicken=document.getElementById("chicken").checked;
   let buyHalibut=document.getElementById("halibut").checked;
   let buyBurger=document.getElementById("burger").checked;
   let buySalmon=document.getElementById("salmon").checked;
   let buySalad=document.getElementById("salad").checked;

   (buyChicken) ? cost += CHICKEN_PRICE : 0;
   (buyHalibut) ? cost += HALIBUT_PRICE : 0;
   (buyBurger) ? cost += BURGER_PRICE : 0;
   (buySalmon) ? cost += SALMON_PRICE : 0;
   (buySalad) ? cost += SALAD_PRICE : 0;

   document.getElementById("foodTotal").innerHTML = formatCurrency(cost);
   let tax = cost * SALES_TAX;

   document.getElementById("foodTax").innerHTML = formatCurrency(tax);
   let  totalCost = cost + tax;

   document.getElementById("totalBill").innerHTML = formatCurrency(totalCost); 

}

