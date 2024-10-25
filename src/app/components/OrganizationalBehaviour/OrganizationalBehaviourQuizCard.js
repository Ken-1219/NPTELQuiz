"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import SocialQuestionCard from '../SocialQuestionCard/SocialQuestionCard';

function SocialQuizCard({ data: weekData }) {
    const router = useRouter();

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(weekData[index].question);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState(weekData[index].options);
    const [correctCount, setCorrectCount] = useState(0);
    const [attemptedCount, setAttemptedCount] = useState(0);
    const [savedOptions, setSavedOptions] = useState(new Array(weekData.length).fill(null));
    const [quesImage, setQuesImage] = useState(weekData[index].questionImage);
    const [isMultiCorrect, setIsMultiCorrect] = useState(weekData[index].multicorrect);
    const [isSaved, setIsSaved] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);


    useEffect(() => {
        setQuestion(weekData[index].question);
        setOptions(weekData[index].options);

        //Since page is changed, update the previous selected option from savedOptions array.
        setSelectedOption(savedOptions[index]);
        setQuesImage(weekData[index].questionImage);

        setIsMultiCorrect(weekData[index].multicorrect);
        console.log(correctCount, attemptedCount);


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, weekData, savedOptions]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [index]);

    const handleOptionSelect = (option) => {
        if (savedOptions[index] === null) {
            setSelectedOption(option);
        }
    };

    const handleNextButton = () => {
        setIsSaved(null);
        if (index < weekData.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrevButton = () => {
        setIsSaved(null);
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleSaveButton = () => {
        if (!selectedOption) return;

        // Check if option is already selected for this question
        const prevSelectedOption = savedOptions[index];

        if (!prevSelectedOption) {
            setAttemptedCount(attemptedCount + 1);
        }

        setIsSaved(true);

        const newSavedOptions = [...savedOptions];
        newSavedOptions[index] = selectedOption;
        setSavedOptions(newSavedOptions);

        if (selectedOption.isCorrect) {
            console.log("Selected option is correct");
            setIsCorrect(true);
            if (!prevSelectedOption) {
                setCorrectCount(correctCount + 1);
            }
        }
        else {
            console.log("Selected option is wrong");
            setIsCorrect(false);
        }

    };

    useEffect(() => {
        localStorage.setItem('totalQuestions', weekData.length);
        localStorage.setItem('correctCount', correctCount);
        localStorage.setItem('attemptedCount', attemptedCount);
    }, [attemptedCount, correctCount])

    const handleSubmit = () => {
        router.push('/result');
    }


    return (
        <div className='flex items-center justify-center flex-col p-10'>
            <SocialQuestionCard
                index={index}
                question={question}
                options={options}
                selectedOption={selectedOption}
                quesImage={quesImage}
                handleOptionSelect={handleOptionSelect}
                isMultiCorrect={isMultiCorrect}

            />


            {/* Correct or Incorrect */}
            {isSaved && (
                        <>
                            <h1 className={`md:text-2xl text-lg font-semibold text-center mt-8 ${isCorrect ? 'text-green-500' : 'text-red-400'}`}>
                                {isCorrect ? 'Correct' : 'Incorrect'}
                            </h1>
                            <h1 className={`md:text-2xl block text-lg font-semibold capitalize text-center ${isCorrect ? 'text-green-500' : 'text-red-400'}`}>
                                Correct Answer:
                                {options.map((option) => {
                                    if (option.isCorrect) {
                                        return (
                                            <p key={option.id} className='text-center'>{option.text}</p>
                                        )
                                    }
                                })}
                            </h1>
                        </>

            )}


            {/* {/* buttons */}
            <div
                className='flex justify-evenly flex-wrap md:w-[70rem] w-full mt-10'>
                <button
                    disabled={index === 0}

                    className='h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2 disabled:opacity-30'
                    onClick={handlePrevButton}>
                    Previous
                </button>
                <button
                    disabled={index === weekData.length - 1}

                    className='h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2 disabled:opacity-30 '
                    onClick={handleNextButton}>
                    Next
                </button>
                <button

                    className='h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2'
                    onClick={handleSaveButton}>
                    Save
                </button>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className={`h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2 ${index !== weekData.length - 1 ? 'hidden' : 'block'}`}>
                    Submit
                </button>
            </div>
        </div>
        // </div >
    )
}

export default SocialQuizCard;