<template>
    <div v-if="this.movie" class="detail">
        <div class="bg">
            <img :src="imagesUrl(this.movie.backdrop_path)" alt="" />
        </div>
        <div class="movie">
            <div class="content">
                <div class="movie__data">
                    <h1 class="movie__data-title">{{ this.movie.original_title }}</h1>
                    <div class="movie__data-info">
                        <span class="movie__data-duration">Duration: {{ this.movie.runtime }} min</span>
                        <div class="movie__data-cats">
                            <strong>Genres:</strong>
                            <span v-for="genre in this.movie.genres">
                                {{ genre.name }}
                            </span>
                        </div>
                    </div>
                    <p class="movie__info-description">
                        {{ this.movie.overview}}
                    </p>
                </div>
                <div class="movie__info">
                    <div class="movie__info-cast">
                        <a v-for="actor in this.movie.credits.cast" href="javascript:void(0);" class="actor">
                            <figure class="actor__pic">
                                <img :src="imagesUrl(actor.profile_path)" alt="" />
                            </figure>
                            <strong>{{ actor.character }}</strong>
                            <small>{{ actor.name }}</small>
                        </a>
                    </div>
                </div>
            </div>
        </div>
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
            .get('https://api.themoviedb.org/3/movie/' + this.Mid + '?api_key=d6aab43d41a49e768563d3c740965ef2&append_to_response=videos,credits,images')
            .then(resp => {
                if(resp.status === 200) {
                    this.movie = resp.data;
                    console.log(this.movie);
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
@import '@/assets/scss/components/Detail';
</style>
