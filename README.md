# TaskFlow - Modern Task Management Application

A beautiful, modern task management web application built with HTML, SCSS, TypeScript, and Firebase. TaskFlow helps you organize your life with an intuitive interface, dark mode support, and powerful task management features.

![TaskFlow](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Frosted glass effects with backdrop blur
- **Gradient Themes** - Beautiful indigo to purple gradients throughout
- **Dark Mode** - Seamless light/dark theme switching with localStorage persistence
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Micro-interactions and transitions for a polished experience

### 📋 Task Management
- **Create & Organize Tasks** - Add tasks with descriptions, deadlines, and priorities
- **Priority Levels** - Categorize tasks by urgency and importance
  - Urgent / Important
  - Urgent / Not Important
  - Not Urgent / Important
  - Not Important / Not Urgent
- **Deadline Tracking** - Visual indicators for overdue, today, and upcoming tasks
- **Task Filtering** - Filter by status (completed/active) and date
- **Task Completion** - Mark tasks as complete with visual feedback

### 👤 User Management
- **Firebase Authentication** - Secure user registration and login
- **Profile Management** - Update username and profile settings
- **Account Security** - Password reset functionality
- **Session Persistence** - Auto-login with localStorage

### 🎯 Additional Features
- **Header Navigation** - Fixed header with user profile and theme toggle
- **Legal Pages** - Professional Privacy Policy and Terms of Service
- **Modern Footer** - Social links and quick navigation
- **Keyboard Accessible** - Full keyboard navigation support
- **Google Analytics** - Integrated with Google Tag Manager

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Firebase and CDN resources)
- TypeScript (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hasan-yamin/to-do-list.git
   cd to-do-list
   ```

2. **Open the application**
   
   Simply open `index.html` in your web browser, or use a local server:

   **Using Python:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js:**
   ```bash
   npx http-server
   ```

   Then navigate to `http://localhost:8000`

### Development Setup

If you want to modify the TypeScript code:

1. **Install TypeScript globally**
   ```bash
   npm install -g typescript
   ```

2. **Compile TypeScript**
   ```bash
   tsc
   ```

   The compiled JavaScript will be output to the `dist/` directory.

## 📁 Project Structure

```
to-do-list/
├── index.html              # Main application page
├── privacy.html            # Privacy Policy page
├── terms.html             # Terms of Service page
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
│
├── scss/                  # Stylesheets
│   ├── main.css          # Base styles
│   ├── theme.css         # Dark mode styles
│   ├── modern.css        # Modern UI enhancements
│   ├── colors.css        # Color scheme and variables
│   ├── header-footer.css # Header and footer styles
│   └── legal.css         # Legal pages styles
│
├── js/                    # TypeScript source files
│   └── main.ts           # Main application logic
│
├── dist/                  # Compiled JavaScript
│   ├── main.js           # Compiled main application
│   ├── module.js         # Additional modules
│   └── test.js           # Test files
│
└── imgs/                  # Images and assets
    └── letsdoit.jpg      # Application images
```

## 🎨 Color Scheme

### Light Mode
- **Primary:** Indigo (#6366f1) → Purple (#8b5cf6)
- **Accent:** Pink (#ec4899) → Rose (#f43f5e)
- **Background:** Clean whites and light grays
- **Text:** Slate tones for readability

### Dark Mode
- **Primary:** Light Indigo (#818cf8) → Soft Purple (#a78bfa)
- **Accent:** Light Pink (#f472b6) → Soft Rose (#fb7185)
- **Background:** Deep slate (#0f172a, #1e293b)
- **Text:** Light slate for contrast

## 🔧 Technologies Used

- **Frontend:** HTML5, CSS3 (SCSS), TypeScript
- **Backend:** Firebase Realtime Database
- **Authentication:** Firebase Authentication
- **Analytics:** Google Tag Manager
- **Icons:** Font Awesome 6.2.0
- **Fonts:** Inter (Google Fonts)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 480px - 768px
- **Desktop:** > 768px

## 🔐 Security & Privacy

TaskFlow takes your privacy seriously:
- All data is stored securely in Firebase
- Passwords are encrypted
- Session data is stored locally
- No personal data is sold or shared
- Full Privacy Policy available at `/privacy.html`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Hasan Yamin**
- GitHub: [@hasan-yamin](https://github.com/hasan-yamin/)
- LinkedIn: [Hasan Yameen](https://www.linkedin.com/in/hasanyameen13/)
- Email: hasanyamin13@hotmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Firebase for backend services
- Font Awesome for icons
- Google Fonts for typography
- The open-source community

## 📝 Changelog

### Version 1.0.0 (2024-11-10)
- ✨ Modern UI redesign with glassmorphism
- 🌙 Dark mode implementation
- 👤 User profile in header
- 📄 Legal pages (Privacy Policy, Terms of Service)
- 🎨 New color scheme (Indigo/Purple)
- 📱 Enhanced mobile responsiveness
- ⚡ Performance optimizations
- 🔧 Bug fixes and improvements

---

Made with ❤️ by Hasan Yamin
