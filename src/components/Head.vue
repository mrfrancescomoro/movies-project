<template>
    <header id="head" class="head">
        <Logo />
        <Navbar />
    </header>
</template>

<script>
import Logo from '@/components/Logo';
import Navbar from '@/components/Navbar';

export default {
    name: 'Head',
    components: {
        Logo, Navbar
    }
}
</script>
