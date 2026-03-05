# Phosphor Reorder Variants

En enkel Figma-plugin som går gjennom alle `ComponentSet` på aktiv side og bytter fysisk plass mellom:

- `Format = Stroke`, `Weight = Regular`
- `Format = Stroke`, `Weight = Light`

Pluginen kjører i batcher, viser fremdrift, og lar bruker starte operasjonen manuelt med en `Start`-knapp.

## Installasjon i Figma

1. Åpne Figma Desktop.
2. Gå til `Plugins` -> `Development` -> `Import plugin from manifest...`
3. Velg `manifest.json` i denne mappen.
4. Pluginen dukker opp under `Plugins` -> `Development`.

## Bruk

1. Åpne siden som inneholder `ComponentSet`-ene du vil oppdatere.
2. Start pluginen fra `Plugins` -> `Development` -> `reorder variants`.
3. Trykk `Start` i plugin-vinduet.
4. Vent til status viser `Ferdig`.

## Utvikling (valgfritt)

Hvis du endrer `code.ts`:

1. Installer avhengigheter:
   - `npm install`
2. Bygg TypeScript:
   - `npm run build`
