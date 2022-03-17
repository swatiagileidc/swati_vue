<template>
<div>
    <!-- {{users}} -->
    <h3>Users</h3>
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
    :items="users"
    :items-per-page="5"
    :search="search"
    class="elevation-1"
  >
  <template v-slot:item="props">
    <tr>
        <td>{{props.item.name}}</td>
        <td>{{props.item.email}}</td>
        <v-btn color='primary' small @click="viewUser(props.item.id)">View</v-btn>
        <td>
             <router-link
              style="padding-top: 15px"
              :to="{ name: 'useramend', params: { id: props.item.id } }"
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
        users:[],
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Email', value: 'email' },
          { text: 'View', value: 'view' },
          { text: 'action', value: 'action' },
         
        ],
       search:"",
      }
    },
    mounted(){
        this.fetchUser();
    },
    methods:{
        fetchUser(){
            axios.get(process.env.VUE_APP_API_URL + 'fetch_user').then((res)=>
            {
                this.users = res.data.userdata;
            })
        },
        DeleteItem(id){
            if(confirm("Do you really want to delete?")){
                 axios.get(process.env.VUE_APP_API_URL + 'delete_user/'+id).then((res)=>
            {
                if(res.data.status == 'S'){
                    this.message = res.data.message;
                    this.fetchUser();
                }else{
                    console.log('error');
                }
            })
            }
           
        },
        viewUser(id){
          // alert(id)
          this.$router.push({
              name:"userview",params :{id:id}
          });

        },
         create(){
             this.$router.push({
              name:"useramend",
          });
        }
    }
  }
</script>
