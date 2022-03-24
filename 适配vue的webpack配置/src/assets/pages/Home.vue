<template>
    <div class="home">
        <Header class="top"></Header>
        <Footer class="bottom"></Footer>
    </div>
</template>

<script>
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
export default {
    name: 'VueWebpackHome',

    data () {
        return {

        };
    },
    components: {
        Header, Footer
    },
    mounted () {

    }
};
</script>

<style  scoped>
.home {
    height: 100%;
    position: relative;
    box-sizing: border-box;
}

.top {
    position: absolute;
    width: 100%;
    height: 150px;
    top: 0;
    left: 0;
    background-color: #258963;
}

.bottom {
    position: absolute;
    width: 100%;
    height: 250px;
    bottom: 0;
    left: 0;
    background-color: #558964;
}
</style>