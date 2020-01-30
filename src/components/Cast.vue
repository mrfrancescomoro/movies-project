<template>
    <div class="cast-list">
        <div id="castdrag" class="cast-list__stage">
            <Actor
                v-for="actor in this.cast"
                :key="actor.id"
                :actor="actor"
                @click.native="getActor(actor)"
            />
        </div>
    </div>
</template>

<script>
import Actor from '@/components/Actor';

export default {
    name: 'Cast',
    components: {
        Actor
    },
    props: ['cast'],
    mounted() {
        let stage = document.getElementById('castdrag'),
        snap = document.querySelector('.actor');

        class Slider {
            constructor(options = {}) {
                this.options = {
                    element: options.element || document.getElementById('stage'),
                    easing: options.easing || 0.1,
                    dragSpeed: options.dragSpeed || 1,
                    duration: options.duration || 750,
                };

                this.isMouseDown = false;
                this.isTranslating = false;

                this.currentPosition = 0;
                this.startPosition = 0;
                this.endPosition = 0;

                this.translation = 0;

                this.animationFrame = null;

                this.setupSlider();
            }


            lerp(value1, value2, amount) {
                amount = amount < 0 ? 0 : amount;
                amount = amount > 1 ? 1 : amount;
                return (1 - amount) * value1 + amount * value2;
            }

            getMousePosition(e) {
                var mousePosition;
                if(e.targetTouches) {
                    if(e.targetTouches[0]) {
                        mousePosition = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
                    }
                    else if(e.changedTouches[0]) {
                        mousePosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
                    }
                    else {
                        mousePosition = [e.clientX, e.clientY];
                    }
                }
                else {
                    mousePosition = [e.clientX, e.clientY];
                }

                return mousePosition;
            }

            setBoundaries() {
                if(window.innerWidth >= window.innerHeight) {
                    this.boundaries = {
                        max: -1 * this.options.element.clientWidth + window.innerWidth,
                        min: 0,
                        sliderSize: this.options.element.clientWidth,
                        referentSize: window.innerWidth,
                    };

                    this.direction = 0;
                }
                else {
                    this.boundaries = {
                        max: -1 * this.options.element.clientHeight + window.innerHeight,
                        min: 0,
                        sliderSize: this.options.element.clientHeight,
                        referentSize: window.innerHeight,
                    };

                    this.direction = 1;
                }
            }

            onDragStarted(mousePosition) {
                let items = this.options.element.children
                Array.from(items).forEach(el => {
                    el.style = 'pointer-events: none';
                })
            }

            onDrag(mousePosition) {}

            onDragEnded(mousePosition) {
                let items = this.options.element.children
                Array.from(items).forEach(el => {
                    el.style = 'pointer-events: all';
                })
            }

            onTranslation() {}

            onTranslationEnded() {}

            onSliderResized() {}

            translateSlider(translation) {
                translation = Math.floor(translation * 100) / 100;

                var direction = this.direction === 0 ? "translateX" : "translateY";
                this.options.element.style.transform = direction + "(" + translation + "px)";

                if(this.translation !== translation) {
                    this.onTranslation();
                }
                else if(this.isTranslating && !this.isMouseDown) {
                    this.isTranslating = false;

                    this.onTranslationEnded();
                }

                this.translation = translation;
            }

            animate() {
                var translation = this.lerp(this.translation, this.currentPosition, this.options.easing);

                this.translateSlider(translation);

                this.animationFrame = requestAnimationFrame(this.animate.bind(this));
            }

            onMouseDown(e) {
                this.isMouseDown = true;

                this.options.element.classList.add("dragged");

                var mousePosition = this.getMousePosition(e);
                this.startPosition = mousePosition[this.direction];

                this.onDragStarted(mousePosition);
            }

            onMouseMove(e) {
                if(!this.isMouseDown) return;

                var mousePosition = this.getMousePosition(e);

                this.currentPosition = this.endPosition + ((mousePosition[this.direction] - this.startPosition) * this.options.dragSpeed);

                if(this.currentPosition > this.boundaries.min && this.currentPosition < this.boundaries.max) {
                    this.isTranslating = true;
                }
                else {
                    this.currentPosition = Math.min(this.currentPosition, this.boundaries.min);
                    this.currentPosition = Math.max(this.currentPosition, this.boundaries.max);
                }

                this.onDrag(mousePosition);
            }

            onMouseUp(e) {
                this.isMouseDown = false;

                this.options.element.classList.remove("dragged");

                this.endPosition = this.currentPosition;

                var mousePosition = this.getMousePosition(e);

                this.onDragEnded(mousePosition);
            }

            onResize(e) {
                var ratio = this.translation / this.boundaries.sliderSize;

                this.setBoundaries();

                this.options.element.style.transform = "tanslate3d(0, 0, 0)";

                var newTranslation = ratio * this.boundaries.sliderSize;
                newTranslation = Math.min(newTranslation, this.boundaries.min);
                newTranslation = Math.max(newTranslation, this.boundaries.max);

                this.translateSlider(newTranslation);

                this.currentPosition = newTranslation;
                this.endPosition = newTranslation;

                this.onSliderResized();
            }

            setupSlider() {
                this.setBoundaries();

                stage.addEventListener("mousemove", this.onMouseMove.bind(this), {
                    passive: true,
                });
                stage.addEventListener("mousedown", this.onMouseDown.bind(this));
                stage.addEventListener("mouseup", this.onMouseUp.bind(this));

                stage.addEventListener("touchmove", this.onMouseMove.bind(this), {
                    passive: true,
                });
                stage.addEventListener("touchstart", this.onMouseDown.bind(this), {
                    passive: true,
                });
                stage.addEventListener("touchend", this.onMouseUp.bind(this));

                stage.addEventListener("resize", this.onResize.bind(this));

                this.animate();
            }

            destroySlider() {

                stage.removeEventListener("mousemove", this.onMouseMove, {
                    passive: true,
                });
                stage.removeEventListener("mousedown", this.onMouseDown);
                stage.removeEventListener("mouseup", this.onMouseUp);

                stage.removeEventListener("touchmove", this.onMouseMove, {
                    passive: true,
                });
                stage.removeEventListener("touchstart", this.onMouseDown, {
                    passive: true,
                });
                stage.removeEventListener("touchend", this.onMouseUp);

                stage.removeEventListener("resize", this.onResize);

                cancelAnimationFrame(this.animationFrame);
            }

            destroy() {
                this.destroySlider();
            }

        };

        var options = {
            element: stage,
            easing: 0.075,
            duration: 500,
            dragSpeed: 1.75,
        }

        var slider = new Slider(options);
    },
    methods: {
        getActor: function(person) {
            this.$router.push({ name: 'actordetail', params: { Aid: person.id, Aname: person.name } })
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/Cast';
</style>
