<template>
    <div class="actor">
        <figure class="actor__img">
            <img :src="imagesUrl(actor.profile_path)" alt="" />
        </figure>
        <span class="actor__name">
            {{ actor.name }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Actor',
    props: ['actor'],
    methods: {
        imagesUrl: function(actorImg) {
            return 'https://images.tmdb.org/t/p/w500/' + actorImg;
        }
    }
}
</script>

<style lang="scss">
    .actor {
        display: block;
        width: 150px;
        position: relative;
        margin: 0 10px;
        // pointer-events: none;
        &__img {
            width: 100%;
            margin: 0;
            pointer-events: none;
            img {
                width: 100%;
            }
        }
        &__name {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            @extend %flexEndStart;
            background-image: linear-gradient(to top, $black, transparent);
            @include size(100%,50%);
            font-family: $title;
            white-space: normal;
            font-size: 1em;
            line-height: 1em;
            color: $white;
            padding: 0 calc(var(--gutter) / 2) var(--gutter);
            pointer-events: none;
        }
    }
</style>
