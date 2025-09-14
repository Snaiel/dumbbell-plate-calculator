# Dumbbell Plate Calculator

A modern, responsive web application for calculating all possible dumbbell weights from your available plates. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Plate Management**: Add, edit, and remove plates with custom weights and quantities
- **Dual Calculation Modes**: 
  - Single dumbbell: Calculate weights for one dumbbell
  - Pair of dumbbells: Calculate weights when using plates across two dumbbells
- **Unit System Support**: Switch between kilograms (kg) and pounds (lbs) with automatic conversion
- **Customizable Settings**:
  - Adjustable handle weight
  - Maximum plates per side limit
- **Theme Support**: Light, dark, and system theme options
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Local Storage**: Automatically saves your settings and plate configurations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dumbbell-plate-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Set up your plates**: Add your available plates with their weights and quantities
2. **Configure settings**: Set your handle weight and maximum plates per side
3. **Choose calculation mode**: Select single dumbbell or pair mode
4. **View results**: See all possible weight combinations in an organized table
5. **Check summary**: View statistics about your plate setup and possible weights

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **shadcn/ui** - High-quality UI components

## License

This project is open source and available under the [MIT License](LICENSE).
