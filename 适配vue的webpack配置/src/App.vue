<template>
    <div id="main">
        <Home></Home>
        <img src="./assets/img/20210525205915_df87b.jpg" alt="">
    </div>
</template>

<script>
import Home from '@pages/Home'
export default {
    name: 'VueWebpackApp',

    data () {
        return {

        };
    },

    mounted () {

    },

    methods: {

    },
    components: {
        Home
    }
};
</script>

<style scoped>
#main {
    height: 100%;
}
</style>
<style>
@import url('@/assets/css/reset.css');
html {
    height: 100%;
}

body {
    height: 100%;
}
</style>