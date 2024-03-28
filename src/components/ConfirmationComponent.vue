<template>
    <transition name="slide-fade">
        <div
            v-if="isVisible"
            class="fixed top-0 inset-x-0 flex items-center justify-center px-4 py-2"
        >
            <div class="max-w-md p-6 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false
        };
    },
    mounted() {
        this.isVisible = true;

        setTimeout(() => {
            this.isVisible = false;
        }, 1500);
    }
};
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
