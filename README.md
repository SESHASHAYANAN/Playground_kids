<h1>NEST Sports Booking App - Documentation</h1>
<p><em>Hall Booking Application for NEST School</em></p>

<hr>

<h2>Table of Contents</h2>
<ol>
    <li><a href="#overview">Project Overview</a></li>
    <li><a href="#tech-stack">Technology Stack</a></li>
    <li><a href="#structure">Project Structure</a></li>
    <li><a href="#components">React Components</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#scripts">Available Scripts</a></li>
    <li><a href="#deployment">Deployment</a></li>
</ol>

<hr>

<h2 id="overview">1. Project Overview</h2>
<p>The NEST Sports Booking App is a React-based web application for booking sports facilities at NEST School. Users can
    browse available sports, check time slots, and submit booking requests.</p>
<p><strong>Live URL:</strong> https://seshashayanan.github.io/Playground_kids/</p>

<hr>

<h2 id="tech-stack">2. Technology Stack</h2>

<h3>Dependencies</h3>
<ul>
    <li>React 18.3.1</li>
    <li>React DOM 18.3.1</li>
</ul>

<h3>Dev Dependencies</h3>
<ul>
    <li>Vite 6.0.5</li>
    <li>TailwindCSS 3.4.17</li>
    <li>PostCSS 8.4.49</li>
    <li>Autoprefixer 10.4.20</li>
    <li>ESLint 9.17.0</li>
    <li>gh-pages 6.3.0</li>
</ul>

<hr>

<h2 id="structure">3. Project Structure</h2>
<pre>
hall-booking-app/
├── src/
│   ├── App.jsx          (Main application - 705 lines)
│   ├── index.jsx        (Entry point)
│   ├── index.css        (Global styles)
│   └── NEST SCHOOL.jpeg (Logo)
├── dist/                (Build output)
├── index.html           (HTML template)
├── package.json         (Project config)
├── vite.config.js       (Vite config)
├── tailwind.config.js   (Tailwind config)
└── postcss.config.js    (PostCSS config)
</pre>

<hr>

<h2 id="components">4. React Components</h2>

<h3>LoginPage</h3>
<p><strong>Location:</strong> App.jsx (Lines 4-72)</p>
<p><strong>Props:</strong> onLogin(name, pwd)</p>
<p><strong>Purpose:</strong> User authentication form with name and password fields.</p>

<h3>PieChart</h3>
<p><strong>Location:</strong> App.jsx (Lines 74-104)</p>
<p><strong>Props:</strong> data (array of {name, value, color})</p>
<p><strong>Purpose:</strong> SVG pie chart for sports usage distribution.</p>

<h3>ScatterPlot</h3>
<p><strong>Location:</strong> App.jsx (Lines 106-127)</p>
<p><strong>Props:</strong> data (array of booking data)</p>
<p><strong>Purpose:</strong> Visual booking data over time.</p>

<h3>SportsBookingApp</h3>
<p><strong>Location:</strong> App.jsx (Lines 131-691)</p>
<p><strong>Props:</strong> currentUser, onLogout</p>
<p><strong>Views:</strong></p>
<ul>
    <li>sportsListing - Grid of available sports</li>
    <li>sportDetail - Time slot selection</li>
    <li>addSport - Add new sport form</li>
    <li>profile - User profile with tabs</li>
</ul>

<h3>App (Default Export)</h3>
<p><strong>Location:</strong> App.jsx (Lines 693-704)</p>
<p><strong>Purpose:</strong> Root component handling authentication state.</p>

<hr>

<h2 id="features">5. Features</h2>

<h3>Sports Available</h3>
<table border="1">
    <tr>
        <th>Sport</th>
        <th>Price/Hour</th>
        <th>Duration</th>
    </tr>
    <tr>
        <td>Pickleball</td>
        <td>₹600</td>
        <td>1 hr</td>
    </tr>
    <tr>
        <td>Shooting</td>
        <td>₹4,500</td>
        <td>1:15 hrs</td>
    </tr>
    <tr>
        <td>Archery</td>
        <td>₹4,500</td>
        <td>1 hr</td>
    </tr>
    <tr>
        <td>Badminton</td>
        <td>₹400</td>
        <td>1:30 hrs</td>
    </tr>
    <tr>
        <td>Basketball</td>
        <td>₹1,000</td>
        <td>1 hr</td>
    </tr>
    <tr>
        <td>Football</td>
        <td>₹1,500</td>
        <td>1 hr</td>
    </tr>
    <tr>
        <td>Paddle Ball</td>
        <td>₹2,000</td>
        <td>1 hr</td>
    </tr>
</table>

<h3>Profile Tabs</h3>
<ul>
    <li><strong>Bookings:</strong> View personal bookings</li>
    <li><strong>All Bookings:</strong> Admin view with filters</li>
    <li><strong>Reports:</strong> Weekly reports and CSV export</li>
    <li><strong>Permissions:</strong> Approve/reject bookings</li>
    <li><strong>Stats:</strong> Analytics dashboard</li>
</ul>

<h3>Time Slots</h3>
<p>14 hourly slots available from 6:00 AM to 8:00 PM.</p>

<hr>

<h2 id="scripts">6. Available Scripts</h2>
<table border="1">
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>npm run dev</td>
        <td>Start development server</td>
    </tr>
    <tr>
        <td>npm run build</td>
        <td>Build for production</td>
    </tr>
    <tr>
        <td>npm run preview</td>
        <td>Preview production build</td>
    </tr>
    <tr>
        <td>npm run lint</td>
        <td>Run ESLint</td>
    </tr>
    <tr>
        <td>npm run deploy</td>
        <td>Deploy to GitHub Pages</td>
    </tr>
</table>

<h3>Quick Start</h3>
<pre>
npm install
npm run dev
</pre>

<hr>

<h2 id="deployment">7. Deployment</h2>
<p>The app is configured for GitHub Pages:</p>
<ul>
    <li>Base URL: /Playground_kids/</li>
    <li>Deploy command: npm run deploy</li>
    <li>Uses gh-pages package</li>
</ul>

<h3>Data Models</h3>

<h4>Sport Object</h4>
<pre>
{
    id: number,
    name: string,
    pricePerHr: number,
    duration: string,
    features: string[],
    image: string,
    icon: string
}
</pre>

<h4>Booking Object</h4>
<pre>
{
    id: number,
    bookedBy: string,
    department: string,
    sportId: number,
    sportName: string,
    date: string,
    time: string,
    description: string,
    players: number,
    approved: boolean
}
</pre>

<hr>

<p>© 2026 NEST Sports Booking App</p>
