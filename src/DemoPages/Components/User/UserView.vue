<template>
  <div>
    <!-- <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>-->
    <div class="row">
      <div class="col-lg-12">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <!-- {{user}} -->
            <h5 class="card-title">User View</h5>
            <table
              class="
                align-middle
                mb-0
                table table-borderless table-striped table-hover
              "
            >
              <tbody>
                <!-- {{dept}} -->
                <tr v-if="user.name">
                  <td class="text-muted" style="width: 300px">Name</td>
                  <td>{{ user.name }}</td>
                </tr>
                <tr v-if="user.email">
                  <td class="text-muted" style="width: 300px">Email</td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="width: 300px">Departments</td>
                  <td>
                    <span v-for="(deptname, index) in dept" :key="index"
                      >{{ deptname }},</span
                    >
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
            <v-btn style="float: right" @click="cancel"> Cancel </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import PageTitle from "../../Layout/Components/PageTitle.vue";
import axios from "axios";
export default {
  components: {
    // PageTitle
  },
  data: () => ({
    user: "",
    dept: [],
  }),

  computed:{
    fieldRules() {
      return [(v) => !!v || "Field Required"];
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        // alert('test')
        if (this.$route.params.id) {
          axios
            .get(
              process.env.VUE_APP_API_URL +
                "fetch_user_byid/" +
                this.$route.params.id
            )
            .then((res) => {
              this.message = res.data.message;
              if (res.data.status == "S") {
                this.user = res.data.user_data;
                console.log(res.data.user_data);
                let deptdata = res.data.user_data.user_dept;
                deptdata.map((item) => {
                  this.dept.push(item.dept.name);
                });
                console.log(this.user);
              } else {
                console.log("error");
              }
            });
        }
      },
    },
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "userreport",
      });
    },
  },
};
</script>
