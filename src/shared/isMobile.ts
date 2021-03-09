import { ref } from 'vue'

const isMobile = ref<boolean>(true)
const checkIsMobile = (): boolean =>
  /iPhone|phone|android|iPod|pad|iPad/i.test(navigator.userAgent.toLowerCase())

try {
  isMobile.value = checkIsMobile()

  window.addEventListener(
    'orientationchange' in window ? 'orientationchange' : 'resize',
    () => {
      isMobile.value = checkIsMobile()
    },
    false
  )
} catch (error) {
  isMobile.value = true
}

export default isMobile
