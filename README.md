<div align="center">

# 🎓 Academic-X

### The student platform for learning, connecting, and growing.

<img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=600&size=20&pause=1200&color=6366F1&center=true&vCenter=true&width=680&lines=Connect+with+your+campus+community;Discover+courses+and+new+skills;Find+internships+and+career+opportunities;Build+your+future+with+Academic-X" alt="Academic-X animated tagline" />

<br />

<img src="https://img.shields.io/badge/Expo-React_Native-4630EB?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Android-First-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android first" />

<br /><br />

*One platform for student communities, learning, and career discovery.*

</div>

---

## About

**Academic-X** is a student-focused mobile app that brings campus life, learning, and career opportunities together.

Built with **Expo, React Native, and TypeScript**, the project focuses on a clean mobile experience, reusable components, smooth interactions, and an architecture that can grow as the product evolves.

Our goal is to help students connect with peers, participate in communities, discover useful courses, and find opportunities to start their careers.

## Features

| Feature | What it offers |
| --- | --- |
| 🏠 **Home** | A personalized feed with stories, quick actions, community posts, courses, and career highlights. |
| 👥 **Community** | Share updates, ask questions, discuss projects, and connect with other students. |
| 🎓 **Courses** | Discover courses and learning opportunities to build practical skills. |
| 💼 **Job Alerts** | Explore internships, full-time roles, and career opportunities. |
| 👤 **Profile** | Present your academic background, skills, interests, and activity. |

> **Development status:** The app is being built feature by feature. Some screens currently use local mock data and in-memory state. Backend integration and persistent data are planned for a later phase.

## Design principles

- A modern, student-first mobile interface.
- Light and dark themes.
- Shared design tokens and reusable UI components.
- Subtle animations and responsive press feedback.
- Consistent loading, empty, and error states.
- Maintainable, feature-oriented code organization.

## Tech stack

| Technology | Role |
| --- | --- |
| [React Native](https://reactnative.dev/) | Cross-platform mobile UI |
| [Expo](https://expo.dev/) | App development and tooling |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [React Native Animated](https://reactnative.dev/docs/animated) | UI animations and interactions |
| [Expo Vector Icons](https://icons.expo.fyi/) | Icons |
| [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) | Safe-area handling |
| [Vitest](https://vitest.dev/) | Unit testing |

*Dependencies may evolve as development progresses.*

## Project structure

The codebase uses a feature-oriented structure to keep screens, shared UI, and feature logic organized.

```text
academic-x/
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx
│   │   │   ├── community.tsx
│   │   │   ├── courses.tsx
│   │   │   ├── jobs.tsx
│   │   │   └── profile.tsx
│   │   └── post/
│   │       └── [postid].tsx
│   ├── components/
│   │   └── ui/
│   ├── features/
│   │   ├── community/
│   │   ├── home/
│   │   ├── courses/
│   │   └── jobs/
│   ├── providers/
│   └── theme/
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

*This is a simplified overview. The exact folders may change as features are added.*

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Expo Go or an Android/iOS simulator
- Git

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd academic-x
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

Scan the QR code with Expo Go, or use the terminal shortcuts to open an emulator.

### 4. Run checks

```bash
npx tsc --noEmit
npx vitest run
```

## Development roadmap

- [x] Expo and TypeScript foundation
- [x] File-based navigation foundation
- [x] Shared light and dark theme system
- [x] Reusable UI component foundation
- [x] Initial Home and Community experience
- [ ] Complete Courses discovery experience
- [ ] Complete Job Alerts experience
- [ ] Expand profile and account flows
- [ ] Backend and authentication integration
- [ ] Persistent user content and interactions
- [ ] Notifications and release preparation

*The roadmap is a working plan and may change as the product develops.*

## Contributing

Academic-X is currently under active development. Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Make focused changes that follow the existing project structure.
4. Run the TypeScript and test checks.
5. Open a pull request with a clear description and screenshots where relevant.

Please reuse the shared theme and UI components where possible, and avoid adding dependencies without a clear need.

## Project status

The current focus is building and refining the mobile experience. Some features use mock data while their interfaces and interactions are developed. Backend services, authentication, and production data flows will be added in later development phases.

---

<div align="center">

## Learn. Connect. Grow. 🚀

*Made for students and the future they're building.*

</div>
