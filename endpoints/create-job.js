async function createJobPost(jobData) {
    try {
        const response = await fetch(`/api/create-job/${currentRecruiterId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        });

        const result = await response.json();

        if (result.success) {
            console.log('Job created with skills:', result.extractedSkills);
            // Show the extracted skills to recruiter for review
            showExtractedJobSkills(result.extractedSkills);
        }
    } catch (error) {
        console.error('Job creation failed:', error);
    }
}