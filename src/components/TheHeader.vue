<template>
    <div id="the-header">
        <svg viewBox="0 0 350 50">
            <text y="40">Dog Fetcher</text>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
#the-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15vh;
    svg {
        font: bold 50px 'Arial';
        height: 50px;
    }
    text{
      fill: black;
      stroke: white;
      stroke-width:2px;
      stroke-linejoin: round;
    }
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#677df7+2,677df7+29,82bbfc+100 */
    background: rgb(103,125,247); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(103,125,247,1) 2%, rgba(103,125,247,1) 29%, rgba(130,187,252,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(103,125,247,1) 2%,rgba(103,125,247,1) 29%,rgba(130,187,252,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(103,125,247,1) 2%,rgba(103,125,247,1) 29%,rgba(130,187,252,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#677df7', endColorstr='#82bbfc',GradientType=0 ); /* IE6-9 */
}
</style>
