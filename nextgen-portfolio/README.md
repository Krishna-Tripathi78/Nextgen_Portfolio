# NextGen Portfolio

A modern, feature-rich portfolio website built with Next.js 15, Sanity CMS, Groq AI, and cutting-edge UI components.

## ✨ Features

### 🎨 Design & UI
- **Cinematic Loading Screen** - Animated 3D logo with rotating rings, orbiting elements, and stage-based progress
- **Glassmorphism Effects** - Modern frosted glass UI components with backdrop blur
- **Floating Dock Navigation** - macOS-style dock with smooth animations and hover effects
- **Dark/Light Mode** - Seamless theme switching with system preference detection using next-themes
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop with container queries
- **Animated Backgrounds** - Ripple effects, particle fields, and gradient animations
- **Interactive Rating System** - User feedback modal triggered at 80% scroll completion

### 🚀 Core Functionality
- **Dynamic Content Management** - Powered by Sanity CMS for easy content updates
- **AI Twin Chatbot** - Interactive AI assistant powered by Groq AI for visitor engagement
- **Contact Form** - Server-side form handling with Resend email integration
- **Skills Visualization** - Interactive charts using Recharts with proficiency indicators
- **Project Showcase** - Dynamic project cards with technology tags and links
- **Certifications & Achievements** - Dedicated sections with verification links and featured items
- **Experience Timeline** - Professional work history with responsibilities and achievements
- **Education Section** - Academic background with honors and coursework details

### 🛠️ Technical Stack
- **Framework**: Next.js 15.1.5 (App Router with Turbopack)
- **Styling**: Tailwind CSS with custom animations
- **CMS**: Sanity.io v3
- **AI**: Groq AI for chatbot functionality
- **Email**: Resend for contact form submissions
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React, Tabler Icons
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion, CSS animations
- **TypeScript**: Full type safety throughout the project

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd nextgen-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Groq AI
GROQ_API_KEY=your_groq_api_key

# Resend Email
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com

# Optional: Clerk Authentication (if using auth features)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

## 🚀 Development

```bash
# Run development server
npm run dev

# Run Sanity Studio (access at /studio)
npm run sanity:dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Project Structure

```
nextgen-portfolio/
├── app/                    # Next.js app router
│   ├── (portfolio)/       # Main portfolio pages
│   │   ├── layout.tsx     # Portfolio layout with sidebar
│   │   ├── page.tsx       # Home page
│   │   └── loading.tsx    # Loading state
│   ├── api/               # API routes
│   │   ├── ai-twin/       # Groq AI chatbot endpoint
│   │   └── portfolio-data/# Portfolio data endpoint
│   ├── actions/           # Server actions
│   ├── dashboard/         # Admin dashboard
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── RatingSection.tsx
│   ├── Chat/              # AI Twin chatbot components
│   │   ├── ChatWrapper.tsx
│   │   └── MessageContent.tsx
│   ├── ui/                # Reusable UI components
│   └── ...                # Other components
├── sanity/                # Sanity CMS configuration
│   ├── schemaTypes/       # Content schemas
│   └── lib/               # Sanity utilities
├── Data/                  # Sample data (NDJSON format)
├── hooks/                 # Custom React hooks
│   ├── use-mobile.ts
│   └── use-portfolio-completion.ts
├── lib/                   # Utility functions
│   ├── utils.ts
│   ├── config.ts
│   └── ai-knowledge.ts
└── types/                 # TypeScript type definitions
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
- Dynamic icon colors with Lucide React

### Hero Section
- Animated text flip effect
- Profile image with tilt effect
- Social media links with icons (GitHub, LinkedIn, Twitter, Website)
- Contact information with Lucide icons (Mail, MapPin, CheckCircle2)
- Gradient text animations
- Background ripple effects

### AI Twin Chatbot
- Powered by Groq AI (llama-3.3-70b-versatile model)
- Context-aware responses based on portfolio data
- Real-time streaming responses
- Character limit (500 chars)
- Dark mode support
- Enhanced typography with bold text and bullet points
- Floating action button with gradient effects

### Rating System
- Modal appears at 80% scroll completion
- 5-star rating interface
- Optional feedback text
- Smooth animations and transitions
- Dismissible with close button

## 📊 Content Management

### Sanity Studio
Access the CMS at `/studio` to manage:
- Profile information
- Projects with technologies and links
- Skills with proficiency levels
- Experience with responsibilities and achievements
- Education with coursework and honors
- Certifications with verification links
- Achievements (featured and regular)
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
1. **Hero** - Introduction with animated text, profile image, and social links
2. **About** - Personal bio, background, and statistics
3. **Skills** - Interactive skill charts with categories and proficiency levels
4. **Experience** - Work history timeline with responsibilities and tech stack
5. **Projects** - Portfolio showcase with technology tags and external links
6. **Education** - Academic background with achievements and coursework
7. **Certifications** - Professional certifications with skills and verification
8. **Achievements** - Awards and recognitions (featured and regular)
9. **Contact** - Contact form with email integration and social links

### UI Components
- Animated buttons and cards with hover effects
- Tilt effects using comet-card component
- Scroll reveal animations
- Progress indicators and charts
- Tooltips and popovers
- Modal dialogs
- Loading skeletons
- Responsive sidebar navigation
- Back to top button
- Theme toggle with gradient effects

## � Customization

### Colors
Update the color scheme in `tailwind.config.js` and component files. Current theme uses:
- Primary: Purple/Indigo shades
- Accent: Pink, Orange
- Background: Slate/Gray tones
- Dark mode optimized

### Fonts
Modify fonts in `app/layout.tsx` using Next.js font optimization (currently using system fonts).

### Content
All content is managed through Sanity CMS. Update schemas in `sanity/schemaTypes/`.

### AI Chatbot
Customize AI responses by editing `lib/ai-knowledge.ts` and the system prompt in `app/api/ai-twin/route.ts`.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Container queries used for fine-grained responsive design

## ⚡ Performance Optimizations

See `PERFORMANCE_OPTIMIZATIONS.md` for details on:
- Disabled React Compiler (experimental)
- Package import optimizations
- TypeScript configuration improvements
- Build time optimizations

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
Add all required environment variables in the Vercel dashboard under Project Settings → Environment Variables.

### Other Platforms
Build the project and deploy the `.next` folder:
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check TypeScript errors with `npm run build`
- Verify Sanity connection and data structure

### AI Chatbot Issues
- Verify GROQ_API_KEY is set correctly
- Check API rate limits
- Review console logs for error messages

### Email Form Issues
- Verify RESEND_API_KEY is valid
- Check CONTACT_EMAIL is set
- Review server logs for submission errors

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Sanity CMS, and Groq AI
