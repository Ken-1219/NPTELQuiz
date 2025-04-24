"use client"

import React, { useEffect } from 'react';
import CognitiveQuizCard from '@/app/components/CognitiveQuizCard/CognitiveQuizCard';
import MIPTQuizCard from '@/app/components/MIPTQuizCard/MIPTQuizCard';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleQuestionOptions(questions) {
  return questions.map(question => {
    question.options = shuffleArray(question.options);
    return question;
  });
}

function shuffleWeekData(weekData) {
  return shuffleArray(weekData);
}

function Page({ params }) {
  const weekNumber = parseInt(params.ID.split('-')[1]);
  let weekData = require(`@/MIPT/week${weekNumber}.json`);
  console.log(weekData);

  // Shuffle the weekData and options within each question
  weekData = shuffleWeekData(weekData);
  weekData = shuffleQuestionOptions(weekData);

  useEffect(() => {
    // Remove data from the local storage of the previous Quiz
    localStorage.removeItem('correctCount');
    localStorage.removeItem('attemptedCount');
  }, [])

  return (
    <>
      <MIPTQuizCard data={weekData} />
    </>
  );
}

export default Page;
