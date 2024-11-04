## Änderungen pushen

Um Änderungen an das Repository zu pushen, folge diesen Schritten:

1. **Navigiere zu deinem Projektverzeichnis**:

   ```bash
   cd /pfad/zu/deinem/projekt
   ```

2. **Überprüfe den aktuellen Status**:

   ```bash
   git status
   ```

3. **Füge alle Änderungen hinzu**:

   ```bash
   git add .
   ```

4. **Commit deine Änderungen**:

   ```bash
   git commit -m "Beschreibung der Änderungen"

   git push origin main
   ```


5. **Hole die neuesten Änderungen vom Remote-Repository**:

   ```bash
   git fetch origin
   ```

6. **Rebase deine Änderungen auf die `main`-Branch**:

   ```bash
   git rebase origin/main
   ```

   - Löse eventuelle Konflikte und fahre mit dem Rebase fort:

     ```bash
     git add .
     git rebase --continue
     ```

7. **Pushe die Änderungen zur `main`-Branch**:

   ```bash
   git push origin main
   ```

