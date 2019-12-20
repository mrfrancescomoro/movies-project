<template>
    <div class="actordetail">
        <strong>{{ this.actor.name }}</strong>
    </div>
</template>

<script>
    import Movie from '@/components/Movie';
    import axios from 'axios';

    export default {
        name: 'actordetail',
        components: {
            Movie
        },
        data() {
            return {
                Aid: this.$route.params.Aid,
                actor: null
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData: function() {
                axios
                    .get('https://api.themoviedb.org/3/person/' + this.Aid + '?api_key=d6aab43d41a49e768563d3c740965ef2')
                    .then(resp => {
                        this.actor = resp.data;
                    })
            },
            imagesUrl: moviePoster => {
                return 'https://image.tmdb.org/t/p/original' + moviePoster;
            }
        }
    }
</script>

<style lang="scss">
</style>
