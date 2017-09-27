<template>
  <span class="buy">
      <span class="operation" :style="{'width':width+'px'}">
        <i class="crease"
           :class="buyData<=minData?'none':''"
           @click.self="_decrease">-</i>
        <span class="input" :style="{'width':width-58+'px'}">
          <input type="text"
                 :value="buyData"
                 @input="handleInput">
        </span>
        <i class="crease"
           :class="buyData>=maxData?'none':''"
           @click.self="_increase">+</i>
      </span>
  </span>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      minCount:{
        type:Number,
        default:0
      },
      maxCount:{
        type:Number,
        default:1
      },
      buyCount:{
        type:Number,
        default:0
      },
      width:{
        type:Number,
        default:120
      }
    },
    data(){
      return{
        minData:0,
        maxData:0,
        buyData:0
      }
    },
    methods:{
      _setData(){
        this.minData = this.minCount;
        this.maxData = this.maxCount;
        this.buyData = this.buyCount;
      },
      _decrease(){
        this.buyData--;
        if(this.buyData<this.minData){
          return false
        }
        this.$emit('_decrease')
      },
      _increase(){
        this.buyData++;
        if(this.buyData>this.maxCount){
          return false
        }
        this.$emit('_increase')
      },
      _watch(){
        this.$watch('buyData', function (n, o) {
          let reg = /^[0-9]*[1-9][0-9]*$/;
          if (!reg.test(n)) {
            this.buyData = this.minData;
            this.$emit('input', this.buyData);
            this.$emit('change', this.buyData);
          }
          if(n<=this.minData){
            return false
          }
          if (n > this.maxCount) {
            this.$message.warning('超出最大采购量！');
            this.buyData = this.maxCount;
            return false
          }
        });
      },
      handleInput(event){
        this.buyData = Math.abs(event.target.value);
        let reg = /^[0-9]*[1-9][0-9]*$/;
        if (!reg.test(this.buyData)) {
          this.buyData = this.minData;
        }
        if(this.buyData<=this.minData){
          return false
        }
        if (this.buyData >= this.maxCount) {
          this.$message.warning('超出最大采购量！');
          this.buyData = this.maxCount;
        }
        this.$emit('input', this.buyData);
        this.$emit('change', this.buyData);
      }
    },
    created(){
      this._watch();
      this._setData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "counter.styl"
</style>
