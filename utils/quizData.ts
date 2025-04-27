type Question = {
  question: string;
  answer1: string;
  answer2: string;
  correct: 1 | 2;
};

const quizData: Question[] = [
  {
    question: "React Native hangi dil ile yazılır?",
    answer1: "JavaScript",
    answer2: "Python",
    correct: 1
  },
  {
    question: "React Native hangi firma tarafından geliştirildi?",
    answer1: "Google",
    answer2: "Facebook",
    correct: 2
  }
];

export default quizData;
