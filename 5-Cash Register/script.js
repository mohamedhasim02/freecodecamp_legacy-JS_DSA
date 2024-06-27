function checkCashRegister(price, cash, cid) {
  const change = (cash - price);
  console.log("PRICE:"+price,"CASH:"+cash,"CHANGE:"+change);
  if(change < 0) return "INSUFFICIENT PAYMENT: CASH AMOUNT BELOW THE PRICE";
  if (change == 0) return "NO CHANGE NEEDED";

  let totalCashInDrawer = getCashInDrawerTotal(cid);
  console.log("CASH-IN-DRAWER:"+totalCashInDrawer.toFixed(2));
  if (totalCashInDrawer < change) return { status: "INSUFFICIENT_FUNDS", change: [] };

  const cashAvailableAfterChangeArray = getCIDavailableAfterChange(cid, change);
  const totalCashAfterChange = twoDec(getCashInDrawerTotal(cashAvailableAfterChangeArray));
  const changeRemaining = twoDec(getChangeRemainingTotalAfterChange(cid, change));


  if (changeRemaining > 0 && totalCashAfterChange > 0)
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  if (changeRemaining == 0 && totalCashAfterChange == 0) {
    const usedChangeArray = getCIDusedChangeOnly(cid, change);
    const closeCID_Arr = emergeCIDwithCIDchanges(cashAvailableAfterChangeArray, usedChangeArray);
    return { status: "CLOSED", change: closeCID_Arr };
  }
  if (changeRemaining == 0 && totalCashAfterChange > 0) {
    const openCID_Arr = getCIDusedChangeOnly(cid, change).reverse();
    return { status: "OPEN", change: openCID_Arr };
  }
  return "UNDEFINED";
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

function twoDec (num) { return parseFloat(num.toFixed(2)); }
function getSubtractorFromCashUnit(cashUnit) {
  let subtractor = 0;
  switch(cashUnit) {
    case "ONE HUNDRED":
      subtractor = 100;
      break;
    case "TWENTY":
      subtractor = 20;
      break;
    case "TEN":
      subtractor = 10;
      break;
    case "FIVE":
      subtractor = 5;
      break;
    case "ONE":
      subtractor = 1;
      break;
    case "QUARTER":
      subtractor = 0.25;
      break;
    case "DIME":
      subtractor = 0.10;
      break;
    case "NICKEL":
      subtractor = 0.05;
      break;
    case "PENNY":
      subtractor = 0.01;
      break;
    default:
      subtractor = 0;
      break;
  }
  return twoDec(subtractor);
}
function getCashInDrawerTotal(cid) {
  let total = 0;
  for (let moneyUnit of cid) {
    total += moneyUnit[1];
  }
  return twoDec(total);
}
function getChangeRemainingTotalAfterChange(cid, originalChange) {
  let changeRemaining = originalChange;

  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining);
    }
  }
  return changeRemaining;
}

function getCIDavailableAfterChange(cid, originalChange) {
  let changeRemaining = originalChange;
  let newArr = [];

  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining);
    }

    newArr.unshift([cashUnit, cashAvailable]);
    //console.log(cashAvailableAfterChangeArray);
  }
  return newArr;
}

function getCIDusedChangeOnly (cid, originalChange) {
  let changeRemaining = originalChange;
  let newArr = [];

  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let totalSubtraction = 0;
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      totalSubtraction = parseFloat(((totalSubtraction + subtractor).toFixed(2)));
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining, "SUBTRACTION:$"+totalSubtraction);
    }
    if(totalSubtraction > 0) {
      newArr.unshift([cashUnit, totalSubtraction]);
      console.log(newArr);
    }
  }
  return newArr;
}
function emergeCIDwithCIDchanges (cid1, cid2_onlyChanges) {
  let newArr = [];
  for (let money2 of cid2_onlyChanges.reverse()) { 
    for (let money1 of cid1){    
      if(money1[0] == money2[0])  
        newArr.push([money2[0], twoDec(money2[1])]); 
      else 
        newArr.push([money1[0], twoDec(money1[1])]); 
    }
  }
  return newArr;
}
