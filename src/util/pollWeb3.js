import {store} from '../store/'

let pollWeb3 = function (state) {
  console.debug(state)
  
  let ethereum = window.ethereum

  setInterval(() => {
    if (ethereum && store.state.web3.web3Instance) {
       
        let newCoinbase = ethereum.selectedAddress
        store.state.web3.web3Instance().eth.getBalance(ethereum.selectedAddress, function (err, newBalance) {
          if (err) {
            console.log(err)
          } else {
            store.dispatch('pollWeb3', {
              coinbase: newCoinbase,
              balance: parseInt(newBalance, 10)
            })
          }
        })
      
    }
  }, 5000)

  setInterval(() => {
    if (ethereum && store.state.web3.web3Instance) {
        let newCoinbase = ethereum.selectedAddress
        store.dispatch('pollWeb3', {
          coinbase: newCoinbase,
          balance: parseInt(store.state.web3.balance, 10)
        })
      }
  }, 500)

}

export default pollWeb3
