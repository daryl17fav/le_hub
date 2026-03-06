# The Hub 🌍

**The Hub** is an offline-first, adaptive educational platform designed to empower rural communities in West Africa with accessible learning tools. It features dual tracks — a **Junior School** for children and an **Adult Skills Centre** — ensuring lifelong learning for the whole family from one shared device.

---

## 🚀 Mission

Bridge the digital divide by providing high-quality, localized educational content that works in low-connectivity environments through a shared-account family model.

---

## 🛠️ Technology Stack

| Layer           | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router)            |
| Database / Auth | [Supabase](https://supabase.com/) (PostgreSQL + OTP Auth) |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com/)               |
| Icons           | [Lucide React](https://lucide.dev/)                       |
| Animations      | Canvas Confetti, CSS Keyframes                            |
| PWA             | next-pwa (Service Worker)                                 |

---

## 🗂️ Project Structure

```
the_hub/
├── app/
│   ├── page.tsx              # Home / Landing page
│   ├── auth/                 # OTP phone authentication
│   ├── onboarding/           # First-time profile setup
│   ├── select-profile/       # Family profile picker
│   ├── gateway/              # Post-login routing gateway
│   ├── junior/               # Junior Dashboard (kids)
│   ├── adult/                # Adult Dashboard (professionals)
│   ├── lesson/               # Unified Lesson Engine
│   ├── arena/                # Village Leaderboard & Arena
│   └── profile/              # User profile management
│
├── components/
│   ├── layout/               # TopNav, BottomNav (role-aware)
│   ├── shared/               # Button, StatsHeader, Logo, LiveTicker
│   └── lesson/               # Exercise, CompletionScreen, Stage1–5, Feedback
│
├── lib/
│   └── engine/               # 🧠 Adaptive Learning Core
│       ├── exerciseGenerator.ts   # Main exercise factory & session manager
│       ├── adaptiveEngine.ts      # Level-up/down logic
│       ├── studentLevel.ts        # StudentProfile type definitions
│       ├── lessonContent.ts       # Lesson explanation database (all skills)
│       ├── science/               # Junior science exercises (6 themes)
│       └── adult/                 # Adult course exercises (6 topics)
│
├── services/
│   ├── lessonService.ts      # DB: save lesson progress, award points
│   ├── profileService.ts     # DB: create / update profiles, increment points
│   └── villageService.ts     # DB: village data & leaderboard
│
└── context/
    └── AuthContext.tsx        # Global auth + active profile state
```

---

## 🎓 Learning Tracks

### 🏫 Junior School (ages 5–12)

Purple theme | Gamified with stars and badges

| Course                     | Skill ID            | Topics                                        |
| -------------------------- | ------------------- | --------------------------------------------- |
| S'amuser avec les Chiffres | `math_chiffres_101` | Numbers, counting                             |
| Aventures de Lecture       | `reading_adventure` | Letters, words, comprehension (L1–L4)         |
| Explorateurs Scientifiques | `science_explorers` | Animals, Plants, Body, Weather, Earth, Matter |

### 💼 Adult Skills Centre (teens & adults)

Charcoal `#0F0F0F` theme | Professional tone with Solar Orange `#FF9100` accents

| Course                | Skill ID               | Topics                                    |
| --------------------- | ---------------------- | ----------------------------------------- |
| Bases du Numérique    | `digital_literacy_101` | Browsers, HTTPS, Mobile Money, cloud      |
| Finances Personnelles | `finance_101`          | Budget, 50-30-20, savings, investing      |
| Agriculture Moderne   | `agri_101`             | Rotation, irrigation, composting, markets |
| Sécurité Mobile       | `mobile_security`      | Passwords, phishing, 2FA, scams           |
| Commerce Digital      | `digital_commerce`     | WhatsApp selling, pricing, trust, fraud   |
| Santé & Communauté    | `health_community`     | Health services, first aid, prevention    |

---

## 🧠 Adaptive Learning Engine

Each lesson session works as follows:

1. **Stage 1 — Lesson Intro**: A skill-specific explanation card appears before exercises. Content is pulled from `lessonContent.ts` and adapts its theme (charcoal vs purple) based on the user's role.
2. **Exercise Session**: 10 adaptive exercises are generated per session. The engine avoids duplicates (Fisher-Yates + normalized question comparison).
3. **Difficulty Scaling**: Levels 1–4. Adult exercises follow a **5-stage pedagogical flow**: Hear/See → Select → Action → Build → Showdown.
4. **Completion Screen**: Confetti on finish. Adults see **Professional Badge** (Award icons); juniors see **Scholar Stars**.

---

## 📊 Progress Tracking

- Progress is stored in the `lesson_progress` Supabase table, keyed by `profile_id` and `lesson_id`.
- Each dashboard fetches progress from the DB and merges with a local cache (localStorage) for instant display.
- Progress bars on all course cards are live and tied to the DB.

---

## 🎨 Role-Aware Theming

| Role   | Primary Color            | Background           | NavBar                    |
| ------ | ------------------------ | -------------------- | ------------------------- |
| Junior | `brand-purple` `#6200EE` | `bg-zinc-50` (light) | White + purple border     |
| Adult  | `brand-orange` `#FF9100` | `#0F0F0F` (charcoal) | `#1A1A1A` + orange border |

Navigation (`TopNav`, `BottomNav`) automatically switches theme based on `activeRoute`.

---

## 🔐 Authentication Flow

1. User enters phone number → OTP sent via Supabase Auth.
2. On first login → `/onboarding` to create profile(s).
3. On return → `/select-profile` to pick active family profile.
4. Profile `role` (`junior` / `adult`) routes to the correct dashboard.

---

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🚧 Known Limitations / Next Steps

- **Offline sync**: PWA manifest is set up but full Service Worker caching for exercises is not yet implemented.
- **Leaderboard**: Arena page exists but uses mock data — needs live Supabase aggregates.
- **Localization**: Currently French-only. Yoruba, Fon, and Hausa translations planned.
- **Village management**: Users cannot yet create or switch villages from the UI.
- **Audio**: Audio player in lesson intro is a placeholder (no audio files loaded).

---

_Built with ❤️ for the community. — March 2026_
