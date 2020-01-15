<template>
    <div v-if="this.actor" class="actordetail">
		<div class="content">
			<div class="actor">
				<div class="actor__info">
					<h1 class="main-title">
						{{ this.actor.name }}
					</h1>
					<span class="personal">
						<strong>Birthday:</strong> {{ this.actor.birthday }}
						<p>
							{{ this.actor.biography }}
						</p>
					</span>
				</div>
				<div class="actor__pics">
					<figure class="actor__pics-img">
						<img :src="imagesUrl(this.actor.profile_path)" alt="" />
					</figure>
				</div>
				<div class="filmography">

				</div>
			</div>
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
