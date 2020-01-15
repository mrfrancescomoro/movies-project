<template>
    <div v-if="this.actor" class="actordetail">
        <div class="content">
            <figure class="actor__pic">
                <img :src="imagesUrl(this.actor.images.profiles[0].file_path)" alt="" />
            </figure>
        </div>
        <strong>{{ this.actor.name }}</strong>
        <small>{{ this.actor.birthday}}</small>
        <p>
            {{ this.actor.biography }}
        </p>
        </div>
    </div>
</template>

<script>
    import Movie from '@/components/Movie';
    import axios from 'axios';

    export default {
        name: 'actordetail',
        components: {
            Movie
        },
        data() {
            return {
                Aid: this.$route.params.Aid,
                actor: null
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData: function() {
                axios
                    .get('https://api.themoviedb.org/3/person/' + this.Aid + '?api_key=d6aab43d41a49e768563d3c740965ef2&append_to_response=images,tagged_images,combined_credits')
                    .then(resp => {
                        this.actor = resp.data;
                        console.log(this.actor);
                    })
            },
            imagesUrl: moviePoster => {
                return 'https://image.tmdb.org/t/p/original' + moviePoster;
            }
        }
    }
</script>

<style lang="scss">
@import '@/assets/scss/pages/ActorDetail';
</style>
