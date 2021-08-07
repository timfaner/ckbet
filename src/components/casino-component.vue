<template>
  <div class="casino container">
    <p>=💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰=</p>
    <h1>Welcome to the Casino 欢迎来到CKBet</h1>
    <p>=💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰💰===💰=</p>
    <h4>First: Enter amount of ckb you want to bet💵</h4>
    <h3>Amount to bet: <input v-model="amount" placeholder="0 ckb"></h3>

    <h4>Then: ⬇️⬇️⬇️ pick a number between 1 and 10, and good lock! ⬇️⬇️⬇️</h4>
    <ul>
      <li v-on:click="clickNumber">1</li>
      <li v-on:click="clickNumber">2</li>
      <li v-on:click="clickNumber">3</li>
      <li v-on:click="clickNumber">4</li>
      <li v-on:click="clickNumber">5</li>
      <li v-on:click="clickNumber">6</li>
      <li v-on:click="clickNumber">7</li>
      <li v-on:click="clickNumber">8</li>
      <li v-on:click="clickNumber">9</li>
      <li v-on:click="clickNumber">10</li>
    </ul>
    <p v-if="pending">  正在投骰子中🎲🎲🎲🎲  </p> 
    <img v-if="pending" id="loader" src="https://media.giphy.com/media/Y2ZUWLrTy63j9T6qrK/giphy.gif">
    <div class="event" v-if="winEvent">
      <p v-if="winEvent._status" id="has-won"><i aria-hidden="true" class="fa fa-check"></i> 🎉🎉Congragulations, you have won {{winEvent._amount/100000000}} CKB</p>
      <p v-else id="has-lost"><i aria-hidden="true" class="fa fa-times"></i> 🤪🤪Sorry you lost, try again 🙌🙌 </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'casino',
  data () {
    return {
      amount: null,
      pending: false,
      winEvent: null
    }
  },
  methods: {
    clickNumber (event) {
      console.log('BETTING ON NUMBER, AMOUNT', event.target.innerHTML, this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().methods.bet(event.target.innerHTML).send({
        gas: 6000000,
        value: this.amount * 100000000,
        from: this.$store.state.web3.coinbase
      }).on('receipt', (receipt) =>{
        console.log(receipt)
        this.pending = false
        console.log("Receipt")
        this.winEvent = receipt.events.Won.returnValues
      }).on('error', (error) =>{
        console.error(error)
        this.pending = false
        alert("Network error, please try again")
      })


        }

    
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
</script>

<style scoped>
.casino {
     margin-top: 50px;
     text-align:center;
}
#loader {
  width:150px;
}
ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color:red;
}
</style>
