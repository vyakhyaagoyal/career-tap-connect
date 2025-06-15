async function loadJobMatches() {
  try {
    const response = await fetch(`/api/matches/jobs/${currentUserId}?minScore=25`);
    const data = await response.json();
    
    if (data.success) {
      displayJobCards(data.matches);
    }
  } catch (error) {
    console.error('Failed to load matches:', error);
  }
}

function displayJobCards(matches) {
  const container = document.getElementById('jobCards');
  
  matches.forEach(match => {
    const card = createJobCard(match);
    container.appendChild(card);
  });
}

function createJobCard(match) {
  const card = document.createElement('div');
  card.className = 'job-card';
  card.innerHTML = `
    <div class="job-header">
      <h3>${match.jobTitle}</h3>
      <span class="company">${match.company}</span>
      <span class="location">${match.location}</span>
    </div>
    
    <div class="match-info">
      <div class="match-score">
        <span class="score">${match.matchScore}%</span>
        <span class="label">Match</span>
      </div>
      
      <div class="matched-skills">
        <h4>Matched Skills:</h4>
        ${match.matchedSkills.map(skill => 
          `<span class="matched-skill">${skill}</span>`
        ).join('')}
      </div>
    </div>
    
    <div class="action-buttons">
      <button class="pass-btn" onclick="handleJobAction('${match.jobPostId}', 'passed')">
        Pass
      </button>
      <button class="like-btn" onclick="handleJobAction('${match.jobPostId}', 'liked')">
        Apply
      </button>
    </div>
  `;
  
  return card;
}

async function handleJobAction(jobPostId, action) {
  try {
    await fetch('/api/match-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seekerId: currentUserId,
        jobPostId: jobPostId,
        action: action
      })
    });
    
    // Remove card from UI
    document.querySelector(`[data-job-id="${jobPostId}"]`).remove();
    
  } catch (error) {
    console.error('Action failed:', error);
  }
}