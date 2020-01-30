<template>
    <div v-if="this.movie" class="detail">
        <div class="bg">
            <img :src="imagesUrl(getBgImage(this.movie.images.backdrops))" alt="" />
        </div>
        <div class="movie">
            <div class="content">
                <h1 class="title">{{ this.movie.original_title }}</h1>
                <div class="movie__data">
                    <div class="movie__data-main">
						<div class="rating">
                            <svg class="rating-stars" viewBox="0 0 5 0.84375">
                                <rect class="value" :width="this.movie.stars" height="100%" fill="url(#fill)" />
                                <rect fill="url(#stroke)" width="100%" height="100%"/>
                                <defs>
                                    <pattern id="fill" width="1" height="100%" patternUnits="userSpaceOnUse">
                                        <use x=".0625" fill="#efa81a" xlink:href="#star"/>
                                    </pattern>
                                    <pattern id="stroke" width="1" height="100%" patternUnits="userSpaceOnUse">
                                        <use x=".0625" fill="none" stroke="#efa81a" stroke-width=".0625" stroke-linejoin="round" stroke-location="outside" xlink:href="#star"/>
                                    </pattern>
                                    <polygon id="star" points="0.4375, 0.09375, 0.53125, 0.34375, 0.78125, 0.34375, 0.5625, 0.5, 0.625, 0.75, 0.4375, 0.59375, 0.25, 0.75, 0.3125, 0.5, 0.09375, 0.34375, 0.34375, 0.34375"/>
                                </defs>
                            </svg>
                        </div>
                        <strong class="year">{{ this.movie.release_year }}</strong>
                        <span class="duration">{{ this.movie.runtime }} min</span>
                        <div class="generes">
                            <router-link
                                class="genre"
                                v-for="genre in this.movie.genres"
                                :key="genre.id"
                                :to="{ name: 'movielist', params: {Gid: genre.id, Gname: genre.name } }"
                            >
                                {{ genre.name }}
                            </router-link>
                        </div>
                        <span v-if="this.movie.tagline" class="tagline">{{ this.movie.tagline }}</span>
                        <p class="description">
                            {{ this.movie.overview }}
                        </p>
                    </div>
                </div>
                <div class="movie__info">
                    <Cast :cast="this.actors" />
                </div>
                <div class="trailers">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cast from '@/components/Cast';
    import axios from 'axios';

    export default {
        name: 'detail',
        components: {
            Cast
        },
        data() {
            return {
                Mid: this.$route.params.Mid,
                movie: null,
                actors: null
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData: function() {
                axios
                .get('https://api.themoviedb.org/3/movie/' + this.Mid + '?api_key=d6aab43d41a49e768563d3c740965ef2&append_to_response=videos,credits,images')
                .then(resp => {
                    if(resp.status === 200) {
                        resp.data.stars = this.calculateRating(resp.data.vote_average);
                        resp.data.release_year = this.getYear(resp.data.release_date);
                        this.movie = resp.data;
                        this.actors = this.movie.credits.cast;
                        console.log(this.movie);
                    }
                })
            },
            imagesUrl: moviePoster => {
                return 'https://image.tmdb.org/t/p/original' + moviePoster;
            },
            calculateRating: val => {
                val = val / 2;
                return val;
            },
            getYear: release => {
                return release.substring(0,4);
            },
            getBgImage: imgs => {
                let random = Math.floor(Math.random() * imgs.length);
                return imgs[random].file_path;
            }
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/pages/Detail';
</style>
