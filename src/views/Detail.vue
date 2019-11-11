<template>
    <div v-if="this.movie" class="detail">
        <figure class="poster">
            <img :src="imagesUrl(this.movie.backdrop_path)" alt="" />
        </figure>
        <strong>{{ this.movie.original_title }}</strong>
        <p>
            {{ this.movie.overview}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'detail',
    data() {
        return {
            Mid: this.$route.params.Mid,
            movie: null
        }
    },
    mounted() {
        axios
            .get('https://api.themoviedb.org/3/movie/' + this.Mid + '?api_key=d6aab43d41a49e768563d3c740965ef2')
            .then(resp => {
                if(resp.status === 200) {
                    this.movie = resp.data;
                }
            })
    },
    methods: {
        imagesUrl: moviePoster => {
            return 'https://image.tmdb.org/t/p/original' + moviePoster;
        }
    }
}
</script>

<style lang="scss">

</style>
