<template>
    <div class="movielist">
        <strong>{{ this.Gname }}</strong>
        <MoviePreview
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @click.native="goToDetail(movie.id)"
        />
    </div>
</template>

<script>
import MoviePreview from '@/components/MoviePreview';
import axios from 'axios';

export default {
    name: 'movielist',
    components: {
        MoviePreview
    },
    data() {
        return {
            Gid: this.$route.params.Gid,
            Gname: this.$route.params.Gname,
            genre: null,
            res: null,
            movies: []
        }
    },
    mounted() {
        this.loadMovies();
    },
    methods: {
        loadMovies: function() {
            axios
                .get('https://api.themoviedb.org/3/discover/movie?api_key=d6aab43d41a49e768563d3c740965ef2&with_genres=' + this.Gid)
                .then(resp => {
                    if(resp.status === 200) {
                        this.res = resp.data.results;
                        this.res.map(movie => this.movies.push(movie))
                    }
                })
        },
        goToDetail: function(movieId) {
            this.$router.push({ name: 'detail', params: { Mid: movieId } })
        }
    }
}
</script>

<style lang="css" scoped>
</style>
