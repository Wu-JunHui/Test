<template>
  <div class="sevens-root">
    <div class="title">未来七天预报</div>
    <ul class="forecast-container">
      <el-card shadow="hover" v-for="item in dataArr" :key="item.date">
        <div class="date">{{ item.date }}</div>
        <div>{{ item.week }}</div>
        <div class="wea">{{ item.wea }}</div>
        <div><span class="pic" :ref="el => this.weaArr.push(el)"></span></div>
        <div class="tem">
          最高：<span>{{ item.tem1 }}°</span>
        </div>
        <div class="tem">
          最低：<span>{{ item.tem2 }}°</span>
        </div>
        <div>{{ item.win[0] }}</div>
        <div>{{ item.win_speed }}</div>
        <div>空气质量：{{ item.air }}</div>
        <div class="airquali">
          <span :ref="el => this.airArr.push(el)">{{ item.air_level }}</span>
        </div>
        <div>UV: {{ item.uvIndex }}级 | {{ item.uvDescription }}</div>
      </el-card>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyDays',
  data() {
    return {
      airArr: [], // 接收七天天气空气指数ref引用的数组（Vue3函数式ref）
      weaArr: [] // 接收七天天气小图标ref引用的数组（Vue3函数式ref）
    }
  },
  props: {
    dataArr: {
      type: Array,
      required: true
    }
  },
  emits: ['sendRef'],
  created() {
    this.$emit('sendRef', { sevensAir: this.airArr, sevensWea: this.weaArr })
  }
}
</script>

<style lang="less">
.sevens-root {
  .title {
    margin-bottom: 15px;
    color: #54a1a1;
    font-size: 20px;
  }
  ul {
    width: 100%;
    display: flex;
    overflow: hidden;
    font-size: 14px;
    .el-card {
      --el-card-padding: 10px;
      flex: 1;
      min-width: 120px;
      height: 100%;
      text-align: center;
      .date {
        font-weight: 500;
        font-size: 16px;
      }
      .wea {
        color: #d3675d;
        font-weight: 500;
      }
      .tem {
        font-size: 14px;
        span {
          color: #78bdb7;
          font-weight: 700;
        }
      }
      div {
        margin-bottom: 10px;
        .pic {
          display: block;
          margin: auto;
          width: 48px;
          height: 40px;
          background: url(../assets/weatherIcon.png) no-repeat -131px -6px;
          background-size: 250px auto;
        }
      }

      .airquali {
        span {
          padding: 2px 10px;
          border-radius: 20px;
          color: #fff;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    .title {
      font-size: 16px;
    }
    ul {
      font-size: 13px;
      overflow-x: scroll;
      .el-card {
        min-width: 110px;
        .date {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
