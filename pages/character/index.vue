<template lang="pug">
.container
  .focusCharacters-header
    img.focusCharacters-header-bg(v-if='character.images', :src="character.images[character.images.length - 1]")
    .focusCharacters-media
      img(v-if='character.profile', :src="imageCDN + character.profile + '?imageView2/1/w/280/h/440/format/jpg/q/75|imageslim'")
      .focusCharacters-text
        .names
          p.cname {{ character.cname }}
          p.name {{ character.name }}
        //- .allegiances
        //-   p 史塔克家族
        //-   p 无面者
        span.born {{ character.nmId }}
  
  .focusCharacters-body
    .focusCharacters-intro
      p(v-for='item in character.intro') {{ item }}
    
    .focusCharacter-stills
      img(v-for='item in character.images', :src="item")
  
    .focusCharacter-item(v-for='item in character.sections')
      .focusCharacter-item-title {{ item.title }}
      .focusCharacter-item-body(v-for='text in item.content') {{ text }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'wechat-auth',
  transition: {
    name: 'slide-left'
  },
  head() {
    return {
      title: '家族成员详情'
    }
  },
  computed: {
    ...mapState({
      imageCDN: 'imageCDN',
      character: 'focusCharacter'
    })
  },
  beforeCreate() {
    let id = this.$route.query.id
    this.$store.dispatch('focusCharacter', id)
  }
}
</script>

<style scoped lang="sass" src='../../static/sass/characters.sass'></style>
