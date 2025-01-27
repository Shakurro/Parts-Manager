<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
    <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Barcode Scannen</h3>
        <video id="video" style="width: 100%; height: 300px;"></video>
        <button @click="stopScanner" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
          Abbrechen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export default {
  data() {
    return {
      isScanning: false, // Statusvariable für den Scanner
    };
  },
  mounted() {
    this.startScanner();
  },
  methods: {
    async startScanner() {
      if (this.isScanning) return; // Verhindere mehrfaches Starten des Scanners
      this.isScanning = true; // Setze den Status auf "scanning"

      const codeReader = new BrowserMultiFormatReader();
      try {
        const videoInputDevices = await codeReader.getVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId; // Wähle die erste Kamera aus

        await codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            this.$emit('scanned', result.text);
            this.stopScanner();
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error('Error starting scanner:', error);
        this.isScanning = false; // Setze den Status zurück, wenn ein Fehler auftritt
      }
    },
    stopScanner() {
      this.isScanning = false; // Setze den Status zurück
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Füge hier deine Styles hinzu, falls nötig */
</style> 