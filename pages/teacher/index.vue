<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
<a id="${subject.subjectId}"
title="${subject.subjectName }" href="javascript:void(0)"
onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
</c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理 中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="data.total">
            <ul class="of">
              <li v-for="teacher in data.items" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      target="_blank"
                    >
                      <img :src="teacher.avatar" :alt="teacher.name" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      target="_blank"
                      class="fsize18 c-666"
                      >{{ teacher.name }}</a
                    >
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            background
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="goToPage"
          />
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher";
export default {
  data() {
    return {
      data: {},
      page: 1,
      limit: 8,
      total: 0,
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    getTeacherList(current = 1) {
      this.page = current;
      teacherApi.getTeacherList(current, 8).then((response) => {
        this.data = response.data.data;
        this.total = response.data.data.total;
      });
    },
    goToPage(current = 1) {
      this.page = current;
      teacherApi.getTeacherList(current, 8).then((response) => {
        this.data = response.data.data;
        this.total = response.data.data.total;
      });
    },
  },
};
</script>