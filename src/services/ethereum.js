const Web3 = require('web3');
const constants = require('./constants');
const ethUtil = require('ethereumjs-util')
const abiDecoder = require("abi-decoder")
const env = require("../env")
module.exports = class EthereumService {
  constructor(campainAddr){
    this.rpc = new Web3(new Web3.providers.HttpProvider(env.endpoints.ethScan, 3000));
    this.contract = new this.rpc.eth.Contract(constants.CONTRACT_ABI, campainAddr);
  }

  version() {
    return this.rpc.version.api;
  }

  getCampaignDetail() {
    return this.networkContract.methods.getCampagnDetail().call();
  }

  sendRawTransaction(tx) {
    return new Promise((resolve, reject) => {
      try {
        this.rpc.eth.sendSignedTransaction(
          ethUtil.bufferToHex(tx.serialize()), (error, hash) => {
            if (error != null) {
              reject(error)
            } else {
              resolve(hash)
            }
          })
      } catch (e) {
        console.log(e)
        reject(e)
      }
      
    })
  }


  donateData(tokenAddr, amountTwei, delegatorAddr){
    return new Promise((resolve, reject) => {
      try {
        const kyberProxyAddr = ""
        const maxDestAmount = ""
        const minConversionRate = ""
        const walletId = null
        var data = this.ieoTokenContract.methods.contribute(
          kyberProxyAddr, tokenAddr, amountTwei, delegatorAddr, 
          maxDestAmount, minConversionRate, walletId
        ).encodeABI()
        resolve(data)
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}


