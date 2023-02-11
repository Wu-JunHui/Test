<template>
  <div class="footer-container">
    <!-- 多重信息 -->
    <div class="multiple">
      <!-- 博客logo -->
      <a class="brand" href="https://W-JunHui.gitee.io" target="_blank">
        <img src="/logoDark.svg" alt="OUTOFF ORBIT" />
        <span>OUTOFF ORBIT</span>
      </a>
      <!-- 句子 -->
      <div class="sentence">
        <img src="../assets/doggy.jpg" alt="doggy" />
        <span>Don't have a good day, have a great day.</span>
      </div>
      <!-- 链接类信息 -->
      <div class="links">
        <!-- 源码仓库 -->
        <div class="repo">
          <a href="https://github.com/Wu-JunHui/Weather-Forecast" target="_blank"></a>
          <a href="https://gitee.com/W-JunHui/Weather-Forecast" target="_blank"></a>
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
  name: 'MyFooter'
}
</script>

<style lang="less">
.footer-container {
  margin-top: 80px;
  padding: 20px;
  color: #fff;
  background: linear-gradient(90deg, rgba(109, 141, 192, 1) 0%, rgba(119, 190, 184, 1) 100%);

  // 多重信息
  .multiple {
    width: 100%;
    display: flex;
    justify-content: center;
    // 博客logo
    .brand {
      padding-right: 120px;
      width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: right;
      color: #f6ebe1;
      font-size: 22px;
      font-weight: 500;
      img {
        width: 90px;
      }
    }
    // 句子
    .sentence {
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
    .links {
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
          background: url('/github.svg');
          background-size: contain;
        }
        a:nth-child(2) {
          background: url('/gitee.svg');
          background-size: contain;
        }
        a:nth-child(3) {
          background: url('/mail.svg');
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
}
</style>
