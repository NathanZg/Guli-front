<template>
  <client-only>
    <div>
      <div class="block">
        <el-carousel
          type="card"
          trigger="click"
          loop
          autoplay
          :height="bannerH + 'px'"
        >
          <el-carousel-item v-for="banner in bannerList" :key="banner.id">
            <a target="_blank" :href="banner.linkUrl">
              <img
                ref="imgHeight"
                :src="banner.imageUrl"
                width="100%"
                height="100%"
                :alt="banner.title"
                object-fit="cover"
              />
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 幻灯片 结束 -->
      <div id="aCoursesList">
        <!-- 网校课程 开始 -->
        <div>
          <section class="container">
            <header class="comm-title">
              <h2 class="tac">
                <span class="c-333">热门课程</span>
              </h2>
            </header>
            <div>
              <article class="comm-course-list">
                <ul class="of" id="bna">
                  <li v-for="(course, index) in courseList" :key="course.id">
                    <div class="cc-l-wrap">
                      <section class="course-img">
                        <img
                          width="100%"
                          height="100%"
                          :src="course.cover"
                          class="img-responsive"
                          :alt="course.title"
                        />
                        <div class="cc-mask">
                          <a
                            :href="'/course/' + course.id"
                            title="开始学习"
                            class="comm-btn c-btn-1"
                            >开始学习</a
                          >
                        </div>
                      </section>
                      <h3 class="hLh30 txtOf mt10">
                        <a
                          :href="'/course/' + course.id"
                          :title="course.title"
                          class="course-title fsize18 c333"
                          >{{ course.title }}</a
                        >
                      </h3>
                      <section class="mt10 hLh20 of">
                        <span
                          class="fr jgTag bg-green"
                          v-if="Number(course.price) === 0"
                        >
                          <i class="c-fff fsize12 f-fA">免费</i>
                        </span>
                        <span
                          class="fr jgTag bg-red"
                          v-if="Number(course.price) > 0"
                        >
                          <i class="c-fff fsize12 f-fA">{{
                            course.price + "￥"
                          }}</i>
                        </span>
                        <span class="fl jgAttr c-ccc f-fA">
                          <i class="c-999 f-fA" v-if="Number(course.price) > 0">{{ course.buyCount }}人学习 |</i>
                          <i class="c-999 f-fA">{{ countList[index] }}评论</i>
                        </span>
                      </section>
                    </div>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
              <section class="tac pt20">
                <a href="/course" title="全部课程" class="comm-btn c-btn-2"
                  >全部课程</a
                >
              </section>
            </div>
          </section>
        </div>
        <!-- /网校课程 结束 -->
        <!-- 网校名师 开始 -->
        <div>
          <section class="container">
            <header class="comm-title">
              <h2 class="tac">
                <span class="c-333">名师大咖</span>
              </h2>
            </header>
            <div>
              <article class="i-teacher-list">
                <ul class="of">
                  <li v-for="teacher in teacherList" :key="teacher.id">
                    <section class="i-teach-wrap">
                      <div class="i-teach-pic">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                        >
                          <img :alt="teacher.name" :src="teacher.avatar" />
                        </a>
                      </div>
                      <div class="mt10 hLh30 txtOf tac">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                          class="fsize18 c-666"
                          >{{ teacher.name }}</a
                        >
                      </div>
                      <div class="hLh30 txtOf tac">
                        <span class="fsize14 c-999">{{ teacher.career }}</span>
                      </div>
                      <div class="mt15 i-q-txt">
                        <p class="c-999 f-fA">
                          {{ teacher.intro }}
                        </p>
                      </div>
                    </section>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
              <section class="tac pt20">
                <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2"
                  >全部讲师</a
                >
              </section>
            </div>
          </section>
        </div>
        <!-- /网校名师 结束 -->
      </div>
    </div>
  </client-only>
</template>
<script>
import bannerApi from "@/api/banner";
import indexApi from "@/api/index";
import commentApi from "@/api/comment";
export default {
  data() {
    return {
      //banner的集合
      bannerList: [],
      //热门课程集合
      courseList: [],
      //名师集合
      teacherList: [],
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      //走马灯默认高度
      bannerH: 300,
      countList: [],
    };
  },
  created() {
    this.getAllBanner();
    this.getHotCourseAndTeacher();
  },
  methods: {
    //查出最新的三个个banner
    getAllBanner() {
      bannerApi.getAllBanner().then((response) => {
        this.bannerList = response.data.data.bannerList;
      });
    },
    //查询热门课程和名师
    getHotCourseAndTeacher() {
      var items;
      var courseIds = "";
      var that = this;
      indexApi.index().then((response) => {
        this.courseList = response.data.data.courseList;
        this.teacherList = response.data.data.teacherList;
        items = response.data.data.courseList;
        if (items != undefined && items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            if (i == 0) {
              courseIds = courseIds + items[i].id;
            } else {
              courseIds = courseIds + "," + items[i].id;
            }
          }
          commentApi.getCommentCounts(courseIds).then((res) => {
            that.countList = res.data.data.countList;
          });
        }
      });
    },
    //设置走马灯高度
    setBannerH() {
      this.bannerH = document.body.clientWidth / 4;
    },
  },
  mounted() {
    window.addEventListener(
      "resize",
      () => {
        this.setBannerH();
      },
      false
    );
  },
};
</script>
<style>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>