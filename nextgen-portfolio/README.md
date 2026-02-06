# NextGen Portfolio

A modern, feature-rich portfolio website built with Next.js 15, Sanity CMS, and cutting-edge UI components.

## ✨ Features

### 🎨 Design & UI
- **Cinematic Loading Screen** - Animated 3D logo with rotating rings, orbiting elements, and stage-based progress
- **Glassmorphism Effects** - Modern frosted glass UI components with backdrop blur
- **Floating Dock Navigation** - macOS-style dock with smooth animations and hover effects
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Animated Backgrounds** - Ripple effects, particle fields, and gradient animations

### 🚀 Core Functionality
- **Dynamic Content Management** - Powered by Sanity CMS for easy content updates
- **AI Twin Chatbot** - Interactive AI assistant for visitor engagement
- **Authentication** - Clerk integration for secure user management
- **Contact Form** - Server-side form handling with validation
- **Skills Visualization** - Interactive charts and progress indicators
- **Project Showcase** - Dynamic project cards with filtering
- **Certifications & Achievements** - Dedicated sections with verification links

### 🛠️ Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Authentication**: Clerk
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Tabler Icons, Lucide React
- **Animations**: Framer Motion, CSS animations
- **TypeScript**: Full type safety

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd nextgen-portfolio

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AI Twin (Optional)
OPENAI_API_KEY=your_openai_key
```

## 🚀 Development

```bash
# Run development server
npm run dev

# Run Sanity Studio
npm run sanity:dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
nextgen-portfolio/
├── app/                    # Next.js app router
│   ├── (portfolio)/       # Main portfolio pages
│   ├── (sanity)/          # Sanity Studio integration
│   ├── api/               # API routes
│   └── dashboard/         # Admin dashboard
├── components/            # React components
│   ├── sections/          # Page sections (Hero, About, Projects, etc.)
│   ├── ui/                # Reusable UI components
│   └── Chat/              # AI Twin chatbot
├── sanity/                # Sanity CMS configuration
│   ├── schemaTypes/       # Content schemas
│   └── lib/               # Sanity utilities
├── Data/                  # Sample data (NDJSON format)
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## 🎨 Key Components

### Loading Screen
- 3D animated logo with orbiting elements
- Rotating rings with different speeds
- Stage-based progress indicator
- Floating particles background
- Animated grid overlay

### Floating Dock
- macOS-style navigation dock
- Smooth hover animations
- Glassmorphism design
- Responsive mobile menu
- Dynamic icon colors

### Hero Section
- Animated text flip effect
- Profile image with tilt effect
- Social media links
- Gradient text animations
- Background ripple effects

### AI Twin
- Interactive chatbot
- Context-aware responses
- Floating action button
- Smooth animations

## 📊 Content Management

### Sanity Studio
Access the CMS at `/studio` to manage:
- Profile information
- Projects
- Skills
- Experience
- Education
- Certifications
- Achievements
- Contact information
- Navigation items

### Data Import
Import sample data using the provided scripts:

```bash
# Windows
cd Data
import-all.bat

# Unix/Linux/macOS
cd Data
chmod +x import-all.sh
./import-all.sh
```

## 🎯 Features Breakdown

### Sections
1. **Hero** - Introduction with animated text and profile image
2. **About** - Personal bio and background
3. **Skills** - Interactive skill charts and categories
4. **Experience** - Work history timeline
5. **Projects** - Portfolio showcase with filters
6. **Education** - Academic background
7. **Certifications** - Professional certifications
8. **Achievements** - Awards and recognitions
9. **Contact** - Contact form and information

### UI Components
- Animated buttons and cards
- Tilt effects on hover
- Scroll reveal animations
- Progress indicators
- Tooltips and popovers
- Modal dialogs
- Loading skeletons

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.js` and component files. Current theme uses:
- Purple (#A855F7)
- Pink (#EC4899)
- Orange (#F97316)

### Fonts
Modify fonts in `app/layout.tsx` using Next.js font optimization.

### Content
All content is managed through Sanity CMS. Update schemas in `sanity/schemaTypes/`.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
```

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Sanity
