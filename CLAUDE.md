# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

## Architecture

This is a standard React + TypeScript + Vite project with the following structure:

- **src/main.tsx** - Application entry point, renders App component with React 18 StrictMode
- **src/App.tsx** - Main application component (currently a demo counter component)
- **src/assets/** - Static assets (React logo, etc.)
- **public/** - Public static files served directly by Vite

## Configuration

- **TypeScript**: Uses project references with separate configs for app (`tsconfig.app.json`) and Node.js tools (`tsconfig.node.json`)
- **ESLint**: Configured with TypeScript support, React hooks rules, and React refresh plugin
- **Vite**: Uses the official React plugin for Fast Refresh

## Dependencies

- React 19.1.0 with TypeScript support
- Vite 6.3.5 for build tooling and development server
- ESLint with TypeScript and React-specific rules