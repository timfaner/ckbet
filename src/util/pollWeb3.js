import {store} from '../store/'
import { AddressTranslator } from 'nervos-godwoken-integration'

let pollWeb3 = function (state) {
  console.debug(state)
  
  let ethereum = window.ethereum



  setInterval(
    async () =>{

        let polyJuiceAddress = store.state.web3.polyJuiceAddress
        let newCoinbase = store.state.web3.coinbase

        let ckETH_balance_inWei = await store.state.sudtInstance().methods.balanceOf(polyJuiceAddress).call()
        store.dispatch('pollWeb3', {
          coinbase: newCoinbase,
          balance: store.state.web3.balance,
          polyJuiceAddress : polyJuiceAddress,
          ckETH_balance: ckETH_balance_inWei/1000000000000000000
          
        })
    },
    15000
  )
  setInterval(() => {
    if (ethereum && store.state.web3.web3Instance) {
       
        let newCoinbase = store.state.web3.coinbase
        let polyJuiceAddress = store.state.web3.polyJuiceAddress
        store.state.web3.web3Instance().eth.getBalance(ethereum.selectedAddress, function (err, newBalance) {
          if (err) {
            console.log(err)
          } else {
            store.dispatch('pollWeb3', {
              coinbase: newCoinbase,
              balance: parseInt(newBalance, 10),
              polyJuiceAddress : polyJuiceAddress,
              ckETH_balance: store.state.web3.ckETH_balance
              
            })
          }
        })
      
    }
  }, 5000)

  setInterval(() => {
    if (ethereum && store.state.web3.web3Instance) {
        let newCoinbase = ethereum.selectedAddress
        let polyJuiceAddress =  new AddressTranslator().ethAddressToGodwokenShortAddress(newCoinbase)
        store.dispatch('pollWeb3', {
          coinbase: newCoinbase,
          balance: store.state.web3.balance,
          polyJuiceAddress : polyJuiceAddress,
          ckETH_balance: store.state.web3.ckETH_balance
        })
      }
  }, 500)

}

export default pollWeb3
