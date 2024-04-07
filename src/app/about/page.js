import Link from 'next/link'
import Image from 'next/image'

function Page() {
    return (
        <div className='md:flex md:h-[80vh] md:items-center md:justify-center'>
            <div className="flex flex-col items-center justify-center p-12 md:w-[40rem]">
                <h1
                    className="md:text-4xl  text-2xl font-bold text-center text-slate-900 m-6">
                    Want to practice NPTEL Assignments?
                </h1>
                <p
                    className="md:text-xl text-sm text-center text-gray-900 mb-8 ">
                    <span className='text-bold'> We got you covered! </span><br />
                    Have fun testing yourself with quizzes from NPTEL Courses! See if you can beat your own score and learn something new along the way. Get started now and challenge yourself to see how much you know
                </p>
                <div className='flex items-center jsustify-center'>
                    <Link
                        className='md:text-2xl text-lg bg-blue-950 text-white p-3 rounded-xl mt-2' href='quiz'>Start Quiz</Link>
                </div>
            </div>



            <div className='flex items-center justify-center text-center mb-10'>
                <Image
                    className='rounded-xl hidden md:block mix-blend-multiply mr-10'
                    priority={true} src="/herosection_bg.png"
                    width={600}
                    height={600}
                    alt="quiz"></Image>

                <Image
                    className='rounded-xl md:hidden block mix-blend-multiply'
                    priority={true} src="/herosection_bg.png"
                    width={300}
                    height={400}
                    alt="quiz"></Image>
            </div>

        </div>
    )
}

export default Page;