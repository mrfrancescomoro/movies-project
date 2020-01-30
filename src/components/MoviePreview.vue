<template>
    <div class="movie-preview">
        <figure class="movie-preview__pic">
            <img :src="imagesUrl(movie.poster_path)" alt="" />
        </figure>
        <span class="movie-preview__title">
            <span class="title">{{ movie.original_title }}</span>
            <small>{{ getYear(movie.release_date) }}</small>
        </span>
    </div>
</template>

<script>
export default {
    name: 'MoviePreview',
    props: ['movie'],
    mounted() {
        console.log(this.movie);
    },
    methods: {
        imagesUrl: function(moviePoster) {
            return 'https://image.tmdb.org/t/p/w500/' + moviePoster;
        },
        getYear: release => {
            return release.substring(0,4);
        }
    }
}
</script>

<style lang="scss">
    .movie-preview {
        display: block;
        width: var(--preWidth);
        margin: calc(var(--gutter) / 2) var(--gutter);
        &__pic {
            display: block;
            width: 100%;
            @include size(var(--preWidth), var(--preHeight));
            margin: 0;
            overflow: hidden;
            img {
                display: block;
                @include size(100%,100%);
                object-fit: cover;
            }
        }
        &__title {
            display: block;
            width: 100%;
            padding: 6px 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            .title {
                font-weight: $extra;
                font-size: 1em;
            }
            small {
                display: block;
                width: 100%;
                font-size: 0.8em;
                opacity: 0.6;
            }
        }
    }
</style>
