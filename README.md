# Suricate

Appli de dating (façon Fruitz) où swiper une personne révèle aussi son
plat préféré — avec la recette. Un mode alternatif permet de swiper
uniquement des idées de repas.

## Stack

- [Expo](https://expo.dev) SDK 57 + TypeScript, app mobile (iOS/Android)
- [expo-router](https://docs.expo.dev/router/introduction/) pour la navigation (file-based routing)
- [Zustand](https://github.com/pmndrs/zustand) (+ persist/AsyncStorage) pour l'état local
- `react-native-gesture-handler` + `react-native-reanimated` pour les cartes swipables

Il n'y a **pas de backend pour l'instant** : l'auth est simulée localement
(aucune vérification réelle, tout est stocké sur l'appareil via
AsyncStorage) et les profils/plats sont des données mock dans `src/data/`.
Voir la section "Prochaines étapes".

## Démarrer

```bash
npm install
npm run start   # puis 'i' pour iOS, 'a' pour Android
```

`npm run typecheck` lance `tsc --noEmit`.

## Structure

```
app/
  _layout.tsx              # layout racine (gestures, stack, hydration)
  index.tsx                # redirection selon l'état de session
  (auth)/                  # login, signup, création de profil (mock)
  (main)/                  # tabs : swipe, matches, profil
  recipe/[id].tsx           # détail d'une recette (modal)
src/
  components/              # SwipeCard, SwipeDeck, PersonCard, FoodCard, ...
  data/                     # types, profils mock, plats mock, presets
  store/                    # useSessionStore (auth/profil), useSwipeStore (swipes/matches/envies)
  theme/                    # tokens de design (couleurs, spacing, typo)
```

## Fonctionnement du swipe

- **Mode Personnes** : swipe les profils, le plat préféré est affiché sur
  la carte et mène à la recette complète. Un swipe à droite déclenche un
  match si le profil "aime en retour" (donnée mock `willMatch`).
- **Mode Nourriture** : swipe uniquement des idées de repas (sans profil
  associé). Un swipe à droite ajoute le plat à "Mes envies" (onglet Profil).

Toutes les recettes contiennent ingrédients + étapes de préparation.

## Prochaines étapes (hors scope de ce scaffold)

- Backend (probablement Supabase, comme sur d'autres projets) : vraie
  auth, persistance des profils, matching réel entre utilisateurs.
- Upload de vraies photos de profil (actuellement : avatar emoji + couleur).
- Chat entre matches.
