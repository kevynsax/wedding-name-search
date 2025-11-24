# Wedding Name Search 💍

A beautiful, wedding-themed word search puzzle generator for your guests. Built with React, TypeScript, and Vite.

![Wedding Word Search](/public/logo.png)

## ✨ Features

- **Custom Word Search Generation**: Create unique puzzles with your guest list.
- **Smart Placement Algorithm**: Efficiently places words and detects if the grid is too small.
- **Configurable Grid**: Adjust rows, columns, and options (like keeping surnames together).
- **Beautiful Floral Design**: Elegant watercolor aesthetics with animations.
- **Print Ready**: Optimized styles for printing the puzzles directly from the browser.
- **Responsive**: Works seamlessly on desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Vanilla CSS (for custom themes)
- **Icons**: Lucide React
- **Deployment**: Docker, Nginx

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Local Development

1.  **Clone the repository**
    ```bash
    git clone git@github.com:kevynsax/wedding-name-search.git
    cd wedding-name-search
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 🐳 Docker Deployment

This project is containerized using Docker and served with Nginx. It is configured to run under the `/wedding-name-search/` subpath.

### 1. Build the Image

```bash
docker build -t wedding-name-search .
```

### 2. Run the Container

```bash
docker run -p 80:80 wedding-name-search
```

### 3. Nginx Reverse Proxy Configuration

If you are running this behind a main Nginx reverse proxy (as per your request), add the following location block to your server configuration:

```nginx
location /wedding-name-search/ {
    proxy_pass http://wedding-name-search/; # Replace with your actual container/service name
}
```

## 📂 Project Structure

- `/src/components`: React components (NameInput, Configuration, PuzzleGrid).
- `/src/store`: Redux state management.
- `/src/utils`: Word search generation algorithm.
- `/public`: Static assets (images, icons).

## 📄 License

This project is for personal use. Feel free to modify it for your own wedding!
