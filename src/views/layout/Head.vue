<template>
    <header id="head" class="site-head head">
        <Logo />
        <Navbar />
    </header>
</template>

<script>
import Logo from '@/views/layout/Logo';
import Navbar from '@/views/layout/Navbar';

export default {
    name: 'Head',
    components: {
        Logo, Navbar
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/Head';
</style>
