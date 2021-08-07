import Web3 from 'web3'
import {address, ABI} from './constants/casinoContract'
import {CONFIG} from './polyjuiceConfig'
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3'

let getContract = new Promise(function (resolve) {
  const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL
  const providerConfig = {
    rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
    ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
    web3Url: godwokenRpcUrl
  }
  const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig)
  const web3 = new Web3(provider)
  let casinoContract = new web3.eth.Contract(ABI,address)
  console.log(casinoContract)

  resolve(casinoContract)
})

export default getContract
