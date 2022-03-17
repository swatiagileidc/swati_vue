  <template>
  <div>
    <!-- {{sections}} -->
    <h3>Sections</h3>
    <div style="display: flex">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn @click="add_section()" color="primary" small>Create</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="sections"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.section_name }}</td>
          <td>{{ props.item.parent_name }}</td>
          <td>
            <!-- <router-link
              style="padding-top: 15px"
              :to="{ name: 'section_amend', params: { id: props.item.id } }"
            > -->
              <v-icon small class="mr-2" @click="editSection( props.item.id)">edit</v-icon>
            <!-- </router-link> -->

            <v-icon small class="mr-2" @click="DeleteItem(props.item.id)"
              >delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
        <v-dialog v-model="dialog" max-width="1000px">
        <v-card>
          <v-card-title>
            <!-- <span class="headline">{{ $t("leads") }}</span> -->
          <page-title heading="Sections" :icon="icon"></page-title>
          </v-card-title>

          <v-card-text>                
           <v-form ref="form">
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                             <v-select
                                v-model="fieldItem.parent_id"
                                :items="sections.filter((item)=>item.id !== fieldItem.id && item.parent_id !== fieldItem.id) "
                                item-text="section_name"
                                item-value="id"
                                label="Item"
                                required
                            ></v-select>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                            <v-text-field
                              v-model="fieldItem.section_name"
                              outlined
                              clearable
                              clear-icon="mdi-close-circle"
                             label="Module name"
                              :rules="fieldRules"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <template style="margin: 2px !important">
              <div class="d-inline-block mr-2">
                <v-btn
                  @click="dialog = false"
                  small
                  class="mr-2 secondary"
                >
                  Cancel
                </v-btn>

                <v-btn
                  @click="saveSection"
                  small
                  class="mr-2 primary"
                >
                Save </v-btn>
              </div>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sections: [],
      dialog:false,
      headers: [
        {
          text: "Section Name",
          align: "start",
          sortable: false,
          value: "section_name",
        },
        { text: "Parent Name", value: "parent_name" },
        { text: "Action", value: "action" },
      ],
      search: "",
      departments:[],
      fieldItem:{
        id:0,
        section_name:"",
        parent_id:0,
      },
      valid: false,
      fieldRules: [(v) => !!v || "Field is required"],

    };
  },
  mounted() {
    this.fetchSections();
  },
  methods: {
    add_section(){
      this.fieldItem.id = 0;
      this.fieldItem.section_name = "";
      this.fieldItem.parent_id = 0;
      this.dialog = true;
    },

    editSection($id){
      this.dialog = true;
      axios.get(process.env.VUE_APP_API_URL + 'fetch_section_byid/'+$id).then((res)=>
      {
          this.message = res.data.message;
          if(res.data.status == 'S'){
              this.fieldItem = res.data.sections;
          }else{
              console.log('error');
          }
      });
    },

    fetchSections() {
      axios.get(process.env.VUE_APP_API_URL + "fetch_section").then((res) => {
        this.sections = res.data.sections;
      });
    },
    DeleteItem(id) {
      if (confirm("Do you really want to delete?")) {
        axios
          .get(process.env.VUE_APP_API_URL + "delete_section/" + id)
          .then((res) => {
            if (res.data.status == "S") {
              this.message = res.data.message;
              this.fetchSections();
            } else {
              console.log("error");
            }
          });
      }
    },
      saveSection(){
          if (this.$refs.form.validate()) {
            axios.post(process.env.VUE_APP_API_URL + 'save_section',this.fieldItem).then((res)=>
            {
                this.message = res.data.message;
                if(res.data.status == 'S'){
                   this.dialog = false;
                   this.fetchSections();
                }else{
                    console.log('error');
                }
            })
          }
      },
  },

};
</script>