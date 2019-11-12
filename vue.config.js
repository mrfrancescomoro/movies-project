module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "@/assets/scss/helpers/_mixin.scss";
                    @import "@/assets/scss/helpers/_vars.scss";
                    @import "@/assets/scss/helpers/_typo.scss";
                    @import "@/assets/scss/_base.scss";
                    @import "@/assets/scss/helpers/_layout.scss";
                `,
            }
        }
    }
}
