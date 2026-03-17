# ESPASYO | Study & Office Hub

**Where isolation ends and collaboration begins.**

Espasyo is a modern web application designed for a dynamic community of entrepreneurs, freelancers, and students in Marikina City. This platform serves as the digital front door to Espasyo's physical coworking space, showcasing services ranging from hot desks to business registration and tax filing.

---

## 📚 Table of Contents
- [About the Project](#-about-the-project)
- [The Documentary: Development Journey](#-the-documentary-development-journey)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
  - [Color Palette](#color-palette)
  - [Typography](#typography)
  - [Design Process](#design-process)
- [Features & Services](#-features--services)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)

---

## 📖 About the Project

Established in 2018 by a group of educators, **Espasyo** was created to promote engagement and collaboration among like-minded professionals.

This web application replaces static informational pages with an immersive, animated experience. It utilizes high-performance scroll animations, morphing page transitions, and a clean, minimalist aesthetic to reflect the professional yet welcoming atmosphere of the physical hub.

---

## 🎥 The Documentary: Development Journey

This project represents a bridge between **concept** and **code**.

### The Challenge
The primary goal was to translate flat design mockups into a fluid, interactive user experience without sacrificing performance. The challenge lay in managing complex state transitions (like the "View All" morphing effect) and ensuring smooth scrolling across different devices.

### The Solution
We adopted a component-based architecture using **React** and **TypeScript**. To bring the design to life, we utilized **GSAP (GreenSock Animation Platform)** for timeline-based animations and **ScrollTrigger** for scroll-driven interactions.

Key technical milestones included:
1.  **Morphing Transitions:** Implementing a "fake" shared-element transition where a DOM element expands to fill the screen before routing to the next page.
2.  **Nuclear Scroll Resets:** Solving React Router's scroll memory issues by implementing custom layout effects to force scroll-to-top on navigation.
3.  **Performance:** Using **Lenis** for smooth, momentum-based scrolling that works seamlessly with GSAP.

---

## 🛠 Tech Stack

### Core Framework
* **Vite:** High-performance frontend build tool.
* **React (v18):** UI Library for component-based architecture.
* **TypeScript:** For type safety and better developer experience.

### Styling & Animation
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **GSAP (GreenSock):** Used for complex timelines, entrance animations, and ScrollTrigger effects.
* **@gsap/react:** The official React hook for safe GSAP integration.
* **Lenis:** A lightweight library for smooth scrolling.

### Routing & Icons
* **React Router DOM:** For handling client-side navigation.
* **Lucide React:** Lightweight, consistent icon set.

---

## 🎨 Design System

The design philosophy focuses on **warmth, professionalism, and nature**. We transitioned from standard web layouts to a more editorial, print-inspired layout.

### Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Dark Forest** | `#2C3628` | Primary Background (Dark), Text (Light), Borders |
| **Alabaster** | `#F2F0E9` | Primary Background (Light), Text (Dark), Cards |
| **Terracotta** | `#C87941` | Accents, Hover States, Interactive Elements |
| **Buff Gold** | `#D4A373` | CTAs, Headings, Highlights |
| **Hunter Green** | `#3E4A35` | Secondary Backgrounds, Contact Section |
| **Eggshell** | `#F0EAD6` | Testimonials Background |

### Typography
We utilize Google Fonts via CSS import:
* **Headings:** `Oswald` (Weight 700) - Condensed, bold, and impactful.
* **Body:** `Inter` (Weight 400/500) - Clean, legible, and modern.

### Design Process & Tools
1.  **Ideation & Mockups:** Initial layouts and asset composition were created using **Canva**.
2.  **Asset Sourcing:** High-quality imagery sourced from **Unsplash**.
3.  **Implementation:** Designs were translated into **Tailwind CSS** classes, ensuring responsiveness across mobile and desktop.

---

## 🚀 Features & Services

The website highlights the core offerings of Espasyo:

* **Coworking Space:** Hot desks and dedicated seats.
* **Meeting Rooms:** Professional spaces for client presentations.
* **Virtual Office:** Business address registration and mail handling.
* **Business Services:** Bookkeeping, Tax Filing, and Business Registration (SEC/DTI/BIR).
* **Client Stories:** A testimonial section featuring video integration.

---

## 💻 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/judiebae/espasyo.git](https://github.com/judiebae/espasyo.git)
    cd espasyo
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure
espasyo/ <br>
<br>├── src/
<br>│   ├── assets/          # Static images (logos, backgrounds)
<br>│   ├── components/      # React components (Home, Services, Contact, etc.)
<br>│   ├── App.tsx          # Main routing logic
<br>│   ├── main.tsx         # Entry point & global styles
<br>│   └── index.css        # Tailwind directives & Lenis setup
<br>├── public/              # Public assets
<br>├── index.html           # HTML entry point
<br>├── package.json         # Dependencies and scripts
<br>├── tailwind.config.js   # Tailwind configuration
<br>└── vite.config.ts       # Vite configuration

---

**© 2026 Espasyo Coworking Space.** Built with ❤️ using React & GSAP.
