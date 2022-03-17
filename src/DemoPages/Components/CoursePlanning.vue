<template>
  <div>
    <!-- <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>-->
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'body-tabs shadow-tabs'"
      :tab-class="'tab-item'"
      :tab-active-class="'tab-item-active'"
      :line-class="'tab-item-line'"
      @onClick="handleClick"
    />
    <div class="content">
      <!--Overview Part-->
      <div v-if="currentTab === 'tab1'">
        <div class="row">
          <CourseOverview @gototab="changetab"></CourseOverview>
        </div>
      </div>
      <!--Overview Part-->
      <!--Course Plan Part-->
      <div v-if="currentTab === 'tab2'">
        <div class="row">
          <Courseplan></Courseplan>
        </div>
      </div>
      <!--Course Plan Part-->
      <!--Class Completed Part-->
      <div v-if="currentTab === 'tab3'">
        <div class="row">
          <Classcompleted></Classcompleted>
        </div>
      </div>
      <!--Class Completed Part-->
      <!--Evaluate Part-->
      <div v-if="currentTab === 'tab4'">
        <div class="row">
          <Syllabus></Syllabus>
        </div>
      </div>
      <!--Evaluate Part-->
    </div>
  </div>
</template>

<script>
// import PageTitle from "../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
import CourseOverview from "../web/components/course/overview";
import Courseplan from "../web/components/course/plan";
import Syllabus from "../web/components/course/syllabus";
import Classcompleted from "../web/components/course/classescompleted";

const TABS = [
  {
    title: "Overview",
    value: "tab1",
  },
  {
    title: "Plan",
    value: "tab2",
  },
  {
    title: "Classes Completed",
    value: "tab3",
  },
  {
    title: "Syllabus",
    value: "tab4",
  },
];
export default {
  components: {
    // PageTitle,
    CourseOverview,
    Courseplan,
    Syllabus,
    Classcompleted,
    Tabs,
  },
  data: () => ({
    heading: "Test/Exam",
    subheading: "Manage Test/Exams Allotment,Conduction and Evaluation.",
    icon: "pe-7s-rocket icon-gradient bg-malibu-beach",
    tabs: TABS,
    subject: "All Subjects",
    currentTab: "tab1",
  }),
  methods: {
    changetab(tab) {
      this.currentTab = tab;
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },
};
</script>
<style scoped>
.top-selection {
  position: absolute;
  top: 203px;
  right: 31px;
  z-index: 20000;
}
.sub-button {
  background: rgb(247 185 36);
  color: #fff;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  padding: 8px 18px !important;
  border-radius: 5px;
}
.pe-7s-notebook:hover,
.btn-icon-vertical:hover {
  color: grey !important;
  -webkit-text-fill-color: grey;
}
.pe-7s-notebook,
.btn-icon-vertical {
  color: #ffffff !important;
  -webkit-text-fill-color: #fff;
}
</style>
