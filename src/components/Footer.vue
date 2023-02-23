<template>
  <div class="footer-root" :style="{ color: fontColor, background: bgColor }">
    <!-- 多重信息 -->
    <div class="multiple1">
      <!-- 博客logo -->
      <a class="brand1" href="https://W-JunHui.gitee.io" target="_blank">
        <img src="/logoDark.svg" alt="OUTOFF ORBIT" />
        <span>OUTOFF ORBIT</span>
      </a>
      <!-- 句子 -->
      <div class="sentence1">
        <img src="../assets/doggy.jpg" alt="doggy" />
        <span>{{ message }}</span>
      </div>
      <!-- 链接类信息 -->
      <div class="links1">
        <!-- 源码仓库 -->
        <div class="repo">
          <a :href="GHRepo" target="_blank"></a>
          <a :href="GERepo" target="_blank"></a>
          <a href="mailto:wu-junhui@foxmail.com"></a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">Copyright © 2023 Wu-JunHui</div>
      </div>
    </div>
    <div class="multiple2">
      <!-- 博客logo -->
      <a class="brand2" href="https://W-JunHui.gitee.io" target="_blank">
        <img src="/logoDark.svg" alt="OUTOFF ORBIT" />
        <span>OUTOFF ORBIT</span>
      </a>
      <!-- 句子 -->

      <!-- 链接类信息 -->
      <div class="links2">
        <!-- 源码仓库 -->
        <div class="repo">
          <a :href="GHRepo" target="_blank"></a>
          <a :href="GERepo" target="_blank"></a>
          <a href="mailto:wu-junhui@foxmail.com"></a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">Copyright © 2023 Wu-JunHui</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    fontColor: {
      type: String,
      default: '#000'
    },
    message: {
      type: String,
      default: 'Do not go gentle into that good night.'
    },
    // GitHub源码仓库
    GHRepo: {
      type: String,
      default: 'https://github.com/Wu-JunHui'
    },
    // Gitee源码仓库
    GERepo: {
      type: String,
      default: 'https://gitee.com/W-JunHui'
    }
  }
}
</script>

<style lang="less">
.footer-root {
  padding: 20px;

  // 多重信息
  .multiple1,
  .multiple2 {
    width: 100%;
    display: flex;
    justify-content: center;
    // 博客logo
    .brand1,
    .brand2 {
      padding-right: 120px;
      width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: right;
      color: #f6ebe1;
      font-size: 22px;
      font-weight: 500;
      // display:none;

      img {
        width: 90px;
      }
    }
    // 句子
    .sentence1 {
      // width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;

      img {
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
      }
    }
    // 链接类信息
    .links1,
    .links2 {
      // display:none;
      padding: 2px 0 0 120px;
      width: 33.33%;
      .repo {
        display: flex;
        align-items: center;
        a {
          margin-right: 10px;
          display: block;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          background: url('/github.svg') no-repeat;
          background-size: contain;
        }
        a:nth-child(2) {
          background: url('/gitee.svg') no-repeat;
          background-size: contain;
        }
        a:nth-child(3) {
          background: url('/mail.svg') no-repeat;
          background-size: contain;
        }
      }
      // 版权信息
      .copyright {
        margin-top: 8px;
        font-size: 13px;
        cursor: default;
      }
    }
  }
  .multiple2 {
    margin-top: 10px;
    .brand2,
    .links2 {
      display: none;
    }
  }
}

@media screen and (max-width: 1180px) {
  // 隐藏第一行的logo和链接
  .footer-root .multiple1 .brand1,
  .links1 {
    display: none;
  }
  // 显示第二行的logo和链接
  .footer-root .multiple2 .brand2 {
    padding-right: 0;
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .footer-root .multiple2 .links2 {
    width: 50%;
    display: block;
  }
}
@media screen and (max-width: 680px) {
  .footer-root .multiple1 .sentence1 {
    font-size: 14px;
    img {
      margin-right: 15px;
      width: 48px;
      height: 48px;
      border-radius: 24px;
    }
  }
  .footer-root .multiple2 {
    justify-content: space-between;
    .brand2 {
      font-size: 16px;

      img {
        width: 80px;
      }
    }
    .links2 {
      width: 60%;
      padding-left: 10px;
      .copyright {
        font-size: 8px;
      }
    }
  }
}
</style>
