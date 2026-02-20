# 🧪 Module Explorateur Scientifique

Module d'apprentissage des sciences pour les enfants (6-10 ans) avec une approche interactive et ludique.

## 📚 Structure des Thèmes

### 🌍 **Monde Vivant**

#### 🐾 Animaux (`animals.ts`)
- Reconnaissance des animaux
- Habitats et comportements
- Classification (mammifères, reptiles, etc.)
- 15+ questions sur 4 niveaux

#### 🌱 Plantes (`plants.ts`)
- Besoins des plantes (eau, soleil)
- Parties des plantes (racine, feuille, fleur)
- Photosynthèse
- Écosystème et forêts
- 14+ questions sur 4 niveaux

#### 🧠 Corps Humain (`body.ts`)
- Parties du corps
- Organes et leurs fonctions
- Les 5 sens
- Santé et hygiène
- 16+ questions sur 4 niveaux

---

### 🌦️ **Nature & La Terre**

#### ☁️ Météo (`weather.ts`)
- Phénomènes météorologiques
- Saisons
- Température et climat
- Orages et tornades
- 15+ questions sur 4 niveaux

#### 🌍 Planète Terre (`earth.ts`)
- La Terre et l'espace
- Géographie (océans, montagnes)
- Volcans et tremblements de terre
- Les continents
- 16+ questions sur 4 niveaux

---

### ⚙️ **Sciences Simples**

#### 💧 Matière & Forces (`matter.ts`)
- États de la matière (solide, liquide, gaz)
- Propriétés (flotter, couler)
- Aimants et électricité
- Gravité et forces
- Lumière et ombre
- 16+ questions sur 4 niveaux

---

## 🎯 Progression par Niveau

### **Niveau 1** - Reconnaissance Simple
- Questions basiques avec réponses évidentes
- Reconnaissance d'objets et concepts
- Exemples : "Combien avons-nous de bras ?", "Quel animal miaule ?"

### **Niveau 2** - Compréhension
- Vrai/Faux sur des faits simples
- Complétion de phrases
- Exemples : "Les plantes ont besoin d'eau.", "L'arc-en-ciel apparaît après la pluie."

### **Niveau 3** - Mini Raisonnement
- Classification et catégorisation
- Relations de cause à effet
- Exemples : "Lequel est un mammifère ?", "Les graines deviennent des ___."

### **Niveau 4** - Explication Simple
- Processus et systèmes
- Concepts plus avancés
- Exemples : "La Terre tourne autour du ___.", "Combien de continents y a-t-il ?"

---

## 🎮 Utilisation

### Import du module

```typescript
import { generateScienceExercise, ScienceTheme } from '@/lib/engine/science';
```

### Générer un exercice mixte (aléatoire)

```typescript
const exercise = generateScienceExercise(1, 'mixed');
```

### Générer un exercice par thème

```typescript
const animalExercise = generateScienceExercise(2, 'animals');
const plantExercise = generateScienceExercise(1, 'plants');
const weatherExercise = generateScienceExercise(3, 'weather');
```

### Thèmes disponibles

```typescript
type ScienceTheme = 
    | 'animals'      // 🐾 Animaux
    | 'plants'       // 🌱 Plantes
    | 'body'         // 🧠 Corps humain
    | 'weather'      // 🌦️ Météo
    | 'earth'        // 🌍 Planète Terre
    | 'matter'       // ⚙️ Matière & Forces
    | 'mixed';       // 🔀 Mélange de tout
```

---

## ✨ Fonctionnalités

### 🎯 Adaptation au niveau
Chaque générateur filtre les questions appropriées au niveau de l'élève :
- Niveau ± 1 pour éviter trop de facilité ou difficulté

### 🚫 Pas de doublons
Intégré avec le système `generateExerciseSession` qui garantit des exercices uniques

### 😊 Emojis visuels
Chaque question commence par un emoji pertinent pour rendre l'apprentissage plus engageant

### 📈 Statistiques
Toutes les questions ont un champ `difficulty` pour le suivi de progression

---

## 🔮 Extensions Futures

### Phase 2 : Modules thématiques
- Créer des "parcours" thématiques (ex: Monde des Océans)
- Débloquer par progression

### Phase 3 : Micro-leçons
- Ajouter des explications avant les questions
- Format "apprendre puis tester"

### Phase 4 : Expériences virtuelles
- Simulations interactives
- Visualisations animées

### Phase 5 : Gamification avancée
- Badges thématiques (🧪 "Petit Biologiste", 🌋 "Maître des Volcans")
- Carte d'exploration avec mondes à débloquer

---

## 📊 Statistiques du Contenu

| Thème | Questions | Niveaux | Fichier |
|-------|-----------|---------|---------|
| Animaux | 15 | 1-4 | `animals.ts` |
| Plantes | 14 | 1-4 | `plants.ts` |
| Corps | 16 | 1-4 | `body.ts` |
| Météo | 15 | 1-4 | `weather.ts` |
| Terre | 16 | 1-4 | `earth.ts` |
| Matière | 16 | 1-4 | `matter.ts` |
| **TOTAL** | **92** | **1-4** | **6 modules** |

---

## 🎓 Objectifs Pédagogiques

✅ Développer la curiosité scientifique  
✅ Apprendre par l'observation  
✅ Comprendre des concepts simples  
✅ Répondre à des questions interactives  
✅ Pas de théorie lourde, beaucoup d'interaction  

---

**Créé avec ❤️ pour les petits explorateurs ! 🔬✨**
