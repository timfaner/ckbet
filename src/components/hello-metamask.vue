<template>
  <div class='metamask-info'>
    <p>Network: {{ network }}</p>
    <p>Account: {{ coinbase }}</p>
    <p>Polyjuice account {{polyjuiceAddress}} </p>

    <p> Your balance </p>
    <p>|| {{ ckbBalance }} CKB || {{ckETHBalance}} ckETH <button v-on:click="toDeposit"> {{buttonName}}</button> </p>
    <div v-if="deposit">
      <p> 正在获取部署地址</p>
      <div style="width:300px"> 
      <p>{{ckL2Address}}</p>
      </div>
      <p> 打开 <a target="_blank" href="https://force-bridge-dev.ckbapp.dev/"> Force-bridge </a> 将上述地址粘贴到Recipient中,并稍等1～2min </p>
    </div>
    
  </div>
</template>

<script>

import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
import { AddressTranslator } from 'nervos-godwoken-integration'
export default {
  name: 'hello-metamask',

  data:function() {
    return {
        deposit:false,
        ckL2Address:null
      };
    },
  methods:{
    async toDeposit (){
      this.deposit = !this.deposit
      let res = await new AddressTranslator().getLayer2DepositAddress(this.$store.state.web3.web3Instance(),this.coinbase)
      this.ckL2Address = res.addressString
    },
    
    getL2DepositAddress : () =>{

    }
  },
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: () => NETWORKS[window.ethereum.chainId],
    coinbase: state => state.web3.coinbase,
    polyjuiceAddress : state =>  state.web3.polyJuiceAddress,
    ckETHBalance : state => state.web3.ckETH_balance,
    ckbBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.balance/100000000
    },
    buttonName: function() {if (this.deposit){ return "Close"} else{ return "Deposit"} }
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
