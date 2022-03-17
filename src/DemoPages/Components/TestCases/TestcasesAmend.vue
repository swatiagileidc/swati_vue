<template>
  <div class="container-fluid">
    <!-- {{testcases}} -->
    <div class="main-card mb-3 card">
      <div class="card-header">
        <div
          class="card-header-tab card-header"
          style="display: flex; width: 100%; justify-content: space-between"
        >
          <div
            class="
              card-header-title
              font-size-lg
              text-capitalize
              font-weight-normal
              titlewrap
            "
          >
            Add Test Cases
          </div>
        </div>
      </div>
      <div class="card-body">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            v-model="testcases.section_id"
            :items="sections"
            :rules="[(v) => !!v || 'Item is required']"
            label="Sections"
            item-text="section_name"
            item-value="id"
            required
          ></v-select>
          <v-text-field
            v-model="testcases.testcase_summary"
            :rules="nameRules"
            label="Testcase Summary"
            required
          ></v-text-field>

          <v-textarea
            v-model="testcases.description"
            label="Description"
          ></v-textarea>

          <v-layout>
            <v-flex xs12 md6>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <upload-files
                      :folder="'testcases'"
                      :image="testcases.filename"
                      @filepath="updateImage"
                      @file-url="addfilename"
                      @file_extension="fileExtension"
                      ref="filedata"
                      :resizeheight="250"
                      :resizewidth="300"
                    ></upload-files>
                  </span>
                </template>
                <span>Add File</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <!-- 
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->
        </v-form>
        <div class="d-block text-right card-footer">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveTestcases()"
          >
            Save
          </v-btn>

          <v-btn @click="cancel"> Cancel </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UploadFiles from "../uploadfiles/upload_file.vue";

export default {
  components: {
    UploadFiles,
  },
  data: () => ({
    valid: true,
    name: "",
    message: "",
    testcases: {
      id: 0,
      testcase_Summary: "",
      description: "",
      section_id: null,
      filename: "",
      status: 1,
    },
    nameRules: [(v) => !!v || "Name is required"],

    select: null,
    sections: [],
  }),
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          axios
            .get(
              process.env.VUE_APP_API_URL +
                "fetch_testcases_byid/" +
                this.$route.params.id
            )
            .then((res) => {
              this.message = res.data.message;
              if (res.data.status == "S") {
                this.testcases = res.data.testcases;
              } else {
                console.log("error");
              }
            });
        }
      },
    },
  },
  mounted() {
    this.fetchSections();
  },
  methods: {
    addfilename(filename) {
      alert("test");
      alert(filename);
      this.testcases.filename = filename;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    fetchSections() {
      axios.get(process.env.VUE_APP_API_URL + "fetch_section").then((res) => {
        this.sections = res.data.sections;
      });
    },
    saveTestcases() {
      if (this.$refs.form.validate()) {
        axios
          .post(process.env.VUE_APP_API_URL + "save_testcases", this.testcases)
          .then((res) => {
            this.message = res.data.message;
            if (res.data.status == "S") {
              this.$router.push({
                name: "testcasereport",
              });
            } else {
              console.log("error");
            }
          });
      }
    },
    cancel() {
      this.$router.push({
        name: "testcasereport",
      });
    },
  },
};
</script>
