<template>
  <div class="content mt-8">
    <h1 class="text-center text-3xl font-extrabold mb-6 text-gray-800">Parts Manager Roadmap 2024/2025</h1>
  </div>
  <div class="timeline relative max-w-4xl mx-auto">
    <!-- Phase 1 -->
    <h2 class="text-xl font-semibold mb-4 text-center fade-in">Phase 1: Erweiterung der Grundfunktionen</h2>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Adminpanel (Userverwaltung)</h3>
        <p><strong>Ziel:</strong> Vereinfachung der Verwaltung von Nutzern, Rollen und Berechtigungen.</p>
        <ul class="list-disc pl-5">
          <li>Implementierung von Funktionen zur Benutzererstellung, -bearbeitung und -löschung.</li>
          <li>Rollenbasiertes Berechtigungssystem (Admin, Lagerist, Mechaniker, etc.).</li>
          <li>Sichtbarkeit und Zugriff auf spezifische Daten basierend auf Benutzerrollen.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Sicherheitsaspekte erweitern</h3>
        <p><strong>Ziel:</strong> Verbesserung der Systemsicherheit.</p>
        <ul class="list-disc pl-5">
          <li>Zwei-Faktor-Authentifizierung (2FA) für Login-Prozesse.</li>
          <li>Implementierung von Sicherheitslücken-Scannern und Audits.</li>
          <li>Sicherstellen, dass Datenverschlüsselung genutzt wird.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Direktbestellung von Ersatzteilen</h3>
        <p><strong>Ziel:</strong> Manager oder Lageristen können Ersatzteile direkt bei Händlern oder Verkäufern nachbestellen.</p>
        <ul class="list-disc pl-5">
          <li>Integration eines Systems, das es ermöglicht, Ersatzteile über eine weiterführende Linkstruktur die Bestellung auslöst.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <!-- Phase 2 -->
    <h2 class="text-xl font-semibold mb-4 text-center fade-in">Phase 2: Erweiterungen & Partpacks</h2>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Partpacks erstellen</h3>
        <p><strong>Ziel:</strong> Erstellen von Partpacks, wo die Ersatzteile direkt auf das erstellte Partpack gebucht werden können.</p>
        <ul class="list-disc pl-5">
          <li>Implementierung einer Funktion, mit der Manager Partpacks erstellen und für Mechaniker freigeben können.</li>
          <li>Möglichkeit, Partpacks nach Partpacknummer zu suchen.</li>
          <NuxtLink to="/order/vieworders" class="text-blue-600 underline hover:text-blue-800">Partpacks Beispiel</NuxtLink>
        </ul>
      </div>  
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Partpack nach Matrix übermitteln</h3>
        <p><strong>Ziel:</strong> Einfaches und schnelles Hinzufügen der benutzen Ersatzteile.</p>
        <ul class="list-disc pl-5">
          <li>Implementierung einer Funktion, die es ermöglicht, Ersatzteile einem Workpack hinzuzufügen.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <!-- Phase 3 -->
    <h2 class="text-xl font-semibold mb-4 text-center fade-in">Phase 3: Design und Benutzererfahrung</h2>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Designanpassungen für mobile Geräte und Tablets</h3>
        <p><strong>Ziel:</strong> Optimierung der Benutzeroberfläche für mobile Geräte, insbesondere für Mechaniker.</p>
        <ul class="list-disc pl-5">
          <li>Anpassung des Layouts und der Navigation für Smartphones und Tablets.</li>
          <li>Schnelle und einfache Bedienbarkeit, um die Arbeit vor Ort effizient zu unterstützen.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Inventurtool für Lageristen</h3>
        <p><strong>Ziel:</strong> Einfache Durchführung von Inventuren im Lager.</p>
        <ul class="list-disc pl-5">
          <li>Integration eines Tools, mit dem Lageristen eine Inventur schnell durchführen können (z. B. durch Barcode-Scans).</li>
          <li>Verwaltung von Beständen in Echtzeit, Benachrichtigungen bei niedrigen Beständen.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <!-- Phase 4 -->
    <h2 class="text-xl font-semibold mb-4 text-center fade-in">Phase 4: Branchenspezifische Erweiterungen und Analyse</h2>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Hinzufügen von verschiedenen Branchen</h3>
        <p><strong>Ziel:</strong> Erweiterung der Datenbanken</p>
        <ul class="list-disc pl-5">
          <li>Ermöglichen, verschiedene Branchen zu definieren und deren Ersatzteile separat zu verwalten.</li>
          <li>Erstellung von branchenbezogenen Dashboards</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Überwachung aller Ersatzteile pro Branche</h3>
        <p><strong>Ziel:</strong> Sicherstellen, dass Ersatzteile branchenübergreifend verfügbar sind.</p>
        <ul class="list-disc pl-5">
          <li>Visualisierung von Beständen und Verfügbarkeiten über verschiedene Branchen hinweg.</li>
          <li>Möglichkeit, Bestände in anderen Zweigen oder Filialen zu überprüfen.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Zahlenmanager (Visualisierung von Ein- und Ausgaben)</h3>
        <p><strong>Ziel:</strong> Übersicht der finanziellen Transaktionen und Bestände.</p>
        <ul class="list-disc pl-5">
          <li>Erstellung von Diagrammen, die die Einnahmen und Ausgaben der Ersatzteilbestellungen und -verkäufe visualisieren.</li>
          <li>Ein Dashboard, das detaillierte Analysen zur Finanzlage bietet, einschließlich Budgetverfolgung.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <!-- Phase 5 -->
    <h2 class="text-xl font-semibold mb-4 text-center fade-in">Phase 5: Optimierung und Erweiterung</h2>
    <div class="phase-container mb-8 flex items-center">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-left">
        <h3 class="text-lg font-semibold mb-2">Performance-Optimierung</h3>
        <p><strong>Ziel:</strong> Sicherstellen, dass das System bei wachsender Datenmenge schnell bleibt.</p>
        <ul class="list-disc pl-5">
          <li>Optimierung der Datenbank und Backend-Logik für bessere Performance.</li>
          <li>Caching von häufig abgerufenen Daten.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
    <div class="phase-container mb-8 flex items-center flex-row-reverse">
      <div class="content bg-white p-6 rounded-lg shadow-lg w-5/12 slide-in-right">
        <h3 class="text-lg font-semibold mb-2">Testing und QA</h3>
        <p><strong>Ziel:</strong> Sicherstellen, dass alle neuen Features stabil und fehlerfrei laufen.</p>
        <ul class="list-disc pl-5">
          <li>Durchführung von automatisierten Tests für alle neuen Funktionen.</li>
          <li>Manuelles Testen auf unterschiedlichen Geräten, um UI/UX-Probleme zu vermeiden.</li>
        </ul>
      </div>
      <div class="timeline-marker bg-gray-800"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach((el) => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.timeline {
  position: relative;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.phase-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.phase-container::before {
  content: '';
  position: absolute;
  width: 2px;
  background-color: #e5e7eb;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.fade-in {
  opacity: 0;
  transition: opacity 1s ease-out;
}

.fade-in.visible {
  opacity: 1;
}

.slide-in-left {
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.slide-in-left.visible {
  transform: translateX(0);
  opacity: 1;
}

.slide-in-right {
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.slide-in-right.visible {
  transform: translateX(0);
  opacity: 1;
}
</style>