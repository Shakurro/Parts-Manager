<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
    <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Barcode Scannen</h3>
        <div id="scanner" style="width: 100%; height: 300px;"></div>
        <button @click="stopScanner" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
          Abbrechen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Quagga from 'quagga';

export default {
  mounted() {
    this.startScanner();
  },
  methods: {
    startScanner() {
      Quagga.init({
        inputStream: {
          type: "LiveStream",
          target: document.querySelector('#scanner'),
          constraints: {
            facingMode: "environment" // or user for front camera
          }
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((data) => {
        this.$emit('scanned', data.codeResult.code);
        this.stopScanner();
      });
    },
    stopScanner() {
      Quagga.stop();
      this.$emit('close');
    }
  }
}
</script> 