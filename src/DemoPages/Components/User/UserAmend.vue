<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      :rules="nameRules"
      label="Password"
      required
      v-if="user.id==0"
    ></v-text-field>

    <v-select
      v-model="user.deptids"
      :items="departments"
      item-value="id"
      item-text='name'
      :rules="nameRules"
      label="Departments"
      required
      multiple
    ></v-select>


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="saveUser()"
    >
      Save
    </v-btn>

    <v-btn
      @click="cancel"
    >
      Cancel
    </v-btn>
  </v-form>
</template>
<script>
import axios from "axios";
  export default {
    data: () => ({
      valid: true,
      name: '',
      message:"",
      user:{
          id:0,
          name:"",
          description:"",
          deptids:[],
      },
      dept:[],
      nameRules: [
        v => !!v || 'Field is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      departments:[],
    }),
    watch:{
        "$route.params.id":{
          
            immediate:true,
            handler(){
                if(this.$route.params.id){
                    axios.get(process.env.VUE_APP_API_URL + 'fetch_user_byid/'+this.$route.params.id).then((res)=>
                    {
                        this.message = res.data.message;
                        if(res.data.status == 'S'){
                            this.user = res.data.user_data;
                             let deptdata = res.data.user_data.user_dept;
                            deptdata.map((item)=>{
                                this.dept.push(item.dept.id);
                            })
                            this.user.deptids = this.dept;
                        }else{
                            console.log('error');
                        }
                    });
                }
            }
        }
    },
    mounted(){
      this.fetchDept();
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
       fetchDept(){
            axios.get(process.env.VUE_APP_API_URL + 'fetch_dept').then((res)=>
            {
                this.departments = res.data.Department_data;
            })
        },
      saveUser(){
          if(this.$refs.form.validate()){
            axios.post(process.env.VUE_APP_API_URL + 'save_user',this.user).then((res)=>
            {
                this.message = res.data.message;
                if(res.data.status == 'S'){
                    this.$router.push({
                        name:"userreport",
                    });
                }else{
                    console.log('error');
                }
            })
          }
      },
      cancel(){
        this.$router.push({
            name:"userreport",
        });
      }
    },
  }
</script>
