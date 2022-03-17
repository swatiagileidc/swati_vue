<template>
<div>
    <div class="scroll-area-lg">
        <VueElementLoading
              :active="loader"
              spinner="bar-fade-scale"
              color="var(--primary)"
            />
        <v-timeline align-top dense>
        <v-timeline-item color="pink" small v-for="(student, studentindex) in userdata"
                                  :key="studentindex" class="bg-hover" >
          <div  >                        
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{student.start_date | formatDate}}</strong>
              <!-- <span>aahha</span> -->
            </v-col>
            <v-col>
              <strong>{{ $t("task") }}</strong>
              <div class="caption">{{student.title}}</div>
            </v-col>
          </v-row>
          </div>
        </v-timeline-item>

        <v-timeline-item color="teal lighten-3" small v-for="(data, alertindex) in alertdetails"
                                  :key="alertindex" class="bg-hover" >
        <div @click="gotohomework()">
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{data.created_at | formatDate}}</strong>
            </v-col>
            <v-col>
              <strong>{{ $t("mail") }}</strong>
              <div class="caption">Homeowrk due alert sent</div>
           
            </v-col>
          </v-row>
        </div>
        </v-timeline-item>

        <!-- <v-timeline-item color="pink" small >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{ $t("email") }}</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item> -->

        
      </v-timeline>
           
              <!-- <div class="p-5">
                <div class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">

                <div >
                  <div v-for="(student, studentindex) in userdata"
                                  :key="studentindex" class="dot-danger vertical-timeline-element">
                    <div >
                      <span class="vertical-timeline-element-icon bounce-in"></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">{{student.title}} <span class="text-success">{{student.start_date}}</span></h4>
                      </div>
                    </div>
                  </div>
                </div>

                  <div  v-for="(data, alertindex) in alertdetails"
                                  :key="alertindex" class="dot-warning vertical-timeline-element">
                    <div >
                      <span class="vertical-timeline-element-icon bounce-in"></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h6>
                          Homework due alert sent on : <strong class="text-success"> {{data.created_at | formatDate}}</strong>
                         
                        </h6>
                      </div>
                    </div>
                  </div>
                  
                 
                </div>
              </div> -->
           
          </div>

</div>
</template>
<script>

import VueElementLoading from "vue-element-loading";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";

export default {
  components: {
//  VuePerfectScrollbar
VueElementLoading
  },
 props: [
    "studentID"
   
  ],
  data: () => ({
      studentID:null,
      userdata:[],
      chatdetails:[],
      loader:false,
      alertdetails:[],
      mail_type:'Alert',
      chatted:false,
  }),

  watch: {
  
     studentID: {
      immediate: true,
      handler() {
    
          this.gettaskdetails();
      }
    },
  },

 mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem("academic_year"));
    //  console.log(this.user.emp_id);
   this.gettaskdetails();
   
  },

  methods: {
    gettaskdetails() {
        this.loader = true;
      //  alert(this.student_id);

      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "timeline_staff?student_id=" +
            this.studentID+"&mail_type=" +
            this.mail_type
        )
        .then((res) => {
          console.log("userdata");
          
          this.userdata = res.data.eventdata;
          this.chatdetails = res.data.chatdetail;
          this.alertdetails = res.data.alert_details;
          this.loader = false;
        //   if(this.chatdetails===null){
        //       this.chatted = false;
        //   }else{
        //       this.chatted = true;
        //   }
          //  this.userlastlogin =res.data.userdata.last_login;
          //alert(this.userlastlogin);
        })
         .catch((err) => {
          console.log(err);
          this.loader = false;
        });
    },
    gototask(taskid){
        
         this.$router.push({ name: 'task',params: { tab:'tab1',task_id:taskid} })
        
    },

    gotohomework(){
        
         this.$router.push({ name: 'assignment' })
    }
  }
}
 </script>
 <style scoped>
 .bg-hover:hover{
  background-color: rgb(227, 227, 227);
  cursor: pointer;
}
.feature-pane {
  position: relative;
  padding-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
 </style>
