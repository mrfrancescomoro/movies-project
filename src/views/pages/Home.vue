<template>
    <div class="catalogue">
        <div class="movies-list">
            <MoviePreview
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @click.native="goToDetail(movie.id)"
            />
        </div>
        <div class="movies-list">
            <SeriePreview
                v-for="serie in series"
                :key="serie.id"
                :serie="serie"
                @click.native="goToDetail(serie.id)"
            />
        </div>
    </div>
</template>

<script>
    import MoviePreview from '@/components/MoviePreview';
    import SeriePreview from '@/components/SeriePreview';
    import axios from 'axios';

    export default {
        name: 'home',
        components: {
            MoviePreview,
            SeriePreview
        },
        data() {
            return {
                res: null,
                movies: [],
                series: []
            }
        },
        mounted() {
            this.loadMovies();
        },
        methods: {
            loadMovies: function() {
                axios
                    .get('https://api.themoviedb.org/3/trending/movie/week?api_key=d6aab43d41a49e768563d3c740965ef2')
                    .then(resp => {
                        this.res = resp.data.results;
                        this.res.map(movie => this.movies.push(movie));
                    })
            },
            loadSeries: function() {
                axios
                    .get('https://api.themoviedb.org/3/trending/tv/week?api_key=d6aab43d41a49e768563d3c740965ef2')
                    .then(resp => {
                        this.res = resp.data.results;
                        this.res.map(serie => this.series.push(serie));
                    })
            },
            goToDetail: function(movieId) {
                this.$router.push({ name: 'detail', params: { Mid: movieId } })
            }
        }
    }
</script>

<style lang="scss">
    .movies-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
