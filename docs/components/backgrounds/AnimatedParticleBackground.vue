<template>
    <div class="animated-particle-background">
        <template v-if="isDark">
            <div class="glow" />

            <div
                ref="particlesContainer"
                class="particles-container"
            />
        </template>

        <div class="inner-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
// Composables
const darkModeStore = useDarkMode()
const { isDark } = darkModeStore

// States
const particlesContainer = ref<HTMLDivElement | null>(null)

// Particle system
const particleCount = 80
let particles: HTMLDivElement[] = []
let isDestroyed = false

// Methods
const createParticle = () => {
    if (!particlesContainer.value) return

    const particle = document.createElement('div')
    particle.className = 'particle'

    const size = Math.random() * 3 + 1
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    const posX = Math.random() * 100
    const posY = Math.random() * 100

    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`
    particle.style.opacity = `${Math.random() * 0.5 + 0.3}`

    particlesContainer.value.appendChild(particle)
    particles.push(particle)

    animateParticle(particle)
}


const resetParticle = (particle: HTMLDivElement) => {
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`

    return { x: posX, y: posY }
}

const animateParticle = (particle: HTMLDivElement) => {
    if (isDestroyed) return

    const pos = resetParticle(particle)

    const moveDuration = Math.random() * 8 + 6 // 6–14s
    const delay = Math.random() * 0.2 // almost instant

    // Reset transition to avoid jump
    particle.style.transition = 'none'

    requestAnimationFrame(() => {
        setTimeout(() => {
            if (isDestroyed) return

            // Movement transition only
            particle.style.transition = `left ${moveDuration}s linear, top ${moveDuration}s linear`

            const moveX = pos.x + (Math.random() * 20 - 10)
            const moveY = pos.y - Math.random() * 30

            particle.style.left = `${moveX}%`
            particle.style.top = `${moveY}%`

            setTimeout(() => {
                animateParticle(particle)
            }, moveDuration * 1000)
        }, delay * 1000)
    })
}

onMounted(() => {
    if (!isDark.value) return

    for (let i = 0; i < particleCount; i++) {
        createParticle()
    }
})

onBeforeUnmount(() => {
    isDestroyed = true
    particles.forEach(particle => particle.remove())
    particles = []
})

watch(isDark, value => {
    if (!value) {
        isDestroyed = true
        particles.forEach(particle => particle.remove())
        particles = []
        return
    }

    isDestroyed = false

    nextTick(() => {
        for (let i = 0; i < particleCount; i++) {
            createParticle()
        }
    })
})
</script>

<style>
/* --------------------------------------------------
   Animated particle background wrapper (creates stacking context)
-------------------------------------------------- */
.animated-particle-background {
    position: relative;
    overflow: hidden;
}

/* --------------------------------------------------
   Content layer (above background effects)
-------------------------------------------------- */
.inner-content {
    position: relative;
    z-index: 10;
}

/* --------------------------------------------------
   Shared background layers
-------------------------------------------------- */
.particles-container,
.glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

/* --------------------------------------------------
   Glow
-------------------------------------------------- */
.glow {
    z-index: 3;

    /* Bigger coverage */
    width: 80vw;
    height: 80vh;

    /* Positioned towards top-right for dynamic asymmetry */
    top: -20%;
    right: -20%;
    left: auto;

    /* Layered radial gradients for depth */
    background:
        radial-gradient(
            circle at center,
            rgba(88, 0, 255, 0.35) 0%,
            rgba(88, 0, 255, 0.25) 25%,
            rgba(88, 0, 255, 0.15) 45%,
            transparent 70%
        ),
        radial-gradient(
            circle at 60% 40%,
            rgba(120, 80, 255, 0.25),
            transparent 60%
        );

    filter: blur(80px);
    opacity: 0.9;

    animation: pulse 10s ease-in-out infinite alternate;
}

/* --------------------------------------------------
   Particles container
-------------------------------------------------- */
.particles-container {
    z-index: 5;
}

/* --------------------------------------------------
   Individual particle
-------------------------------------------------- */
.particle {
    position: absolute;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0;
    will-change: transform, opacity;
}

/* --------------------------------------------------
   Animations
-------------------------------------------------- */
@keyframes pulse {
    0% {
        opacity: 0.3;
        transform: scale(0.9);
    }
    100% {
        opacity: 0.7;
        transform: scale(1.1);
    }
}
</style>