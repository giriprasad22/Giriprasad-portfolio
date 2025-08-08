document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll down button functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            window.scrollBy({
                top: window.innerHeight - 100,
                behavior: 'smooth'
            });
        });
    }
});

// java count for leetcode

// Add this to your script.js or create a new file for LeetCode functionality
document.addEventListener('DOMContentLoaded', function() {
    fetchLeetCodeData();
    
    // Initialize streak from start date
    initializeStreak();
});

async function fetchLeetCodeData() {
    const username = 'ap_22bce9201'; // Your LeetCode username
    
    // List of available LeetCode API endpoints
    const API_ENDPOINTS = [
        `https://leetcode-api-faisalshohag.vercel.app/${username}`,
        `https://leetcodestats.cyclic.app/${username}`,
        `https://leetcode-api.deno.dev/${username}`,
        `https://leetcode-stats-api.herokuapp.com/${username}`
    ];

    // Try each API endpoint in sequence
    for (const endpoint of API_ENDPOINTS) {
        try {
            console.log(`Trying API: ${endpoint}`);
            const response = await fetch(endpoint);
            
            if (!response.ok) {
                console.log(`API failed with status: ${response.status}`);
                continue; // Try next endpoint
            }
            
            const data = await response.json();
            
            // Validate the response contains required data
            if (data && (data.totalSolved !== undefined || data.matchedUser)) {
                console.log(`Success with API: ${endpoint}`);
                
                // Extract total solved from different API response formats
                const totalSolved = data.totalSolved || 
                                  data.matchedUser?.submitStats?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 
                                  0;
                
                // Update problem counts
                document.getElementById('leet-total').textContent = 
                    `${totalSolved} problems solved`;
                return; // Exit if successful
            }
            
            console.log('API returned invalid data format');
        } catch (error) {
            console.log(`Error with API ${endpoint}:`, error.message);
            // Continue to next endpoint
        }
    }
    
    // If all APIs failed, use mock data
    console.log('All APIs failed, using mock data');
    document.getElementById('leet-total').textContent = '610 problems solved (mock data)';
}


// Streak management functions
function initializeStreak() {
    const STREAK_KEY = 'leetcodeStreak';
    const LAST_ACTIVE_KEY = 'leetcodeLastActive';
    const START_DATE_KEY = 'leetcodeStartDate';
    const streakElement = document.getElementById('leet-streak');
    
    // Start date: July 13, 2025 (13-07-2025)
    const startDate = new Date(2025, 6, 13); // Note: months are 0-indexed in JS
    const today = new Date();
    
    // Calculate days since start date
    const timeDiff = today - startDate;
    const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Initial streak was 286 days
    const totalStreak = 286 + Math.max(0, daysSinceStart);
    
    // Update storage with current values
    localStorage.setItem(STREAK_KEY, totalStreak);
    localStorage.setItem(LAST_ACTIVE_KEY, today.toISOString().split('T')[0]);
    localStorage.setItem(START_DATE_KEY, startDate.toISOString().split('T')[0]);
    
    // Display the streak
    streakElement.textContent = `${totalStreak}-day streak`;
    
    // Animate the streak update if you want to keep this functionality
    animateStreakCounter(streakElement, totalStreak);
}

// Keep the existing animateStreakCounter function if you have one
function animateStreakCounter(element, target) {
    // Animation implementation if needed
    // This is just a placeholder as it wasn't defined in the original code
    element.textContent = `${target}-day streak`;
}


// ===== PROJECTS SHOW MORE FUNCTIONALITY (SINGLE CLEAN VERSION) =====
document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.querySelector('.projects-grid');
    const showMoreProjectBtn = document.getElementById('show-more-projects');
    
    if (projectGrid && showMoreProjectBtn) {
        console.log('Project elements found'); // Debug line
        
        // Set initial collapsed state
        projectGrid.style.maxHeight = '1100px';
        projectGrid.style.overflow = 'hidden';
        projectGrid.classList.add('collapsed');
        
        // Single event listener
        showMoreProjectBtn.addEventListener('click', function() {
            console.log('Project button clicked'); // Debug line
            
            if (projectGrid.classList.contains('collapsed')) {
                // Expand
                projectGrid.style.maxHeight = projectGrid.scrollHeight + 'px';
                projectGrid.classList.remove('collapsed');
                projectGrid.classList.add('expanded');
                showMoreProjectBtn.textContent = 'Show Less Projects ▲';
                console.log('Projects Expanded');
            } else {
                // Collapse
                projectGrid.style.maxHeight = '800px';
                projectGrid.classList.remove('expanded');
                projectGrid.classList.add('collapsed');
                showMoreProjectBtn.textContent = 'Show More Projects ▼';
                console.log('Projects Collapsed');
                projectGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    } else {
        console.log('Project elements NOT found');
        console.log('projectGrid:', projectGrid);
        console.log('showMoreProjectBtn:', showMoreProjectBtn);
    }
});


// ===== CERTIFICATIONS SHOW MORE FUNCTIONALITY (SINGLE CLEAN VERSION) =====
document.addEventListener('DOMContentLoaded', function() {
    const certGrid = document.querySelector('.certifications-grid');
    const showMoreBtn = document.getElementById('show-more-certs');
    
    if (certGrid && showMoreBtn) {
        console.log('Certificate elements found'); // Debug line
        
        // Set initial collapsed state
        certGrid.style.maxHeight = '900px';
        certGrid.style.overflow = 'hidden';
        certGrid.classList.add('collapsed');
        
        // Single event listener
        showMoreBtn.addEventListener('click', function() {
            console.log('Button clicked'); // Debug line
            
            if (certGrid.classList.contains('collapsed')) {
                // Expand
                certGrid.style.maxHeight = certGrid.scrollHeight + 'px';
                certGrid.classList.remove('collapsed');
                certGrid.classList.add('expanded');
                showMoreBtn.textContent = 'Show Less ▲';
                console.log('Expanded');
            } else {
                // Collapse
                certGrid.style.maxHeight = '800px';
                certGrid.classList.remove('expanded');
                certGrid.classList.add('collapsed');
                showMoreBtn.textContent = 'Show More Certifications ▼';
                console.log('Collapsed');
            }
        });
    } else {
        console.log('Certificate elements NOT found');
        console.log('certGrid:', certGrid);
        console.log('showMoreBtn:', showMoreBtn);
    }
});
