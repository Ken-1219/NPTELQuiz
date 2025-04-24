import Link from "next/link"
import DisplayCard from "../components/DisplayCard/DisplayCard"

function quiz() {
  return (
    <div
      className="flex items-center justify-center flex-col m-6 md:h-[80vh]">


      <div
        className="text-center">
        <h1
          className="md:text-5xl text-3xl font-bold m-4 mb-1 text-indigo-900">
          Choose a Quiz
        </h1>
        <p
          className="md:text-xl  text-xs font-semibold text-indigo-300 mb-6">
          Select a category and start answering questions.
        </p>
      </div>


      <div
        className="flex md:flex-row flex-col items-center justify-center">

        <DisplayCard title="Cognitive Psychology" link="/quiz/cognitive-psychology" />
        <DisplayCard title="Social Networks" link="/quiz/social-networks" />
        <DisplayCard title="Organizational Behaviour" link="/quiz/organizational-behaviour" />
        <DisplayCard title="Modern Indian Political Thought" link="/quiz/mipt" />

      </div>
    </div >
  )
}

export default quiz