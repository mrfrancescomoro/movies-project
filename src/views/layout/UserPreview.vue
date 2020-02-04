<template>
    <div class="user-preview">
        <figure class="user-preview__pic">
            <img src="@/assets/images/profile-picture.jpg" alt="" />
        </figure>
    </div>
</template>

<script>
export default {
    name: 'UserPreview',
    mounted() {

    },
}
</script>

<style lang="scss">
    .user-preview {
        display: flex;
        @extend %flexCenterStart;
        margin-left: var(--gutter);
        &__pic {
            @include size(40px, 40px);
            overflow: hidden;
            box-shadow: 0 0 15px $black;
            margin: 0;
            img {
                @include size(100%,100%);
                object-fit: cover;
            }
        }
    }
</style>
