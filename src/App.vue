<template>
  <div class="contaienr">
    <!-- Banner -->
    <div class="banner-container">
      <span>Designed by Wu-JunHui</span>
    </div>
    <!-- 主体内容 -->
    <div class="weather-body">
      <!-- Header -->
      <div class="header-container">
        <h2>中国城市天气预报</h2>
        <h5>Urban Weather Forecast in China</h5>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <!-- 搜索框 -->
        <div class="search">
          <!-- 输入框 -->
          <el-input v-model.trim="inputCity" placeholder="请输入城市名" @keyup.enter="getWeather" />
          <!-- 搜索按钮 -->
          <el-button color="#7abdb7" @click="getWeather"></el-button>
        </div>
        <!-- 默认城市 -->
        <ul class="defaultcity-container">
          <li v-for="(item, index) in defaultCity" @click="getDefaultCity(index)">{{ item }}</li>
        </ul>
      </div>
      <!-- 查询结果 -->
      <div class="result-container" v-if="showout">
        <!-- 城市具体结果 -->
        <el-card shadow="hover" class="city-container">
          <!-- 顶层信息 -->
          <div class="info-top">
            <div class="left">
              <span class="cityname">{{ city }}</span>
              <span class="today"
                >今天：<span>{{ todayWea.wea }} {{ todayWea.tem2 }}°~{{ todayWea.tem1 }}° </span>
              </span>
            </div>
            <div class="right">
              <span>{{ todayWea.date }}</span>
              <span>{{ todayWea.week }}</span>
            </div>
          </div>
          <!-- 中层信息 -->
          <div class="info-middle">
            <div class="temperature">{{ todayWea.tem }}°</div>
            <div class="airquality" ref="airRef">
              <span> {{ todayWea.air }} </span>
              <div :class="unmiddle ? 'unmiddle' : 'shuxian'">|</div>
              <span>{{ todayWea.air_level }}</span>
            </div>
            <div class="windinfo">{{ todaywin }} | {{ todayWea.win_meter }} {{ todayWea.win_speed }}</div>
          </div>
          <!-- 底层信息 -->
          <div class="info-bottom">
            <ul class="buttom-info">
              <li>相对湿度 {{ todayWea.humidity }}</li>
              <li>紫外线 {{ todayWea.uvIndex }}级|{{ todayWea.uvDescription }}</li>
              <li v-if="todayWea.visibility">能见度 {{ todayWea.visibility }}</li>
              <li>日出：{{ todayWea.sunrise }}</li>
              <li>日落：{{ todayWea.sunset }}</li>
            </ul>
          </div>
        </el-card>
        <!-- 七天预报 -->
        <div class="sevens-container">
          <div style="margin-bottom: 10px">未来七天预报</div>
          <ul class="forecast-container">
            <el-card shadow="hover" v-for="item in cityResult" :key="item.date">
              <div>{{ item.date }}</div>
              <div>{{ item.week }}</div>
              <div>{{ item.wea }}</div>
              <div><span class="pic" :ref="el => this.weaArr.push(el)"></span></div>
              <div>{{ item.tem1 }}°</div>
              <div>{{ item.tem2 }}°</div>
              <div>{{ item.win[0] }}</div>
              <div>{{ item.win_speed }}</div>
              <div>空气质量{{ item.air }}</div>
              <div class="airquali">
                <span :ref="el => this.airArr.push(el)">{{ item.air_level }}</span>
              </div>
              <div>UV {{ item.uvIndex }}级|{{ item.uvDescription }}</div>
            </el-card>
          </ul>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer-container" v-if="showout">
      <div class="img"></div>
      <span>Don't have a good day, have a great day.</span>
    </div>
  </div>
  <!-- 1.通过IP地址获取城市   2.移动端适配 -->
</template>

