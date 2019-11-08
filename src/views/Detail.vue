<template>
    <div class="detail">
        <figure class="poster">
            <img v-if="this.movie.backdrop_path" :src="imagesUrl(this.movie.backdrop_path)" alt="" />
        </figure>
        <strong>{{ this.movie.original_title }}</strong>
        <p>
            {{ this.movie.overview}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader';
export default {
    name: 'detail',
    data() {
        return {
            Mid: this.$route.params.Mid,
            movie: null,
            isLoading: false
        }
    },
    mounted() {
        this.getMovie(this.Mid);
    },
    methods: {
        imagesUrl: moviePoster => {
            return 'https://image.tmdb.org/t/p/original' + moviePoster;
        },
        getMovie: movieId => {
            this.isLoading = true;
            axios
                .get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=d6aab43d41a49e768563d3c740965ef2')
                .then(resp => {
                    this.movie = resp.data;
                    console.log(this.movie);
                })
                .finally(() => {
                    this.isLoading = false;
                })
        }
    },

}
</script>

<style lang="scss">

</style>
