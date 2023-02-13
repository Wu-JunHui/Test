<template>
  <!-- 城市具体结果 -->
  <el-card shadow="hover" class="panel-root" :style="{ color: fontColor, background: bgColor }">
    <!-- 顶层信息 -->
    <div class="info-top">
      <div class="top-left">
        <span class="cityname">{{ cityName }}</span>
        <span class="today"
          >今天：<span>{{ todayArr.wea }} {{ todayArr.tem2 }}°~{{ todayArr.tem1 }}° </span>
        </span>
      </div>
      <div class="top-right">
        <span>{{ todayArr.date }}</span>
        <span>{{ todayArr.week }}</span>
      </div>
    </div>

    <!-- 中层信息 -->
    <div class="info-middle">
      <div class="middle-left">{{ todayArr.tem }}°</div>
      <div class="middle-right">
        <div class="airquality" ref="airRef">{{ todayArr.air }} | {{ todayArr.air_level }}</div>
        <div class="windinfo">{{ todayArr.win[0] }} | {{ todayArr.win_meter }} | {{ todayArr.win_speed }}</div>
      </div>
    </div>

    <!-- 底层信息 -->
    <div class="info-bottom">
      <div>
        <span>湿度</span><span>{{ todayArr.humidity }}</span>
      </div>
      <div>
        <span>紫外线</span><span>{{ todayArr.uvIndex }}级 {{ todayArr.uvDescription }}</span>
        <!--   -->
      </div>
      <div v-if="todayArr.visibility">
        <span>能见度</span><span>{{ todayArr.visibility }}</span>
      </div>
      <div>
        <span>日出</span><span>{{ todayArr.sunrise }}</span>
      </div>
      <div>
        <span>日落</span><span>{{ todayArr.sunset }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      todaywin: this.todayArr.win
    }
  },
  props: {
    todayArr: {
      type: Object,
      required: true
    },
    cityName: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    fontColor: {
      type: String,
      default: '#000'
    }
  },
  mounted() {
    // 初次加载渲染面板空气指数背景色
    this.$parent.getAirBgc(this.todayArr.air, this.$refs.airRef)
  },
  watch: {
    // 侦听数据对象的变化，每次变化重新渲染面板空气指数背景色
    todayArr(newArr) {
      if (newArr) return this.$parent.getAirBgc(this.todayArr.air, this.$refs.airRef)
    }
  }
}
</script>

<style lang="less">
@infoColor: #a0f6aa;
.panel-root {
  // 信息面板顶层
  .info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cityname {
        margin-right: 20px;
        font-size: 25px;
      }
      .today span {
        color: @infoColor;
      }
    }
    .top-right span {
      padding-right: 10px;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 600px) {
    .info-top {
      flex-direction: column;
      .top-left {
        order: 1;
        align-self: start;
      }
      .top-right {
        margin-bottom: 5px;
        order: 0;
        align-self: start;
      }
    }
  }
  // 信息面板中层
  .info-middle {
    display: flex;
    .middle-left {
      font-size: 60px;
    }
    .middle-right {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      // 空气质量指标
      .airquality {
        align-self: flex-start;
        padding: 0 10px;
        display: flex;
        align-items: center;
        height: 26px;
        font-size: 14px;
        border-radius: 13px;
      }
      .windinfo::before {
        margin-right: 5px;
        font-family: 'iconfont';
        content: '\e65b';
      }
    }
    @media screen and (max-width: 700px) {
      .middle-left {
        font-size: 50px;
      }
      .middle-right {
        .airquality {
          height: 20px;
          font-size: 12px;
        }
        .windinfo {
          font-size: 13px;
        }
      }
    }
  }

  // 信息面板底层
  .info-bottom {
    display: flex;
    align-items: center;
    div {
      margin-right: 12px;
      display: flex;
      align-items: center;
      span:nth-child(2) {
        margin-left: 5px;
        color: @infoColor;
      }
    }
    // 设置字体图标
    div::before {
      margin-right: 5px;
      padding-top: 2px;
      font-family: 'iconfont';
    }
    div:nth-child(1):before {
      padding: 0 0 2px;
      content: '\e60f';
    }
    div:nth-child(2):before {
      content: '\e611';
    }
    div:nth-child(3):before {
      content: '\ea13';
    }
    div:nth-child(4):before {
      content: '\ea15';
    }
    div:nth-child(5):before {
      content: '\ea14';
    }

    @media screen and (max-width: 750px) {
      div {
        flex-direction: column;
        align-items: center;
        span:nth-child(1) {
          order: 1;
          font-size: 12px;
        }
        span:nth-child(2) {
          margin: 5px 0 0;
        }
      }
      div:nth-child(5) {
        margin: 0;
      }

      div::before {
        margin-right: 0;
        font-size: 24px;
      }
    }
  }
}
</style>
