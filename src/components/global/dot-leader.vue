<template>
  <ul class="leaders">
    <li>
      <span>
        <slot />
      </span>
      <span>
        <slot name="end" />
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "DotLeader",
}
</script>

<style lang="stylus" scoped>
ul.leaders
  max-width: 60em
  padding: 0.2rem 0
  overflow-x: hidden
  list-style: none

ul.leaders li:after
  float: left
  width: 0
  white-space: nowrap

  buf = ''
  for i in 1..200
    buf += '. '
  content: buf

ul.leaders span:first-child
  // padding-right: 0.33em
  background: #FBFBF8

ul.leaders span + span
  float: right
  padding-left: 0.33em
  padding-bottom: 1px
  position: relative
  z-index: 1
  background: #FBFBF8
</style>
