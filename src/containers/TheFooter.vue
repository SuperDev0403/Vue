<template>
  <CFooter :fixed="false">
    <div>
      <a href="#" target="_blank">Admintexas</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">{{$t('footer')}}</span>
      <a href="#" target="_blank">idream</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
