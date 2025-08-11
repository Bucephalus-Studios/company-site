async function fetchGitHubRepos() {
    try {
        // Fetch all public repositories from Bucephalus Studios
        const response = await fetch('https://api.github.com/orgs/Bucephalus-Studios/repos');
        const repos = await response.json();
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        // Filter for only repos tagged with "cpp-library"
        const cppLibraries = repos
            .filter(repo => 
                !repo.archived && 
                repo.topics && 
                repo.topics.includes('cpp-library')
            )
            .sort((a, b) => {
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                return a.name.localeCompare(b.name);
            });
        
        return cppLibraries;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

function createRepoCard(repo) {
    const license = repo.license && repo.license.spdx_id && repo.license.spdx_id !== "NOASSERTION"
        ? `<a href="${repo.html_url}/blob/${repo.default_branch}/LICENSE" target="_blank" class="consoleOrange">${repo.license.spdx_id}</a>`
        : '<span class="consoleCyan">N/A</span>';
    
    const description = repo.description || '<span class="consoleCyan">No description available</span>';
    
    const lastUpdated = new Date(repo.updated_at).toLocaleDateString();
    
    return `
        <div class="softwareDiv" style="border: 2px solid #555; border-radius: 8px; padding: 20px; margin: 15px 0; background: rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <h3 style="margin: 0;">
                    <a href="${repo.html_url}" target="_blank" class="consoleOrange">${repo.name}</a>
                </h3>
                <div style="display: flex; gap: 15px; font-size: 14px;">
                    <span title="Stars">\u2B50 ${repo.stargazers_count}</span>
                    <span title="Forks">\uD83C\uDF74 ${repo.forks_count}</span>
                    ${repo.language ? `<span title="Primary Language" class="consoleCyan">${repo.language}</span>` : ''}
                </div>
            </div>
            
            <p style="margin: 10px 0; line-height: 1.4;">${description}</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 14px;">
                <div>
                    <span class="consoleYellow">License:</span> ${license}
                </div>
                <div class="consoleCyan">
                    Updated: ${lastUpdated}
                </div>
            </div>
            
            <div style="margin-top: 15px;">
                <a href="${repo.html_url}" target="_blank" class="repo-button" style="display: inline-block; padding: 8px 16px; background: linear-gradient(to right, #13c3ff, #1371ff); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; transition: 0.3s;">
                    View on GitHub
                </a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="demo-button" style="display: inline-block; padding: 8px 16px; background: linear-gradient(to right, #FF5555, #AA0000); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; margin-left: 10px; transition: 0.3s;">Live Demo</a>` : ''}
            </div>
        </div>
    `;
}

async function loadGitHubRepos() {
    const container = document.getElementById('github-repos-container');
    if (!container) {
        console.error('GitHub repos container not found');
        return;
    }
    
    // Show loading message
    container.innerHTML = '<div class="softwareDiv"><p class="consoleCyan">Loading repositories from GitHub...</p></div>';
    
    try {
        const repos = await fetchGitHubRepos();
        
        if (repos.length === 0) {
            container.innerHTML = '<div class="softwareDiv"><p class="consoleRed">Unable to load repositories. <a href="https://github.com/Bucephalus-Studios" target="_blank">View on GitHub</a></p></div>';
            return;
        }
        
        // Create C++ Libraries section header
        const header = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 align="center">
                    <img src="assets/c++ library cooltext.png" alt="C++ Libraries">
                </h3>
                <p class="consoleCyan"> (${repos.length} items)</p>
                <p>
                    This is general purpose C++ code we've written to make our games and software.
                </p>
            </div>
        `;
        
        // Generate repository cards
        const repoCards = repos.map(repo => createRepoCard(repo)).join('');
        
        container.innerHTML = header + repoCards;
        
    } catch (error) {
        console.error('Error loading repositories:', error);
        container.innerHTML = '<div class="softwareDiv"><p class="consoleRed">Error loading repositories. <a href="https://github.com/Bucephalus-Studios" target="_blank">View on GitHub</a></p></div>';
    }
}

// Auto-load when the DOM is ready
document.addEventListener('DOMContentLoaded', loadGitHubRepos);