"use client"
import React, { useEffect } from 'react';
import SocialQuizCard from '@/app/components/OrganizationalBehaviour/OrganizationalBehaviourQuizCard';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleWeekData(weekData) {
    return shuffleArray(weekData).map(item => {
        item.options = shuffleArray(item.options);
        return item;
    });
}

function Page({ params }) {
    const weekNumber = parseInt(params.ID.split('-')[1]);
    const weekData = require(`@/OrganizationalBehaviour/week${weekNumber}.json`);

    // Shuffle the weekData, questions, and options within each question
    const shuffledWeekData = shuffleWeekData(weekData);


    useEffect(() => {
        // Remove data from the local storage of the previous Quiz
        localStorage.removeItem('correctCount');
        localStorage.removeItem('attemptedCount');
    }, [])

    return (
        <>
            <SocialQuizCard data={shuffledWeekData} />
        </>
    );
}

export default Page;
