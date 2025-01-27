<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
    <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Barcode Scannen</h3>
        <video id="video" style="width: 100%; height: 300px;" autoplay></video>
        <div class="mt-4 flex justify-between">
          <button 
            @click="stopScanner" 
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
            Abbrechen
          </button>
        </div>
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
      codeReader: null,  // Instanz des Barcode-Scanners
      videoInputDevices: [],  // Liste der verfügbaren Kameras
      currentDeviceId: null,  // Die aktuell verwendete Kamera
    };
  },
  mounted() {
    this.requestCameraAccess(); // Anfrage zur Kameraberechtigung
  },
  beforeDestroy() {
    this.stopScanner(); // Stoppe den Scanner, wenn die Komponente zerstört wird
  },
  methods: {
    // Fordert den Zugriff auf die Kamera an
    async requestCameraAccess() {
      try {
        // Fordert die Berechtigung an, die Kamera zu verwenden
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Kamerazugriff gewährt.");

        this.startScanner(); // Wenn der Zugriff gewährt wurde, starte den Scanner
      } catch (error) {
        // Fehlerbehandlung, wenn der Zugriff verweigert wird
        console.error("Fehler beim Zugriff auf die Kamera:", error);
        alert("Bitte erlauben Sie den Zugriff auf Ihre Kamera, um den Scanner zu verwenden.");
      }
    },

    async startScanner() {
      if (this.isScanning) return; // Verhindere mehrfaches Starten des Scanners
      this.isScanning = true; // Setze den Status auf "scanning"

      this.codeReader = new BrowserMultiFormatReader();

      try {
        // Abrufen der verfügbaren Videoeingabegeräte
        this.videoInputDevices = await this.codeReader.getVideoInputDevices();
        console.log('Verfügbare Kameras:', this.videoInputDevices);

        if (!this.videoInputDevices.length) {
          console.error('Keine Kamera gefunden.');
          this.isScanning = false;
          return;
        }

        // Suchen nach der Rückkamera (die sollte normalerweise nicht "front" im Namen haben)
        const backCamera = this.videoInputDevices.find(device =>
          !device.label.toLowerCase().includes('front')
        );

        // Fallback: Wenn keine Rückkamera gefunden wird, nehme die erste Kamera
        if (backCamera) {
          this.currentDeviceId = backCamera.deviceId;
        } else {
          this.currentDeviceId = this.videoInputDevices[0]?.deviceId;
        }

        // Scanner mit der ausgewählten Kamera starten
        await this.startScannerWithDeviceId(this.currentDeviceId);
      } catch (error) {
        console.error('Fehler beim Starten des Scanners:', error);
        this.isScanning = false;
      }
    },

    async startScannerWithDeviceId(deviceId) {
      if (!deviceId) return;

      // Scanner mit der angegebenen Kamera starten
      await this.codeReader.decodeFromVideoDevice(deviceId, 'video', (result, err) => {
        if (result) {
          console.log('Scan-Ergebnis:', result.text);
          this.$emit('scanned', result.text);
          this.stopScanner();
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error('Scanner-Fehler:', err);
        }
      });
    },

    stopScanner() {
      if (this.codeReader) {
        this.codeReader.reset(); // Scanner zurücksetzen und Ressourcen freigeben
      }
      this.isScanning = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Füge hier deine Styles hinzu, falls nötig */
</style>
