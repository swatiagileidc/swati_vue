<template>
  <div class="container-fluid">
    <!-- <div class="card-body"> -->
      <!-- {{items}} -->
      <!-- <div class="main-card mb-3 card">
        <div class="card-header"> -->
          <!-- <div
            class="card-header-tab card-header"
          > -->
            <!-- <div
              class="
                card-header-title
                font-size-lg
                text-capitalize
                font-weight-normal
                titlewrap
              "
            >
              Sections
            </div> -->
          <!-- </div> -->
        <!-- </div> -->
        <!-- {{sections}}aa -->
       
        <div class="split left">
           <h5>Sections</h5>
            <div class="centered">
          <!-- <v-treeview open-all selectable selected-color="green" :items="items" v-model="selected"></v-treeview> -->
          <v-treeview activatable :items="sections" v-model="selected" section_name>
            <template slot="label" slot-scope="{ item }">
      <a @click="assignSectionid(item.id)">{{ item.name }}</a>
    </template>
          </v-treeview>
        </div>
        </div>
        <!-- {{testcases}} -->
        <div class="split right">
          <h5>Test Cases</h5>
            <!-- <div class="centered"> -->
          <!-- {{departments}} -->
          <div style="display: flex">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn @click="create()" color="primary" small>Create</v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items="testcases"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.testcase_summary }}</td>
                <td>{{ props.item.description }}</td>
                <td>
                  <router-link
                    style="padding-top: 15px"
                    :to="{
                      name: 'testcaseamend',
                      params: { id: props.item.id },
                    }"
                  >
                    <v-icon small class="mr-2">edit</v-icon>
                  </router-link>

                  <v-icon small class="mr-2" @click="DeleteItem(props.item.id)"
                    >delete</v-icon
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
        <!-- </div> -->
      <!-- </div>
    </div> -->
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      testcases: [],
      sections:[],
      selected: "",
      sectionid:"",
      headers: [
        {
          text: "Test Case",
          align: "start",
          sortable: false,
          value: "testcase_summary",
        },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" },
      ],
      search: "",
      items: [
        {
          id: 1,
          name: "Applications :",
          children: [
            { id: 2, name: "Calendar : app" },
            { id: 3, name: "Chrome : app" },
            { id: 4, name: "Webstorm : app" },
          ],
        },
        {
          id: 5,
          name: "Documents :",
          children: [
            {
              id: 6,
              name: "vuetify :",
              children: [
                {
                  id: 7,
                  name: "src :",
                  children: [
                    { id: 8, name: "index : ts" },
                    { id: 9, name: "bootstrap : ts" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.fetchTestcases();
    this.fetchSections();
  },
  methods: {
    assignSectionid(sectionid){
      this.sectionid = sectionid;
      this.fetchTestcases();
    },
    fetchTestcases() {
      axios.get(process.env.VUE_APP_API_URL + "fetch_testcases?sectionid="+this.sectionid).then((res) => {
        this.testcases = res.data.testcases;
      });
    },
    fetchSections() {
      axios.get(process.env.VUE_APP_API_URL + "parent_sections").then((res) => {
        this.sections = res.data.sections;
      });
    },
    DeleteItem(id) {
      if (confirm("Do you really want to delete?")) {
        axios
          .get(process.env.VUE_APP_API_URL + "delete_testcases/" + id)
          .then((res) => {
            if (res.data.status == "S") {
              this.message = res.data.message;
              this.fetchTestcases();
            } else {
              console.log("error");
            }
          });
      }
    },
    create() {
      this.$router.push({
        name: "testcaseamend",
      });
    },
  },
};
</script>
<style scoped>
.split {
  height: 100%;
  width: 60%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 70px;
  background-color: white;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
.centered {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-30%, -30%);
  text-align: center;
}
</style>