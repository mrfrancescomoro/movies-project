<template>
    <div id="nav">
        <nav id="menu" class="menu" role="navigation">
            <router-link to="/" class="menu-link">Home</router-link>
            <router-link to="/movies" class="menu-link">Movies</router-link>
            <router-link to="/tvshows" class="menu-link">TV Shows</router-link>
            <router-link to="/latest" class="menu-link">Latest</router-link>
        </nav>
        <div class="utilities">
            <button class="search-btn" @click.native="openSearch()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23">
                    <path d="M23.008 21.952l-1.047 1.047-7.356-7.357c-3.492 2.958-8.723 2.796-12.016-.497-3.47-3.47-3.47-9.096 0-12.566 3.47-3.47 9.096-3.47 12.565 0 3.294 3.293 3.455 8.525.498 12.016l7.356 7.357zM14.107 3.626C11.216.735 6.528.735 3.636 3.626c-2.892 2.892-2.892 7.58 0 10.472 2.892 2.892 7.58 2.892 10.471 0 2.892-2.892 2.892-7.58 0-10.472z"/>
                </svg>
            </button>
            <UserPreview @click.native="goToProfile()" />
        </div>
    </div>
</template>

<script>
import UserPreview from '@/views/layout/UserPreview';
import Search from '@/views/layout/Search';
export default {
    name: 'Navbar',
    components: {
        UserPreview,
        Search
    },
    mounted() {

    },
    methods: {
        goToProfile() {
            this.$router.push({ name: 'user' });
        }
    }
}
</script>
<style lang="scss">

</style>
