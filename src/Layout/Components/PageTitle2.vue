<template>
<div class="app-page-title">
    <div class="page-title-wrapper">
        <div class="page-title-heading">
            <div>
                {{heading}}
                <div class="page-title-subheading">{{subheading}}</div>
            </div>
        </div>
        <div class="page-title-actions">

        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {

    },
    props: {

        heading: String,
        subheading: String
    }
};
</script>
