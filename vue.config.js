module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/scss/helpers/_mixin.scss"; @import "@/assets/scss/helpers/_vars.scss";`,
            }
        }
    }
}
