"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CognitiveQuizCard({ data: weekData }) {
    const router = useRouter();

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(weekData[index].question);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState(weekData[index].options);
    const [correctCount, setCorrectCount] = useState(0);
    const [attemptedCount, setAttemptedCount] = useState(0);
    const [savedOptions, setSavedOptions] = useState(new Array(weekData.length).fill(null));

    useEffect(() => {
        setQuestion(weekData[index].question);
        setOptions(weekData[index].options);
        //Since page is changed, update the previous selected option from savedOptions array.
        setSelectedOption(savedOptions[index]);
        console.log(correctCount, attemptedCount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, weekData, savedOptions]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextButton = () => {
        if (index < weekData.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrevButton = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleSaveButton = () => {
        if (!selectedOption) return;
        // Update saved options
        const newSavedOptions = [...savedOptions];
        newSavedOptions[index] = selectedOption;
        setSavedOptions(newSavedOptions);

        // Check if option is already selected for this question
        const prevSelectedOption = savedOptions[index];

        if (!prevSelectedOption) {
            setAttemptedCount(attemptedCount + 1);
        }

        // Update correct count if option is selected and correct
        if (selectedOption && selectedOption.isCorrect && !prevSelectedOption) {
            setCorrectCount(correctCount + 1);
        }
        else if (prevSelectedOption && prevSelectedOption.isCorrect && selectedOption && !selectedOption.isCorrect) {
            // If previously selected option was correct and now user marked wrong, reduce correctCount
            setCorrectCount(correctCount - 1);
        }
        else if (prevSelectedOption && selectedOption && selectedOption.isCorrect) {
            // If previously selected option was wrong and now user selects correct, increase correctCount
            setCorrectCount(correctCount + 1);
        }

        handleNextButton();
    };

    const handleSubmit = () => {
        localStorage.setItem('correctCount', correctCount);
        localStorage.setItem('attemptedCount', attemptedCount);
        router.push('/result');
    }

    return (
        <div>
            {index >= 0 && index <= weekData.length - 1 && (
                <div
                    className='md:h-[80vh] flex items-center justify-center flex-col p-10'>
                    {/* Question Count */}
                    <h1
                        className='md:text-3xl text-xl font-bold mb-10'>
                        Question: <span
                            className='md:text-2xl text-lg font-normal'>{index + 1}/10</span>
                    </h1>

                    {/* question */}
                    <div>
                        <h1
                            className='md:text-2xl text-lg font-semibold sm:text-center mb-10'>{question}</h1>
                    </div>

                    {/* options */}
                    <div>
                        {options.map((option) => (
                            <div key={option.id}>
                                <div

                                    className={`flex justify-center items-center w-full px-12 p-2 m-2 rounded-md hover:bg-indigo-200 hover:text-indigo-500 cursor-pointer ${selectedOption === option ? 'bg-indigo-500' : ''}  ${selectedOption === option ? 'text-white' : 'text-midnight'} transition duration-100 ease-in-out`}
                                    onClick={() => handleOptionSelect(option)}>
                                    <h1
                                        className='md:text-xl text-lg font-medium capitalize text-left'>{option.text}</h1>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* buttons */}
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

                            className='h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2 disabled:opacity-50 '
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
                            // href={{ pathname: '/result', query: { correctCount, attemptedCount } }}
                            onClick={handleSubmit}
                            className={`h-10 w-28 bg-indigo-700 p-4 flex justify-center items-center text-white rounded-xl hover:bg-indigo-800 font-bold my-2 ${index !== weekData.length - 1 ? 'hidden' : 'block'}`}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CognitiveQuizCard;
