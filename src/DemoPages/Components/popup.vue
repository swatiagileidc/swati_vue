<template>
    <div>
        <v-btn @click="add_section">add section</v-btn>
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
                                v-model="select_module"
                                :items="items"
                                :rules="[v => !!v || 'Item is required']"
                                label="Item"
                                required
                            ></v-select>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                            <v-text-field
                              v-model="module_name"
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
                  @click="dialog = false"
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
    data () {
      return {
        dialog:false,
        departments:[],
        headers: [
          {
            text: 'Department name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Description', value: 'description' },
          { text: 'action', value: 'action' },
         
        ],
       search:"",
      }
    },
    mounted(){
    },
    methods:{
        add_section(){
            this.dialog = true;
        },
        fetchDept(){
            axios.get(process.env.VUE_APP_API_URL + 'fetch_dept').then((res)=>
            {
                this.departments = res.data.Department_data;
            })
        },
        DeleteItem(id){
            if(confirm("Do you really want to delete?")){
                 axios.get(process.env.VUE_APP_API_URL + 'delete_dept/'+id).then((res)=>
            {
                if(res.data.status == 'S'){
                    this.message = res.data.message;
                    this.fetchDept();
                }else{
                    console.log('error');
                }
            })
            }
           
        },
        create(){
             this.$router.push({
              name:"deptamend",
          });
        }
    }
  }
</script>