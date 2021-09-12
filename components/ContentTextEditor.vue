<template>
  <v-textarea
    ref="textarea"
    v-model="file"
    @keydown.tab.exact.prevent="onTabRight"
    @keydown.tab.shift.prevent="onTabLeft"
    @compositionstart.prevent="isInComposition = true"
    @compositionend.prevent="isInComposition = false"
    @blur="$emit('endEdit')"
  />
</template>

<script>
export default {
  props: {
    value: String,
    isEditing: Boolean,
  },
  data() {
    return {
      file: '',
      isInComposition: false,
    };
  },
  watch: {
    value() {
      this.file = this.value;
    },
    isEditing() {
      this.$refs.textarea.focus();
    },
    file() {
      this.$emit('input', this.file);
    },
  },
  methods: {
    onTabRight(event) {
      if (this.isInComposition) {
        return;
      }
      const text = this.file;
      const originalSelectionStart = event.target.selectionStart;
      const textStart = text.slice(0, originalSelectionStart);
      const textEnd = text.slice(originalSelectionStart);
      this.file = `${textStart}\t${textEnd}`;
      event.target.value = this.file; // required to make the cursor stay in place.
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
    },
    onTabLeft(event) {
      if (this.isInComposition) {
        return;
      }
      const text = this.file;
      const originalSelectionStart = event.target.selectionStart;
      const textStart = text.slice(0, originalSelectionStart);
      const textEnd = text.slice(originalSelectionStart);
      this.file = `${textStart.replace(/\t$/, '')}${textEnd}`;
      event.target.value = this.file; // required to make the cursor stay in place.
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart - 1;
    },
  },
};
</script>
