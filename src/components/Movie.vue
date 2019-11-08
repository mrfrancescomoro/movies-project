<template>
    <div class="movie">
        <figure class="movie__pic">
            <img :src="imagesUrl(movie.poster_path)" alt="" />
        </figure>
        <strong>{{ movie.original_title }}</strong>
    </div>
</template>

<script>
export default {
    name: 'Movie',
    props: ['movie'],
    methods: {
        imagesUrl: function(moviePoster) {
            return 'https://image.tmdb.org/t/p/w500/' + moviePoster;
        }
    }
}
</script>

<style lang="scss">
    .movie {
        display: block;
        @include size(150px, 300px);
        border: 1px solid $water;
        margin: 10px;
        cursor: pointer;
        &__pic {
            width: 100%;
            margin: 0;
            img { width: 100%; }
        }
    }
</style>
