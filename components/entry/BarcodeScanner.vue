<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
    <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Barcode Scannen</h3>
        <div id="scanner" style="width: 100%;"></div>
        <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
          Abbrechen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";

export default {
  mounted() {
    this.startScanner();
  },
  methods: {
    startScanner() {
      this.html5QrCode = new Html5Qrcode("scanner");
      this.html5QrCode.start(
        { facingMode: { exact: "environment" } },
        {
          fps: 10,
          qrbox: 250
        },
        (decodedText, decodedResult) => {
          this.$emit('scanned', decodedText);
          this.stopScanner();
        },
        (errorMessage) => {
          console.error("Error during scanning:", errorMessage);
        }
      ).catch((err) => {
        console.error("Unable to start scanning on mobile:", err);
      });
    },
    stopScanner() {
      if (this.html5QrCode) {
        this.html5QrCode.stop().then(() => {
          this.$emit('close');
        }).catch((err) => {
          console.error("Unable to stop scanning.", err);
        });
      }
    }
  }
}
</script> 