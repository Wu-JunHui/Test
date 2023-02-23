<template>
  <div class="contaienr">
    <!-- Banner -->
    <div class="banner-container">
      <a class="logo" href="https://w-junhui.gitee.io/weather-forecast" > <img src="/logo.svg" alt="OUTOFF ORBIT" /><span>OUTOFF ORBIT</span> </a>
      <div class="statement">Original by <a href="https://github.com/Wu-JunHui" alt="GitHub主页" target="_blank"> Wu-JunHui</a></div>
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
        <!-- 城市面板 -->
        <div class="panel-container">
          <CityPanel :todayArr="todayWea" :cityName="city" bgColor="linear-gradient(90deg, rgba(119, 190, 184, 1) 0%, rgba(214, 149, 143, 1) 100%)" fontColor="#fff"></CityPanel>
        </div>

        <!-- 七天预报 -->
        <div class="sevens-container">
          <Days :dataArr="cityResult" @sendRef="getSevenRef"></Days>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footer-container" v-if="showout">
      <Footer bgColor="linear-gradient(90deg, rgba(109, 141, 192, 1) 0%, rgba(119, 190, 184, 1) 100%)" fontColor="#fff" message="Don't have a good day, have a great day." GHRepo="https://github.com/Wu-JunHui/Weather-Forecast" GERepo="https://gitee.com/W-JunHui/Weather-Forecast"></Footer>
    </div>
  </div>
</template>

<script>
// 导入包含城市名数组的js文件
import cityname from './cityname'
import Footer from './components/Footer.vue'
import CityPanel from './components/CityPanel.vue'
import Days from './components/Days.vue'

export default {
  components: { Footer, CityPanel, Days },
  data() {
    return {
      inputCity: '',
      defaultCity: ['北京', '上海', '广州', '深圳', '成都', '重庆', '西安'],
      todayWea: {}, // 根据今天的时间选出今天的天气对象
      city: '', // 所查询城市名
      cityResult: [], // 返回城市七天天气数组
      showout: false,
      airRefArr: [], // 接收通过自定义事件传递的七天天气空气指数ref引用的数组（Vue3函数式ref）
      weaRefArr: [] // 接收通过自定义事件传递的七天天气小图标ref引用的数组（Vue3函数式ref）
    }
  },

  methods: {
    // 封装请求函数
    async getWeather() {
      // 基于城市名模块，判断所输入是否为合法城市名
      let legalname = cityname.some(item => {
        // 因为城市名模块均带有后缀，因此需手动添加后缀以判断是否合法
        let suffix = ['市', '县', '自治州', '岛']
        return item === this.inputCity || suffix.some(ele => this.inputCity + ele === item)
      })
      if (legalname) {
        // 将城市后缀去除，因为接口请求参数不能有后缀
        let re = /市|县|自治州|岛$/
        let newStr = this.inputCity.replace(re, '')

        // 使用无后缀城市名发起请求
        const res = await this.$http.get('https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=' + newStr)
        if (res.status !== 200) return alert('查询失败')
        this.cityResult = res.data.data
        this.city = res.data.city

        // 根据日期获取今天的数据对象
        res.data.data.some(item => {
          if (item.date === this.today) {
            this.todayWea = item
          }
        })

        // 返回数据成功，则使用v-if创建展示结果的DOM节点，后续关于天气数据的一切操作才不会报错
        // 必须在已获取所有基础数组、对象后才创建通过v-if创建DOM节点，否则在父向子传值时会产生空数组、空对象导致错误
        // 如果使用v-show则可以基于接口请求返回的结果作为判断条件
        this.showout = true

        // 每次请求新数据成功后，需重新设置空气质量颜色和天气图标
        // 此步骤不应在生命周期函数updated中进行，它是一有数据变更就执行，也可使用侦听器watch实现
        this.$nextTick(() => {
          // 循环七天天气数组，根据每天的空气指数设置对应背景颜色
          for (let i = 0; i < this.cityResult.length; i++) {
            this.getAirBgc(this.cityResult[i].air, this.airRefArr[i])
          }
          // 循环七天天气数组，根据每天的预报设置天气小图标
          for (let i = 0; i < this.cityResult.length; i++) {
            this.getWeaImg(this.cityResult[i].wea, this.weaRefArr[i])
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

    // 监听子组件Days的自定义函数，接收空气指数和天气图标的ref引用
    getSevenRef(Obj) {
      this.airRefArr = Obj.sevensAir
      this.weaRefArr = Obj.sevensWea
    },

    // 封装空气质量指数背景色函数（面板和七天都有使用）
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

    // 封装设置七天天气图标函数
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

<style lang="less">
@font-face {
  font-family: 'iconfont';
  src: url('./assets/iconfont.ttf') format('truetype');
}
// 定义信息面板字体颜色

// banner
.banner-container {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  color: #fff;
  background: linear-gradient(90deg, rgba(119, 190, 184, 1) 0%, rgba(109, 141, 192, 1) 100%);

  .logo {
    display: flex;
    align-items: center;
    justify-content: right;
    color: #0b0b0b;
    font-size: 22px;
    font-weight: 500;
    img {
      width: 60px;
    }
  }
  .statement {
    cursor: default;
    a {
      color: #37e0b9;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 600px) {
    // 隐藏logo名字
    .logo span {
      display: none;
    }
    .statement {
      font-size: 14px;
    }
  }
}

// 主体内容
.weather-body {
  margin: 0 auto;
  padding: 50px 20px;
  max-width: 900px;
}

// 标题栏
.header-container {
  margin-bottom: 30px;
  text-align: center;
  cursor: default;
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
    letter-spacing: 2px;
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
    color: #fff;
  }
  button::before {
    font-family: 'iconfont';
    content: '\e64e';
  }
  button:hover {
    color: #6d8ec0;
  }
  @media screen and (max-width: 600px) {
    .el-input {
      width: 83%;
    }
    button {
      width: 15%;
    }
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

  // 七天预报
  .sevens-container {
    margin-top: 50px;
    width: 100%;
  }
}

// footer
.footer-container {
  margin-top: 50px;
}
</style>
