# LeetCode Profile Analyzer

## Overview
LeetCode Profile Analyzer is a web application designed to evaluate and visualize your LeetCode profile. By analyzing the number of questions you've solved and the contests you've participated in, provides an insightful representation of your progress and activity on LeetCode. The tool displays this data using a heat map similar to GitHub's contribution graph and allows you to save your profile analysis offline as a JPEG image.

## Features
- **Profile Worth Calculation**: Determine the value of your LeetCode profile based on the number of questions solved and contests participated in.
- **Heat Map Visualization**: View your activity over time with a heat map similar to GitHub's contribution graph.
- **Offline Profile Saving**: Save your analyzed profile as a JPEG image for offline viewing and sharing.

## Installation

### Backend (Express.js)
1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/leetcode-profile-analyzer.git
    cd leetcode-profile-analyzer
    ```

2. **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3. **Set Up Environment Variables**
    Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    PORT=5000
    ```

4. **Start the Backend Server**
    ```bash
    npm start
    ```

### Frontend (React.js)
1. **Install Frontend Dependencies**
    ```bash
    cd
    npm install
    ```

2. **Start the Frontend Server**
    ```bash
    npm start
    ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:4000`.

## Usage
1. **Open the Application**
    In your browser, navigate to `http://localhost:3000`.

2. **Input Your Profile Data**
   - Enter your LeetCode username in the input field.

3. **View the Heat Map**
   - The heat map will be displayed showing your activity over time.

4. **Save Your Profile**
   - Click the "Save as JPEG" button to save your profile analysis as a JPEG image.
