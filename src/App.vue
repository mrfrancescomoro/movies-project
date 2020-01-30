<template>
    <div id="itsawrap">
        <Head />
        <main class="site-wrap">
            <router-view/>
        </main>
    </div>
</template>
<script>
    import Head from '@/views/layout/Head';
    export default {
        name: 'App',
        components: {
            Head
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/main';
</style>