<script>
import cityname from './cityname'
export default {
  mounted() {
    //获取meta节点
    let metaNode = document.querySelector('meta[name=viewport]')

    //定义设计稿宽度为375
    let designWidth = 375

    //计算当前屏幕的宽度与设计稿比例
    let scale = document.documentElement.clientWidth / designWidth

    //通过设置meta元素中content的initial-scale值达到移动端适配
    metaNode.content = 'initial-scale=' + scale + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',user-scalable=no'
  },
  data() {
    return {
      inputCity: '',
      defaultCity: ['北京', '上海', '广州', '深圳', '成都', '重庆', '西安'],
      cityResult: [], // 返回城市七天天气数组
      city: '',
      todayWea: {}, // 根据今天的时间选出今天的天气对象
      todaywin: '',
      unmiddle: false,
      airArr: [],
      weaArr: [],
      showout: false
    }
  },

  methods: {
    async getWeather() {
      // 判断是否为合法城市名
      let legalname = cityname.some(item => {
        let suffix = ['市', '县', '自治州', '岛']
        return item === this.inputCity || suffix.some(ele => this.inputCity + ele === item)
      })
      if (legalname) {
        // 将城市后缀去除
        let re = /市|县|自治州|岛$/
        let newStr = this.inputCity.replace(re, '')

        // 让v-if创建展示结果的节点，有了模板结构，后续关于数据的一切操作才不会报错
        // 如果是v-show则可以基于返回的结果作为判断
        this.showout = true

        // 使用无后缀城市名发起请求
        const res = await this.$http.get('https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=' + newStr)
        if (res.status !== 200) return alert('查询失败')
        this.cityResult = res.data.data
        this.city = res.data.city
        // 根据日期获取今天的数据
        res.data.data.some(item => {
          if (item.date === this.today) {
            this.todayWea = item
          }
        })
        // 判断空气质量的竖线是否居中
        if (this.todayWea.air_level.length === 4) {
          this.unmiddle = true
        } else {
          this.unmiddle = false
        }

        // 根据空气质量质数设置空气背景颜色
        let airnum = this.todayWea.air
        let airref = this.$refs.airRef
        this.getAirBgc(airnum, airref)

        // 获取风速数组数据
        this.todaywin = this.todayWea.win[0]

        // 要每次页面更新数据后，基于数据重新设置空气质量颜色和天气图标
        // 此步骤不应在生命周期函数updated中进行，它是一有数据变更就执行
        this.$nextTick(() => {
          // 循环数组根据七天预报空气指数设置背景颜色
          for (let i = 0; i < this.cityResult.length; i++) {
            this.getAirBgc(this.cityResult[i].air, this.airArr[i])
          }
          for (let i = 0; i < this.cityResult.length; i++) {
            this.getWeaImg(this.cityResult[i].wea, this.weaArr[i])
          }
        })
      } else {
        this.$message.warning('请输入合法城市名')
      }
    },
    // 点击默认城市天气
    getDefaultCity(index) {
      this.inputCity = this.defaultCity[index]
      this.getWeather()
    },
    // 封装空气质量指数背景色函数
    getAirBgc(airnum, ref) {
      if (airnum <= 50) {
        ref.style.backgroundColor = '#4a8747'
      } else if (airnum <= 100) {
        ref.style.backgroundColor = '#ffca00'
      } else if (airnum <= 150) {
        ref.style.backgroundColor = '#fc7e0a'
      } else if (airnum <= 200) {
        ref.style.backgroundColor = '#ff0006'
      } else if (airnum <= 300) {
        ref.style.backgroundColor = '#99024f'
      } else {
        ref.style.backgroundColor = '#6a0e24'
      }
    },
    getWeaImg(weastr, ref) {
      if (weastr === '晴' || weastr.indexOf('晴') === 0) {
        ref.style.backgroundPosition = '-131px -6px'
      } else if (weastr === '阴' || weastr.indexOf('阴') === 0) {
        ref.style.backgroundPosition = '-13px -71px'
      } else if (weastr === '多云' || weastr.indexOf('多') === 0) {
        ref.style.backgroundPosition = '-185px -10px'
      } else if (weastr === '小雨' || weastr.indexOf('小') === 0) {
        ref.style.backgroundPosition = '-67px -69px'
      } else if (weastr === '大雨') {
        ref.style.backgroundPosition = '-125px -69px'
      } else if (weastr === '小雪') {
        ref.style.backgroundPosition = '-184px -69px'
      } else if (weastr === '大雪') {
        ref.style.backgroundPosition = '-11px -126px'
      } else if (weastr === '雷电') {
        ref.style.backgroundPosition = '-67px -126px'
      } else if (weastr === '雷阵雨') {
        ref.style.backgroundPosition = '-125px -126px'
      } else if (weastr === '雨夹雪' || weastr.indexOf('雨') === 0) {
        ref.style.backgroundPosition = '-183px -131px'
      } else if (weastr === '雾') {
        ref.style.backgroundPosition = '-16px -195px'
      } else if (weastr === '冰雹') {
        ref.style.backgroundPosition = '-67px -195px'
      } else if (weastr === '阴天-风') {
        ref.style.backgroundPosition = '-125px -195px'
      } else if (weastr === '大风') {
        ref.style.backgroundPosition = '-183px -195px'
      } else if (weastr === '霜') {
        ref.style.backgroundPosition = '-15px -265px'
      } else if (weastr === '雾霾') {
        ref.style.backgroundPosition = '-68px -265px'
      } else {
        ref.style.backgroundPosition = '-132px -265px'
      }
    }
  },
  computed: {
    // 计算出当天日期
    today() {
      let today = new Date()
      let y = today.getFullYear()
      let m = today.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = today.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style scoped lang="less">
@font-face {
  font-family: 'iconfont';
  src: url('./assets/iconfont.ttf') format('truetype');
}
// 定义信息面板字体颜色
@infoColor:#a0f6aa;
// .container {
//   padding-right: 15px;
//   padding-left: 15px;
//   margin-right: auto;
//   margin-left: auto;
// }
// @media (min-width: 768px) {
//   // .container {
//   //   width: 750px;
//   // }
//   html {
//     font-size: 118px;
//   }
// }
// @media (min-width: 992px) {
//   // .container {
//   //   width: 970px;
//   // }
//   html {
//     font-size: 16px;
//   }
// }
// @media (min-width: 1200px) {
//   // .container {
//   //   width: 1170px;
//   // }
//   html {
//     font-size: 16px;
//   }
// }
.banner-container {
  padding: 0 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  color: #fff;
  background: rgb(119, 190, 184);
  background: linear-gradient(90deg, rgba(119, 190, 184, 1) 0%, rgba(109, 141, 192, 1) 100%);
}

.weather-body {
  margin: 0 auto;
  padding: 50px 20px;
  max-width: 800px;
}

// 标题栏
.header-container {
  margin-bottom: 30px;
  text-align: center;

  h2 {
    margin: 20px auto 5px;
    font-size: 30px;
    font-weight: 400;
    color: #54a1a1;
    letter-spacing: 8px;
  }
  h5 {
    margin: 0;
    font-weight: 400;
    color: #0d96a0;
    letter-spacing: 0.125rem;
    word-spacing: 5px;
  }
}

/* 搜索框 */
.search-container {
  margin: 0 auto;
  max-width: 450px;
}

// 输入框与按钮
.search {
  width: 100%;
  height: 35px;

  .el-input {
    float: left;
    padding-left: 5px;
    width: 88%;
    height: 100%;
    font-size: 18px;
    outline: none;
  }
  button {
    float: left;
    width: 10%;
    height: 100%;
    /* background-color: #000; */
    color: #fff;
    // background: url('./assets/look.svg') no-repeat;
    // background-size: contain;
  }
  button::before {
    font-family: 'iconfont';
    content: '\e64e';
  }
  button:hover {
    // transition: all 0.2s;
    color: #6d8ec0;
  }
}

/* 默认城市 */
.defaultcity-container {
  margin: 8px 14px;
  overflow: hidden;

  li {
    float: left;
    margin-right: 10px;
    cursor: pointer;
    color: grey;
    font-size: 14px;
  }
  li:hover {
    color: #6d8dc0;
    font-weight: 700;
  }
}

// 查询结果body
.result-container {
  margin: 0 auto;
  margin-top: 50px;
  width: 100%;
  cursor: default;

  // 信息面板
  .city-container {
    width: 100%;
    color: #fff;
    background: rgb(119, 190, 184);
    background: linear-gradient(90deg, rgba(119, 190, 184, 1) 0%, rgba(214, 149, 143, 1) 100%);
  }
  // 七天预报
  .sevens-container {
    margin-top: 50px;
    width: 100%;
    height: 300px;
  }
}
// 信息面板顶层
.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cityname {
      margin-right: 20px;
      font-size: 25px;
    }
    .today span{
        color: @infoColor;
      }
  }
  .right {
    span {
      padding-right: 10px;
      font-size: 14px;
    }
  }
}
// @media (min-width: 375px) {
//  .info-top{
//   flex-direction: column;
//  }
// }
// 信息面板中层
.info-middle {
  position: relative;
  .temperature {
    font-size: 60px;
  }
  // .subsidiary {
  //   position: absolute;
  //   // margin-left: 50px;
  //   top: 20px;
  //   left: 100px;

  // 空气质量指标
  .airquality {
    position: absolute;
    top: 20px;
    left: 100px;
    padding: 0 10px;
    display: flex;
    height: 20px;
    line-height: 20px;
    // background-color: green;
    border-radius: 10px;
    font-size: 12px;
    // justify-content: space-evenly;
    // text-align: center;
    flex-wrap: nowrap;
    .shuxian {
      position: absolute;
      top: 0;
      left: 50%;
    }
    .unmiddle {
      position: absolute;
      top: 0;
      left: 36%;
    }
    span {
      flex: 1;
      text-align: center;
      padding: 0 5px;
      white-space: nowrap;
    }
  }
  .windinfo {
    position: absolute;
    // margin-left: 50px;
    top: 47px;
    left: 100px;
  }
  // }
}

// 信息面板底层
.info-bottom {
  li {
    // float: left;
    margin-right: 16px;
  }
}
// 七天预报
.sevens-container {
  ul {
    display: flex;
    height: 100%;
    font-size: 10px;

    .el-card {
      --el-card-padding: 10px;
      flex: 1;
      height: 100%;
      text-align: center;
      background-color: #fff;

      div {
        margin-bottom: 8px;
        .pic {
          display: block;
          margin: auto;
          width: 48px;
          height: 40px;
          background: url(./assets/weatherIcon.png) no-repeat -131px -6px;
          background-size: 250px auto;
        }
      }
      .airquali {
        span {
          padding: 0 10px;
          background-color: green;
          border-radius: 20px;
          color: #fff;
        }
      }
    }
  }
}
// footer
.footer-container {
  margin-top: 80px;
  padding: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgb(109, 141, 192);
  background: linear-gradient(90deg, rgba(109, 141, 192, 1) 0%, rgba(119, 190, 184, 1) 100%);
  .img {
    margin-right: 20px;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
    background: url(./assets/doggy.jpg) no-repeat;
    background-size: contain;
  }
}
</style>
