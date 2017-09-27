<template>
  <div class="timer-wrapper">
    <div class="timer-box">
      <span class="timer">{{decreaseDate.day}}天{{decreaseDate.hour}}小时{{decreaseDate.minute}}分{{decreaseDate.second}}秒</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      endTime: {
        type: String,
      }
    },
    data(){
      return{
        time:'',
        decreaseDate:{
          day: '',
          hour: '',
          minute: '',
          second: ''
        }
      }
    },
    methods:{
      _getTime(){
        let newTime = this.endTime;
        let ntime = this._splitCurrentDate(newTime);
        let _this = this;
        let timer = null;
        function decrease() {//计算结束时间
          let leftTime = (new Date(ntime.year, ntime.month - 1, ntime.day, ntime.hour, ntime.minute, ntime.second)) - (new Date()); //计算剩余的毫秒数
          let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
          let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
          let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
          let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
          if(days <= 0 && hours <=0 && minutes <=0 && seconds <=0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
            window.clearInterval(timer)
          }
          days = _this._checkTime(days);
          hours = _this._checkTime(hours);
          minutes = _this._checkTime(minutes);
          seconds = _this._checkTime(seconds);
          _this.decreaseDate.day = days;
          _this.decreaseDate.hour = hours;
          _this.decreaseDate.minute = minutes;
          _this.decreaseDate.second = seconds;
        }
        timer = window.setInterval(decrease, 1000);
      },
      _checkTime(i){
        if (i < 10) {
          i = '0' + i;
        }
        return i
      },
      _splitCurrentDate(time){
        let date = time.split(' ');
        let y = date[0];
        let t = date[1];
        let nowYear = parseInt(y.split('-')[0]);
        let nowMonth = parseInt(y.split('-')[1]);
        let nowDay = parseInt(y.split('-')[2]);
        let nowHour = parseInt(t.split(':')[0]);
        let nowMinute = parseInt(t.split(':')[1]);
        let nowSecond = parseInt(t.split(':')[2]);
        let nowDate = {
          year: nowYear,
          month: nowMonth,
          day: nowDay,
          hour: nowHour,
          minute: nowMinute,
          second: nowSecond
        };
        return nowDate;
      },
      _watch(){
        this.$watch('decreaseDate', function (n, o) {
          this._getTime();
        }, {
          deep: true
        });
      },
    },
    created(){
      this._getTime();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "timer.styl"
</style>
