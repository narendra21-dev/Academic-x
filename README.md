::: {align="center"}
# 🎓 Academic-X

### The student platform built for learning, connecting, and growing.

```{=html}
<p>
```
`<img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=600&size=20&pause=1000&color=6366F1&center=true&vCenter=true&width=650&lines=Connect+with+your+campus+community;Discover+courses+and+new+skills;Explore+jobs+and+internships;Build+your+academic+future+with+Academic-X" alt="Animated Academic-X tagline" />`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<img src="https://img.shields.io/badge/Expo-React_Native-4630EB?style=for-the-badge&logo=expo&logoColor=white" alt="Expo React Native" />`{=html}
`<img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />`{=html}
`<img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-0F172A?style=for-the-badge&logo=android&logoColor=white" alt="Android and iOS" />`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<em>`{=html}One place for student life, campus communities, learning,
and career opportunities.`</em>`{=html}
```{=html}
</p>
```
:::

------------------------------------------------------------------------

## ✨ About Academic-X

**Academic-X** is a student-focused mobile platform that brings together
the experiences students often need across multiple apps.

It is being developed with **Expo, React Native, and TypeScript**, with
a focus on a polished user experience, reusable components, smooth
interactions, and a scalable structure.

The vision is simple: help students **connect with their community,
discover learning opportunities, and take the next step in their
careers** --- all from one platform.

## 🚀 What we're building

  -----------------------------------------------------------------------
  Area                                Vision
  ----------------------------------- -----------------------------------
  🏠 **Home**                         A personalized dashboard with
                                      stories, quick actions, community
                                      posts, courses, and career
                                      highlights.

  👥 **Community**                    A place to share updates, ask
                                      questions, discuss projects, and
                                      connect with other students.

  🎓 **Courses**                      Discover courses and learning
                                      opportunities to build practical
                                      skills.

  💼 **Job Alerts**                   Explore internships, full-time
                                      roles, and other career
                                      opportunities.

  👤 **Profile**                      Showcase your academic identity,
                                      interests, skills, and community
                                      activity.
  -----------------------------------------------------------------------

> **Development note:** The current app is being built incrementally.
> Some screens and interactions use local mock data while the UI and
> product experience are developed. Backend services and production
> integrations can be connected in later phases.

## 🎨 Experience & design

-   Clean, modern interface with a student-first visual language.
-   Light and dark themes.
-   Reusable UI components and shared design tokens.
-   Animated screen sections and press interactions.
-   Loading and empty states designed for a consistent experience.
-   Responsive layouts intended for mobile devices.

## 🧰 Tech stack

  -----------------------------------------------------------------------------------------------------------
  Technology                                                              Purpose
  ----------------------------------------------------------------------- -----------------------------------
  [React Native](https://reactnative.dev/)                                Cross-platform mobile UI

  [Expo](https://expo.dev/)                                               App development and tooling

  [Expo Router](https://docs.expo.dev/router/introduction/)               File-based navigation

  [TypeScript](https://www.typescriptlang.org/)                           Type safety

  [React Native Reanimated / Animated                                     UI motion and interactions
  APIs](https://reactnative.dev/docs/animated)                            

  [Expo Vector Icons](https://icons.expo.fyi/)                            Iconography

  [React Native Safe Area                                                 Safe-area handling
  Context](https://github.com/th3rdwave/react-native-safe-area-context)   

  [Vitest](https://vitest.dev/)                                           Unit testing
  -----------------------------------------------------------------------------------------------------------

*The exact libraries used by individual features may evolve during
development.*

## 📁 Project structure

The project follows a feature-oriented structure so screens, reusable
UI, and shared logic can grow independently.

``` text
academic-x/
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx          # Home
│   │   │   ├── community.tsx      # Community
│   │   │   ├── courses.tsx        # Courses
│   │   │   ├── jobs.tsx           # Job alerts
│   │   │   └── profile.tsx        # Profile
│   │   └── post/
│   │       └── [postid].tsx       # Post details and comments
│   ├── components/
│   │   └── ui/                    # Shared UI components
│   ├── features/
│   │   ├── community/             # Community feature
│   │   ├── home/                  # Home feature components
│   │   ├── courses/               # Courses feature
│   │   └── jobs/                  # Jobs feature
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   └── community-provider.tsx
│   └── theme/                     # Colors and design tokens
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

> This is a representative structure; folders may change as features are
> implemented.

## ⚙️ Getting started

### Prerequisites

-   Node.js (LTS recommended)
-   npm
-   Expo Go on a compatible device, or an Android/iOS simulator
-   Git

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd academic-x
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start the development server

``` bash
npx expo start
```

Then scan the QR code with Expo Go, or use the terminal shortcuts to
launch an available emulator.

### 4. Run quality checks

``` bash
npx tsc --noEmit
npx vitest run
```

## 🧭 Development approach

Academic-X is being developed in small, maintainable steps:

1.  Establish the app foundation, navigation, and theme system.
2.  Build shared UI components and interaction patterns.
3.  Develop each main tab with realistic mock data.
4.  Add detail views, empty states, and polished transitions.
5.  Connect backend APIs and production services.
6.  Add broader testing, performance checks, and release preparation.

## 🗺️ Roadmap

-   [x] Expo + TypeScript foundation
-   [x] File-based navigation foundation
-   [x] Shared light/dark theme system
-   [x] Reusable UI component foundation
-   [x] Initial Home and Community experience
-   [ ] Complete Courses discovery experience
-   [ ] Complete Job Alerts experience
-   [ ] Expand profile and account flows
-   [ ] Backend and authentication integration
-   [ ] Persistent user content and interactions
-   [ ] Notifications and production release preparation

*Roadmap items reflect the development plan and may change.*

## 🤝 Contributing

Academic-X is currently under active development.

If you want to contribute:

1.  Fork the repository.
2.  Create a feature branch: `git checkout -b feature/your-feature`.
3.  Make focused changes that follow the existing project structure.
4.  Run the TypeScript and test checks.
5.  Open a pull request with a clear description and screenshots where
    useful.

Please keep components reusable, follow the shared theme tokens, and
avoid introducing unnecessary dependencies.

## 📌 Project status

```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}Current development status`</strong>`{=html}
```{=html}
</summary>
```
The app is in its UI and feature-development phase. Some features are
powered by local mock data and in-memory state. Production backend
connectivity, authentication, and persistent data flows are planned for
later development stages.

```{=html}
</details>
```
## 💜 Vision

Academic-X aims to make student life more connected and
opportunity-driven --- from campus conversations and collaborative
learning to courses and career discovery.

::: {align="center"}
### Learn. Connect. Grow. 🚀

`<sub>`{=html}Made with ❤️ for students and the future they're
building.`</sub>`{=html}
:::
