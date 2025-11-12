# Mortgage Calculator

A sleek, modern mortgage calculator built with React and Vite. Compare 15-year, 30-year, and 50-year mortgage options side-by-side with detailed amortization schedules.

## Features

- **Multiple term comparisons**: View 15-year, 30-year, and 50-year mortgages simultaneously
- **Real-time calculations**: Instant updates for monthly payments, total interest, and total payment
- **Amortization schedules**: Expandable monthly payment breakdowns for each term
- **Clean, modern UI**: Inspired by Linear's elegant design system
- **Responsive design**: Works seamlessly on desktop and mobile devices

## Live Demo

Visit the live application at: `https://YOUR_GITHUB_USERNAME.github.io/mortgage-calculator/`

(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username after deployment)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic deployment**:
   - The GitHub Action will automatically build and deploy your site
   - Check the "Actions" tab in your repository to monitor the deployment
   - Once complete, your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/mortgage-calculator/`

### Manual Deployment (Alternative)

If you prefer manual deployment using gh-pages:

```bash
npm run deploy
```

## Usage

1. Enter your mortgage amount (default: $500,000)
2. Enter your interest rate (default: 6.30%)
3. Click "Calculate" to see results
4. View monthly payments and total interest for 15, 30, and 50-year terms
5. Click "Show Amortization Schedule" to see the detailed payment breakdown

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD pipeline

## Project Structure

```
mortgage-calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment workflow
├── src/
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies
```

## License

MIT
