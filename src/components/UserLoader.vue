<template>
  <div class="loading" v-show="isShow" style="/* display: none; */">
    <div class="v-dialog v-dialog--persistent" style="width: 300px; display: block;">
      <div class="v-card v-sheet theme--dark teal">
        <div class="v-card__text">
          <span>Loading</span>
          <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="v-progress-linear mb-0"
            style="height: 1px;">
            <div class="v-progress-linear__background white" style="height: 1px; opacity: 0.3; width: 100%;"></div>
            <div class="v-progress-linear__bar">
              <div class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                <div class="v-progress-linear__bar__indeterminate long white" style="height: 1px;"></div>
                <div class="v-progress-linear__bar__indeterminate short white" style="height: 1px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    props: {
        isShow: {
            type: Boolean,
            required: true,
        }
    }
}
</script>