<template>
  <div class='metamask-info'>
    <p>Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p> Your balance </p>
    <p>|| {{ ckbBalance }} CKB ||</p>
    
  </div>
</template>

<script>
//import { AddressTranslator } from 'nervos-godwoken-integration'
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
export default {
  name: 'hello-metamask',
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: () => NETWORKS[window.ethereum.chainId],
    coinbase: state => state.web3.coinbase,
    //polyjuiceAddress : state => new AddressTranslator().ethAddressToGodwokenShortAddress(state.web3.coinbase),
    ckbBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.balance/100000000
    }
  })
}
</script>

<style scoped>
.metamask-info {
  text-align:center;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>
