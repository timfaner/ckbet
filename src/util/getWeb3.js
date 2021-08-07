import Web3 from 'web3'
import {CONFIG} from './polyjuiceConfig'

import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3'

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise(function (resolve) {
  // Check for injected web3 (mist/metamask)
  // var web3js = window.web3
  // console.log(CONFIG)


  const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL
  const providerConfig = {
    rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
    ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
    web3Url: godwokenRpcUrl
  }
  const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig)
  const web3 = new Web3(provider)


  resolve({
    injectedWeb3: false,
    web3 () {
      return web3
    }
  })
})
  .then(result => {
    return new Promise(function (resolve) {
      const coinbase = window.ethereum.selectedAddress;
      console.log(coinbase)
      result = Object.assign({}, result, { coinbase })
      resolve(result)
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })

export default getWeb3
