# Phosphor Reorder Variants

En enkel Figma-plugin som går gjennom alle `ComponentSet` på aktiv side og bytter fysisk plass mellom:

- `Format = Stroke`, `Weight = Regular`
- `Format = Stroke`, `Weight = Light`

Pluginen kjører i batcher, viser fremdrift, og lar bruker starte operasjonen manuelt med en `Start`-knapp.

## Installasjon i Figma
1. Last ned dette repoet. Det enkleste er å bare trykke på Code -> Download zip
   <img width="1184" height="528" alt="Skjermbilde 2026-03-05 kl  16 32 13" src="https://github.com/user-attachments/assets/cee81059-35d0-4204-8892-1c9127c5bbda"/>
2. Åpne Figma Desktop.
3. Gå til `Plugins` -> `Development` -> `Import plugin from manifest...`
4. Velg `manifest.json` i denne mappen.
5. Pluginen dukker opp under `Plugins` -> `Development`.

## Bruk

1. Åpne siden som inneholder komponentene du vil oppdatere.
2. Start pluginen fra `Plugins` -> `Development` -> `reorder variants`.
3. Trykk `Start` i plugin-vinduet.
4. Vent til status viser `Ferdig`.

## Utvikling (valgfritt)

Hvis du endrer `code.ts`:

1. Installer avhengigheter:
   - `npm install`
2. Bygg TypeScript:
   - `npm run build`
