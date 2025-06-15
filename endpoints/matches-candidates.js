async function loadCandidateMatches(jobPostId) {
    try {
        const response = await fetch(
            `/api/matches/candidates/${currentRecruiterId}/${jobPostId}?minScore=30`
        );
        const data = await response.json();

        if (data.success) {
            displayCandidateCards(data.matches);
        }
    } catch (error) {
        console.error('Failed to load candidate matches:', error);
    }
}

function createCandidateCard(match) {
    const card = document.createElement('div');
    card.className = 'candidate-card';
    card.innerHTML = `
    <div class="candidate-header">
      <h3>${match.seekerName}</h3>
      <span class="match-score">${match.matchScore}% Match</span>
    </div>
    
    <div class="skills-section">
      <h4>Matched Skills (${match.matchedSkills.length}):</h4>
      <div class="matched-skills">
        ${match.matchedSkills.map(skill =>
        `<span class="matched-skill">${skill}</span>`
    ).join('')}
      </div>
      
      <h4>All Skills:</h4>
      <div class="all-skills">
        ${match.seekerSkills.map(skill =>
        `<span class="skill ${match.matchedSkills.includes(skill) ? 'matched' : ''}">${skill}</span>`
    ).join('')}
      </div>
    </div>
    
    <div class="action-buttons">
      <button class="pass-btn" onclick="handleCandidateAction('${match.seekerId}', 'passed')">
        Pass
      </button>
      <button class="contact-btn" onclick="handleCandidateAction('${match.seekerId}', 'liked')">
        Contact
      </button>
    </div>
  `;

    return card;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  // Send the form data to your API endpoint
  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sector: form.sector,
      role: form.role,
      skills: form.skills,
      // ...other fields
    }),
  });
  // ...handle response...
};

// ...in your form:
<form onSubmit={handleSubmit}>
  {/* ...sector, role, skills inputs as before... */}
  <button type="submit">Save Profile</button>
</form>