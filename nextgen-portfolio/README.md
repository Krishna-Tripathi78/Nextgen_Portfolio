# NextGen Portfolio

A modern, full-stack portfolio website built with Next.js 15, Sanity CMS, and Clerk authentication. Features a dynamic content management system for showcasing projects, skills, experience, and achievements.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Content Management**: Sanity CMS with custom studio interface
- **Authentication**: Clerk integration for secure access
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Dynamic Content**: Real-time content updates from Sanity
- **SEO Optimized**: Built-in Next.js SEO features

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

### Backend & CMS
- **Sanity** - Headless CMS for content management
- **Sanity Studio** - Custom content editing interface

### Authentication
- **Clerk** - User authentication and management

### Deployment
- **Vercel** - Hosting and deployment platform

## 📁 Project Structure

```
nextgen-portfolio/
├── app/
│   ├── (portfolio)/          # Main portfolio routes
│   ├── studio/               # Sanity Studio
│   └── globals.css
├── sanity/
│   ├── schemaTypes/          # Content schemas
│   ├── lib/                  # Sanity utilities
│   └── structure.ts          # Studio structure
├── Data/                     # Sample data files
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krishna-Tripathi78/Nextgen_Portfolio.git
   cd nextgen-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the applications**
   - Portfolio: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## 📝 Content Management

### Sanity Studio
Access the content management system at `/studio` to manage:

- **Profile** - Personal information and bio
- **Projects** - Portfolio projects with details
- **Skills** - Technical skills with proficiency levels
- **Experience** - Work experience and roles
- **Education** - Educational background
- **Certifications** - Professional certifications
- **Achievements** - Awards and accomplishments
- **Contact** - Contact form submissions
- **Site Settings** - Global site configuration

### Content Types

#### Skills Schema
```typescript
{
  name: string
  category: 'frontend' | 'backend' | 'ai-ml' | 'cloud' | 'devops' | 'database' | 'testing' | 'design' | 'mobile' | 'tools' | 'soft-skills'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  percentage: number
  yearsOfExperience: number
  color?: string
}
```

## 🎨 Customization

### Adding New Content Types
1. Create schema in `sanity/schemaTypes/`
2. Add to `sanity/schemaTypes/index.ts`
3. Update `sanity/structure.ts` for Studio navigation

### Styling
- Modify `app/globals.css` for global styles
- Use Tailwind classes for component styling
- Customize theme in `tailwind.config.js`

## 📊 Data Import

Sample data is provided in the `Data/` directory:
- Run `import-all.bat develop` (Windows) to import sample data
- Or manually import individual `.ndjson` files through Sanity Studio

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Krishna Tripathi**
- GitHub: [@Krishna-Tripathi78](https://github.com/Krishna-Tripathi78)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity for the powerful CMS
- Clerk for authentication solutions
- Vercel for hosting platform

---

⭐ Star this repository if you found it helpful!