# 🚀 GitHub API Integration Challenge

A comprehensive Next.js application that provides intelligent GitHub profile analysis, user comparison, and note-taking capabilities. Built with modern web technologies and AI-powered insights.

![GitHub API Integration](https://img.shields.io/badge/GitHub-API-181717?style=for-the-badge&logo=github)
![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 **GitHub User Search**

- Search any GitHub user by username
- Real-time data fetching from GitHub API
- Comprehensive user profile display
- Responsive design with dark/light mode support

### 📊 **User Profile Analysis**

- **Profile Information**: Avatar, name, bio, join date, followers/following
- **Repository Statistics**: Total repos, stars, forks
- **Social Links**: Location, website, Twitter (when available)
- **Activity Metrics**: Recent activity and contribution patterns

### 🤖 **AI-Powered Profile Analysis**

- **Intelligent Insights**: AI-generated profile summaries and analysis
- **Overall Scoring**: 1-10 rating based on multiple factors
- **Activity Classification**: Low/Medium/High/Very High activity levels
- **Strengths Identification**: Key developer strengths and achievements
- **Expertise Areas**: Programming languages and specializations
- **Notable Projects**: Top repositories with star counts
- **Personalized Recommendations**: Actionable improvement suggestions

### ⚖️ **User Comparison Tool**

- **Side-by-Side Comparison**: Compare two GitHub users
- **Comprehensive Metrics**: Repository count, stars, forks, account age
- **Winner Indicators**: Visual crown icons for comparison winners
- **Activity Analysis**: Recent activity and engagement comparison
- **Responsive Layout**: Works perfectly on all screen sizes

### 📝 **Smart Note-Taking System**

- **User Notes**: Save notes about specific GitHub users
- **Repository Notes**: Add notes to individual repositories
- **Persistent Storage**: Notes saved in browser localStorage
- **Full CRUD Operations**: Create, read, update, and delete notes
- **Rich Text Support**: Multi-line notes with timestamps
- **Search Integration**: Notes appear when viewing the same user/repo

### 🎨 **Modern UI/UX**

- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Glassmorphism Effects**: Modern transparent backgrounds with blur effects
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠️ **Tech Stack**

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **State Management**: TanStack Query (React Query)
- **Icons**: React Icons (Heroicons, Font Awesome)
- **Theme**: next-themes for dark/light mode
- **API**: GitHub REST API v4
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards
- **PWA**: Web App Manifest, Service Worker ready
- **Deployment**: Vercel-ready with optimized performance

## 🚀 **Getting Started**

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/github-api-integration-challenge.git
   cd github-api-integration-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 **Usage**

### Basic User Search

1. Enter a GitHub username in the search bar
2. Click "Search" to fetch user data
3. View comprehensive profile information
4. Browse repositories with detailed metrics

### AI Profile Analysis

1. Search for any GitHub user
2. Click "Analyze" in the AI Analysis section
3. Wait for AI processing (2-3 seconds)
4. Review intelligent insights and recommendations

### User Comparison

1. Click "Compare Users" in the header
2. Enter two GitHub usernames
3. Click "Compare Users" to see side-by-side analysis
4. View winner indicators and detailed metrics

### Note-Taking

1. Search for a user or repository
2. Click "Add Note" in the notes section
3. Write your notes and save
4. Notes persist across browser sessions

## 🔧 **Configuration**

### GitHub API

The app uses the public GitHub API (no authentication required):

- User data: `https://api.github.com/users/{username}`
- Repositories: `https://api.github.com/users/{username}/repos`

### Image Configuration

GitHub avatars are configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

### SEO & Meta Tags

Comprehensive SEO optimization including:

- **Meta Tags**: Title, description, keywords, author
- **Open Graph**: Facebook and social media sharing
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD schema markup
- **PWA Support**: Web app manifest and icons
- **Robots.txt**: Search engine crawling instructions
- **Sitemap.xml**: Site structure for search engines

### Performance Optimization

- **Image Optimization**: Next.js Image component with GitHub avatars
- **Font Optimization**: Google Fonts with Geist and Space Mono
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: TanStack Query with 5-minute stale time
- **Responsive Images**: Multiple icon sizes for different devices

## 📁 **Project Structure**

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── DarkAndLightButton.tsx
│   │   ├── NotesDisplay.tsx
│   │   ├── NotesModal.tsx
│   │   ├── ProfileAnalysis.tsx
│   │   ├── SearchInput.tsx
│   │   └── UserComparison.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useGitHubUser.ts
│   │   ├── useProfileAnalysis.ts
│   │   └── useUserComparison.ts
│   ├── services/           # API services
│   │   ├── aiAnalysisService.ts
│   │   └── githubApi.ts
│   ├── types/              # TypeScript types
│   │   ├── analysis.ts
│   │   ├── comparison.ts
│   │   └── notes.ts
│   ├── utils/              # Utility functions
│   │   ├── comparisonUtils.ts
│   │   └── notesStorage.ts
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with SEO
│   ├── LayoutContainer.tsx # Theme provider
│   └── page.tsx            # Main page
public/
├── site.webmanifest        # PWA manifest
├── browserconfig.xml       # Windows tiles config
├── robots.txt              # Search engine instructions
├── sitemap.xml             # Site structure
└── favicon.ico             # Site icon
```

## 🎯 **Key Features Deep Dive**

### AI Analysis Engine

- **Smart Metrics**: Analyzes repository patterns, star distribution, and activity
- **Language Detection**: Identifies programming language expertise
- **Community Engagement**: Evaluates follower/following ratios and project popularity
- **Growth Recommendations**: Provides actionable advice for profile improvement

### Comparison Algorithm

- **Multi-Factor Analysis**: Compares 6 key metrics with winner determination
- **Visual Indicators**: Crown icons and color-coded results
- **Comprehensive Scoring**: Account age, activity, and engagement metrics

### Note System

- **Hierarchical Storage**: Separate notes for users and repositories
- **Rich Metadata**: Creation/update timestamps and user context
- **Search Integration**: Notes appear contextually with relevant profiles

### SEO & Performance Features

- **Comprehensive Meta Tags**: Title templates, descriptions, keywords
- **Social Media Integration**: Open Graph and Twitter Card optimization
- **Structured Data**: JSON-LD schema markup for search engines
- **PWA Support**: Web app manifest for mobile installation
- **Performance Optimization**: Image optimization, font loading, caching
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🚀 **Deployment**

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms

- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment support
- **AWS Amplify**: Enterprise-grade hosting

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [GitHub API](https://docs.github.com/en/rest) for providing comprehensive user data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for powerful data fetching
- [React Icons](https://react-icons.github.io/react-icons/) for beautiful icons

## 📞 **Support**

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
