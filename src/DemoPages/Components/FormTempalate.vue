<template>
<div class="card main-card mb-3">
    <v-form v-model="valid">
        <!--Basic Text Field Form -->
        <v-container>
            <h4>Basic Text Field</h4>
            <v-layout>
                <v-flex xs12 md4>
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12 md4>
                    <v-select v-model="e6" :items="states" :menu-props="{ maxHeight: '400' }" label="Select" hint="Pick your favorite states" persistent-hint>
                    </v-select>
                </v-flex>

                <v-flex xs12 md4>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" label="Select Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 md4>
                    <v-checkbox v-model="checkbox" :label="`Checkbox 1: ${checkbox.toString()}`"></v-checkbox>

                </v-flex>

            </v-layout>
            <v-layout>

                <v-flex xs12 md4>
                    <v-radio-group v-model="radioGroup">
                        <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
                    </v-radio-group>

                </v-flex>
                <v-flex xs12 md4>
                    <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
                    <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
                </v-flex>

                <v-flex xs12 md4>
                    <v-radio-group v-model="row" row>
                        <v-radio label="Option 1" value="radio-1"></v-radio>
                        <v-radio label="Option 2" value="radio-2"></v-radio>
                    </v-radio-group>
                    <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>

                </v-flex>

            </v-layout>
            <v-layout>

                <v-flex xs12 md4>
                    <div class="position-relative form-group">
                        <label for="exampleFile" class>File</label>
                        <input name="file" id="exampleFile" type="file" class="form-control-file" />
                        <small class="form-text text-muted">
                            This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                        </small>
                    </div>
                </v-flex>

                <v-flex xs12 md8>
                    <v-textarea name="input-7-1" label="Text Area" value="" hint="Hint text">
                    </v-textarea>

                </v-flex>

            </v-layout>
            <v-layout>
                <v-flex xs12 md12>
                    <div>
                        <b-card class="main-card mb-3">
                            <ckeditor :editor="editor2" v-model="editorData" :config="editorConfig"></ckeditor>
                        </b-card>
                    </div>

                </v-flex>
            </v-layout>
            <v-layout>
                <v-checkbox v-model="checkbox">
                    <template v-slot:label>
                        <div>
                            I agree that
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <a target="_blank" href="http://vuetifyjs.com" @click.stop v-on="on">Vuetify</a>
                                </template>
                                Opens in new window
                            </v-tooltip>is awesome
                        </div>
                    </template>
                </v-checkbox>
            </v-layout>
            <v-layout>

                <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>

                <v-btn color="error" @click="reset">Reset Form</v-btn>

                <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
            </v-layout>

        </v-container>

        <!--Basic Text Field Form -->

    </v-form>

</div>
</template>

<!--Basic Form Script-->

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
    components: {
        ckeditor: CKEditor.component
    },
    data: () => ({
        e6: [],
        e7: [],
        states: [
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District of Columbia",
            "Federated States of Micronesia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Marshall Islands",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Mariana Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Palau",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virgin Island",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ],
        checkbox: true,
        radioGroup: 1,
        switch1: true,
        editor2: ClassicEditor,
        editorData: "<p>Content of the editor.</p>",
        editorConfig: {
            // The configuration of the editor.
        },
        valid: false,
        firstname: "",
        lastname: "",
        nameRules: [
            v => !!v || "Name is required",
            v => v.length <= 10 || "Name must be less than 10 characters"
        ],
        email: "",
        emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
        ]
    })
};
</script>
