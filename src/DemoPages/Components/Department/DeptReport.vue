<template>
<div>
    <!-- {{departments}} -->
    <h3>Departments</h3>
    <div style="display:flex">
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
    :items="departments"
    :items-per-page="5"
    :search="search"
    class="elevation-1"
  >
  <template v-slot:item="props">
    <tr>
        <td>{{props.item.name}}</td>
        <td>{{props.item.description}}</td>
        <td>
             <router-link
              style="padding-top: 15px"
              :to="{ name: 'deptamend', params: { id: props.item.id } }"
            >
            <v-icon  small class="mr-2">edit</v-icon>
             </router-link>
         
            <v-icon  small class="mr-2" @click="DeleteItem(props.item.id)">delete</v-icon>
        </td>
    </tr> 
</template>
  </v-data-table>
  </div>
  </template>


<script>
import axios from "axios";
  export default {
    data () {
      return {
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
        this.fetchDept();
    },
    methods:{
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