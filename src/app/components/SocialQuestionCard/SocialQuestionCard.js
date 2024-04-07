import React from 'react'
import Image from 'next/image'

function SocialQuestionCard({ question, index, options, selectedOption, handleOptionSelect, quesImage, isMultiCorrect }) {
    return (
        <div className='flex items-center justify-center flex-col p-10'>
            {/* Question Count */}
            <h1
                className='md:text-3xl text-xl font-bold '>
                Question: <span
                    className='md:text-2xl text-lg font-normal'>{index + 1}/10</span>
            </h1>
            <span className='text-sm mt-1 font-semibold text-slate-600 mb-10'>{isMultiCorrect ? "Multiple Correct" : "Single Correct"}</span>

            {/* question */}
            <div>
                <h1
                    className='md:text-2xl text-lg font-semibold sm:text-center mb-10'>{question}</h1>
            </div>

            {/* question Image */}
            <div>
                {quesImage ? (
                    <Image
                        src={quesImage}
                        alt="Question Image"
                        width={500}
                        height={500}
                    />
                ) : null}
            </div>

            {/* options */}
            <div className='flex flex-col justify-center items-center '>
                {options.map((option) => (
                    <div className='flex flex-col justify-center items-center ' key={option.id}>
                        <div

                            className={`flex flex-col justify-center items-center w-full px-12 p-2 m-2 rounded-md hover:bg-indigo-200 hover:text-indigo-500 cursor-pointer ${selectedOption === option ? 'bg-indigo-500' : ''}  ${selectedOption === option ? 'text-white' : 'text-midnight'} transition duration-100 ease-in-out`}
                            onClick={() => handleOptionSelect(option)}>
                            {option.image && (
                                <div className='m-2'>
                                    <Image
                                        src={option.image}
                                        alt="Option Image"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            )}
                            <h1
                                className='md:text-xl text-lg font-medium text-left'>{option.text}</h1>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SocialQuestionCard