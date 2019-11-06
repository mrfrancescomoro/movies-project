<template>
    <div class="catalogue">
        <h1>Catalogue</h1>
        <div class="movies-list">
            <Movie v-for="movie in movies" :key="movies.id" :movie="movie" />
        </div>
    </div>
</template>

<script>
    import Movie from '@/components/Movie';
    import axios from 'axios';

    export default {
        name: 'catalogue',
        components: {
            Movie
        },
        data() {
            return {
                res: null,
                movies: []
            }
        },
        methods: {
            loadMovies: function() {
                axios
                    .get('https://api.themoviedb.org/3/movie/popular?api_key=d6aab43d41a49e768563d3c740965ef2')
                    .then(resp => {
                        this.res = resp.data.results;
                        this.res.map(movie => this.movies.push(movie));

                        console.log(this.movies);

                    })
            }
        },
        mounted() {
            this.loadMovies();
        }
    }
</script>

<style lang="scss">
    h1 {
        font-family: $title;
    }
    .movies-list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
