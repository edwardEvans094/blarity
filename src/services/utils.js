import BigNumber from 'bignumber.js'

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function toTWei(number, decimal = 18) {
  //console.log({number, decimal})
  var bigNumber = new BigNumber(number.toString())
  if (bigNumber == 'NaN' || bigNumber == 'Infinity') {
    return number
  } else {

    return bigNumber.times(Math.pow(10, decimal)).toFixed(0)
  }
}

export function gWeiToEther(number) {
  //console.log({number, decimal})
  var bigNumber = new BigNumber(number.toString())
  if (bigNumber == 'NaN' || bigNumber == 'Infinity') {
    return number
  } else {
    return bigNumber.div(Math.pow(10, 9)).toFixed()
  }
}

export function gWeiToWei(number) {
  //console.log({number, decimal})
  var bigNumber = new BigNumber(number.toString())
  if (bigNumber == 'NaN' || bigNumber == 'Infinity') {
    return number
  } else {

    return bigNumber.times(Math.pow(10, 9)).toFixed(0)
  }
}

export function biggestNumber() {
  var initNumber = new BigNumber(2)
  return "0x" + (initNumber.pow(255).toString(16))
}




export function createRawTx (value, to, data){
  const gasLimit = 5000000
  const gasPrice = gWeiToWei(20)

  return {
    to: to,
    value: toTWei(value),
    gas: gasLimit,
    gasPrice: gasPrice,
    data: data
  }
}

