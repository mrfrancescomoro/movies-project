<template>
    <div class="{'is-loading' : loading}">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: ['loading']
}
</script>

<style lang="css" scoped>
</style>
