"use client";

import { useState, useEffect } from "react";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  learningOutcomes: string;
  markingCriteria: string;
  createdAt: string;
  updatedAt: string;
}

export default function AssignmentListPage({
  params,
}: {
  params: { id: string };
}) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    // Fetch the specific assignment by ID
    fetch(`/api/assignment/${params.id}`)
      .then((res) => res.json())
      .then((data) => setAssignment(data));
  }, [params.id]);

  if (!assignment) {
    return <p>Loading assignment details...</p>;
  }

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleGenerateFeedback = () => {
    // Dummy function for "Generate Feedback" button
    console.log("Generating feedback for:", feedback);
  };

  return (
    <div>
      <h1>Assignment Details</h1>
      <div className="assignment-page">
        <div className="assignment-container">
          {/* Left Part: Display Title, Subject, Learning Outcomes & Marking Criteria */}
          <div className="left-column">
            <h2>Title</h2>
            <p>{assignment.title}</p> {/* New field */}
            <h2>Subject</h2>
            <p>{assignment.subject}</p> {/* New field */}
            <h2>Learning Outcomes</h2>
            <p>{assignment.learningOutcomes}</p>
            <h2>Marking Criteria</h2>
            <p>{assignment.markingCriteria}</p>
          </div>

          {/* Right Part: Textbox and Generate Feedback Button */}
          <div className="right-column">
            <textarea
              id="student-writing"
              placeholder="Paste your text here..."
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>

            <div className="button-container">
              <button
                className="submit-button"
                onClick={handleGenerateFeedback}
              >
                Generate Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}