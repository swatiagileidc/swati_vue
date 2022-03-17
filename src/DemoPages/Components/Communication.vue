<template>
<div>
 <!--   <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>-->
    <tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'" :tab-class="'tab-item'"
      :tab-active-class="'tab-item-active'" :line-class="'tab-item-line'" @onClick="handleClick" />
    <div class="content">
      <!--Overview Part-->
      <div v-if="currentTab === 'tab1'">
        <div class="row">
        <Overview @selected-tab="changetab" @gototab="changetab" @news-id="getnewsid"></Overview>
        </div>
      </div>
      <!--Overview Part-->
       <!--Chat Part-->
      <div v-if="currentTab === 'tab2'">
        <div class="row">
        <Chat :studentdetail="student"></Chat>
        </div>
      </div>
      <!--Chat Part-->
      <!--Create Part-->
      <div v-if="currentTab === 'tab3'">
        <div class="row">
        <Mail></Mail>
        </div>

      </div>
      <!--Create Part-->
      <!--Evaluate Part-->
      <div v-if="currentTab === 'tab4'">
        <div class="row">
         <Noticeboard :newsid="news_id" @back-btn="goback"></Noticeboard>
        </div>
      </div>
      <!--Evaluate Part-->
   
    </div>
  </div>
</template>

<script>

// import PageTitle from "../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
import Chat from "../web/components/Communication/chat"
import Mail from "../web/components/Communication/mail"
import Noticeboard from "../web/components/Communication/noticeboard"
import Overview from "../web/components/Communication/overview"

// const TABS = [{
//       title: "Overview",
//       value: "tab1"
//     },
//     {
//       title: "Chat",
//       value: "tab2"
//     },
//     {
//       title: "Mail",
//       value: "tab3"
//     },
//     {
//       title: "Noticeboard",
//       value: "tab4"
//     }
//   ]
export default {
    components: {
        Tabs,
        Mail,
        Overview,
        Noticeboard,
        Chat,
        //PageTitle
    },

      computed: {
            tabs(){
            return [
                {
                title: this.$t('overview'),
                value: "tab1"
                },
                {
                title: this.$t('chat'),
                value: "tab2"   
                },
                {
                    title: this.$t('mail'),
                    value: "tab3"
                },
                 {
                    title: this.$t('noticeboard'),
                    value: "tab4"
                }   
            ]
            } 
        },
    data: () => ({
        heading: "Communication",
        subheading: "All communication related activities.",
        icon: "pe-7s-comment icon-gradient bg-malibu-beach",
        //tabs: TABS,
      currentTab: "tab1",
      student:"",
      title:""
    }),
    watch: {
            "$route.params.tab": {
                immediate: true,
                handler() {
                    if (this.$route.params.tab) {
                      this.currentTab = this.$route.params.tab;
                    }
                },
            },
              "$route.params.newsid": {
                immediate: true,
                handler() {
                    if (this.$route.params.newsid) {
                      this.news_id = this.$route.params.newsid;
                      
                    }
                },
            },
        },

    methods: {
      goback(getback){
        this.currentTab = getback;
      },
      getnewsid(newsid){
           //alert(newsid);
           this.news_id=newsid;
           this.currentTab = "tab4"
      },
         changetab(tab,studentid,chattype,type) {
        this.currentTab = tab;
        this.student={"id":studentid,"name":chattype,"type":type};
         
    },
        handleClick(newTab) {
        this.currentTab = newTab;
        this.news_id ='';
        this.student="";
      },
        onReady: function (instance) {
            const that = this;
            instance.update(that.endVal + 100);
        },
    },
};
</script>
