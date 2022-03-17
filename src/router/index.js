import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({

    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
       
     {
         path:"/",
         name:"section_report",
         component:()=>import("../DemoPages/Components/Sections/SectionReport.vue")
     },
     {
        path:"/section_amend",
        name:"section_amend",
        component:()=>import("../DemoPages/Components/Sections/SectionAmend.vue")
    },
    {
        path:"/testcasereport",
        name:"testcasereport",
        component:()=>import("../DemoPages/Components/TestCases/TestCasesReport.vue")
    },
    {
        path:"/testcaseamend",
        name:"testcaseamend",
        component:()=>import("../DemoPages/Components/TestCases/TestcasesAmend.vue")
    },
   
    ]
});
        