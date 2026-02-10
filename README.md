# The Hub 🌍

**The Hub** is an offline-first educational platform designed to empower rural communities with accessible learning tools. It features dual tracks for both children and adults, ensuring lifelong learning opportunities for everyone.

## 🚀 Mission
To bridge the digital divide by providing high-quality, localized educational content that works seamlessly in low-connectivity environments.

## ✨ Key Features

### 👨‍👩‍👧‍👦 Family Accounts
- **Single Sign-On**: One phone number acts as the master account for the entire family.
- **Multiple Profiles**: Support for unique profiles under one account.
- **Avatar Customization**: Fun, color-coded avatars for easier profile recognition.

### 🎓 Dual Learning Tracks
1.  **Junior School**: Gamified learning for children with quizzes, stories, and badges.
2.  **Adult Skills**: Practical, professional courses for adults (Digital Literacy, Agriculture, Finance).

### 🌗 Theme System
- **Dark/Light Mode**: Fully supported with a custom toggler.
- **Accessible UI**: High-contrast text and intuitive navigation.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: `next-themes`
- **Language**: TypeScript

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `gateway/`: The landing page to choose between Junior and Adult tracks.
  - `junior/`: Dashboard for children.
  - `adult/`: Dashboard for adults.
  - `select-profile/`: Profile selection screen.
- `components/`: Reusable UI components.
  - `shared/`: Common components like Buttons, Logos, and the **ThemeSwitcher**.
- `public/`: Static assets (images, icons).

## 📝 Recent Updates & Fixes (For Developers)

### 🎨 Theme Configuration
We have migrated to **Tailwind CSS v4** and `next-themes`.
- **Config**: The Tailwind configuration is now in `tailwind.config.js` (switched from `.ts` for better compatibility).
- **DarkMode**: Configured to `class` mode. Use the `<ThemeSwitcher />` component to toggle.
- **Dropdowns**: Fixed visibility issues in dark mode for select elements (e.g., in `AddProfile.tsx`).

### 🖼️ Background Images
Background images are now implemented using standard `<img>` tags positioned absolutely behind content.
- **Locations**:
  - `public/images/gateway-bg.jpg`
  - `public/images/select-profile-bg.jpg`
  - `public/images/junior-bg.jpg`
  - `public/images/adult-bg.jpg`
- **Note**: Ensure these images exist in your local `public/images/` folder.

## 🚦 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

1.  Clone the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to the branch and open a Pull Request.

---
*Built with ❤️ for the community.*
