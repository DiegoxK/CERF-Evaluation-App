export const mockComparisonEvaluationData = {
  id: "eval-1-comp",
  taskId: "formal-email",
  userText:
    "Dear Mr. Smith, I am writing to ask about the job. I has went to your website and I think I am a good fit. I want to know more details. Thank you.",
  evaluation: {
    cefrLevel: "B1",
    overallFeedback:
      'This is a clear, direct email. To improve, focus on using more formal phrasings and correcting the past tense of the verb "to go". The structure is logical.',
    feedbackItems: [
      {
        textToHighlight: "ask about",
        feedbackType: "Vocabulary",
        suggestion: "enquire about",
        explanation: '"Enquire" is a standard formal alternative to "ask".',
      },
      {
        textToHighlight: "I has went",
        feedbackType: "Grammar",
        suggestion: "I have visited",
        explanation:
          'The correct present perfect form is "have visited". "Has" is used for he/she/it.',
      },
    ],
  },
};
export const mockEvaluationData = {
  id: "eval-1",
  taskId: "formal-email",
  userText:
    "Dear Mr. Smith, I am writing to ask about the job. I has went to your website and I think I am a good fit. I want to know more details. Thank you.",
  evaluation: {
    cefrLevel: "A2",
    overallFeedback:
      "Good attempt at a formal email. The main points are clear, but there are some significant grammatical errors and the tone could be more professional. Focus on verb tenses and using more formal vocabulary.",
    categoryRatings: {
      grammar: {
        rating: 2,
        feedback:
          "Several grammatical errors were found, particularly with verb tenses and subject-verb agreement.",
      },
      vocabulary: {
        rating: 3,
        feedback:
          "Vocabulary is adequate for the task, but could be more varied and formal.",
      },
      cohesion: {
        rating: 4,
        feedback:
          "The ideas are mostly well-connected, but more transition words would improve flow.",
      },
      clarity: {
        rating: 4,
        feedback: "The main message is clear and understandable.",
      },
    },
    feedbackItems: [
      {
        textToHighlight: "ask about",
        feedbackType: "Vocabulary",
        suggestion: "inquire about",
        explanation:
          'In formal emails, "inquire" is a more professional verb than "ask".',
      },
      {
        textToHighlight: "I has went",
        feedbackType: "Grammar",
        suggestion: "I have been to / I visited",
        explanation:
          'The correct present perfect form is "have gone" or "have been". Simple past "visited" is also a good option.',
      },
      {
        textToHighlight: "good fit",
        feedbackType: "Vocabulary",
        suggestion: "strong candidate",
        explanation:
          '"Strong candidate" is more formal and specific for a job application.',
      },
    ],
  },
};

export const availableModels = [
  { id: "model-a", name: "Model A (Default)" },
  { id: "model-b", name: "Model B (Advanced)" },
  { id: "model-c", name: "Model C (Creative)" },
];
