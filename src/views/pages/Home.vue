<template>
    <div class="catalogue">
        <div class="movies-list">
            <h2>Trending Movies</h2>
            <MoviePreview
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
                @click.native="goToDetail(movie.id, movie.media_type)"
            />
        </div>
        <div class="movies-list">
            <h2>Trending TV Series</h2>
            <SeriePreview
                v-for="serie in series"
                :key="serie.id"
                :serie="serie"
                @click.native="goToDetail(serie.id, serie.media_type)"
            />
        </div>
    </div>
</template>

<script>
    import MoviePreview from '@/components/MoviePreview';
    import SeriePreview from '@/components/SeriePreview';
    import axios from 'axios';

    import Slider from '@/components/utilities/Slider';

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
            this.loadSeries();
            this.getGeneres();
        },
        methods: {
            getGeneres: function() {
                axios
                    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=d6aab43d41a49e768563d3c740965ef2`)
                    .then(resp => {
                        this.res = resp.data.genres;
                        console.log(this.res);
                    })
            },
            loadMovies: function() {
                axios
                    .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=d6aab43d41a49e768563d3c740965ef2`)
                    .then(resp => {
                        this.res = resp.data.results;
                        this.res.map(movie => this.movies.push(movie));
                    })
            },
            loadSeries: function() {
                axios
                    .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=d6aab43d41a49e768563d3c740965ef2`)
                    .then(resp => {
                        this.res = resp.data.results;
                        this.res.map(serie => this.series.push(serie));
                    })
            },
            goToDetail: function(mediaId, mediaType) {
                this.$router.push({ name: 'detail', params: { Mid: mediaId, type: mediaType } })
            }
        }
    }
</script>

<style lang="scss">
.catalogue {
    margin-top: var(--head);
}
h2 {
    display: block;
    width: 100%;
    text-align: center;
    font-weight: $bold;
}
    .movies-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
