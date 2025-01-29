// Employ basic JavaScript syntax accurately.
// Implement control flow structures such as conditionals and loops effectively.
// Use arrays and objects to organize and manage data.
// Develop functions to create reusable code.
// Utilize loops and iteration to navigate through data collections.
// Implement error handling to manage potential code failures gracefully.

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid

// function verifyCourseId(CourseInfo, AssignmentGroup) {
//   if (AssignmentGroup.course_id === CourseInfo.id) {
//     console.log("The assignment group belongs to this course!");
//   } else {
//     throw new Error("The assignment group doesn't belong to this course!");
//   }
// }
// console.log(`AssignmentGroup course_id: ${AssignmentGroup.course_id}`);
// console.log(`Course id: ${CourseInfo.id}`);
// verifyCourseId(CourseInfo, AssignmentGroup);

// What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string?
// function grade(points_earned, points_possible) {
//   if (points_possible === 0) {
//     throw new Error("ERROR: Cannot divide by 0.");
//   }

//   if (
//     typeof points_earned !== "number" ||
//     typeof points_possible !== "number"
//   ) {
//     throw new Error("ERROR: Please input a number.");
//   }

//   const points_awarded = (points_earned / points_possible) * 100;
//   console.log(`Grade percentage: ${points_awarded}%`);
// }

// CODE TO LOOP THROUGH THE ASSIGNMENTS
// function loopAssignments(assignments) {
//   for (const assignment of assignments) {
//     const { id, name, due_at, points_possible } = assignment;
//   }
// }

// If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
// let totalGrade = 0;
// let gradedAssignments = 0;
// const currentDate = new Date();
// if (due_at > currentDate) {
//   console.log(`Skip assignment ${id} ${name} , it's not due yet.`);
//   continue;
// }

// if(submitted_at) {
//   const submittedDate = new Date(submitted_at);
//   if (submittedDate > due_at){
//     console.log(`Assigment ${id} was submitted late. Deducting 10% from total possible points.`);
//   }
//   points_earned -= points_possible * 0.9;
// }

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

console.log("======= Code Starts Here =======");
console.log("======= Line 143 =======");
// COMBINED FUNCTIONS
function processAssignments(
  CourseInfo,
  AssignmentGroup,
  assignments,
  learnerSubmissions
) {
  // Verify Course ID
  function verifyCourseId() {
    console.log(`AssignmentGroup course_id: ${AssignmentGroup.course_id}`);
    console.log(`Course id: ${CourseInfo.id}`);

    if (
      typeof CourseInfo.id !== "number" ||
      typeof AssignmentGroup.course_id !== "number"
    ) {
      throw new Error(
        "Invalid input: Course ID or Assignment Group ID is not a valid number."
      );
    }

    if (AssignmentGroup.course_id === CourseInfo.id) {
      console.log("The assignment group belongs to this course!");
    } else {
      throw new Error("The assignment group doesn't belong to this course!");
    }
  }

  // Calculate grade percentage
  function calculateGrade(points_earned, points_possible) {
    if (
      typeof points_earned !== "number" ||
      typeof points_possible !== "number"
    ) {
      throw new Error(
        "ERROR: Both points_possible and points_earned must be numbers."
      );
    }

    if (points_possible === 0) {
      throw new Error("ERROR: Cannot divide by 0.");
    }

    return points_earned / points_possible;
  }

  // Validate assignment fields
  function ValidateAssignment(assignment) {
    const { id, name, due_at, points_possible } = assignment;

    if (typeof id !== "number") {
      throw new Error(`Assignment ID is not a valid number: ${id}`);
    }

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error(`Assignment name is invalid: ${name}`);
    }

    if (typeof points_possible !== "number" || points_possible < 0) {
      throw new Error(
        `Invalid points_possible for assignment ${id}: ${points_possible}`
      );
    }

    if (due_at && isNaN(Date.parse(due_at))) {
      throw new Error(
        `Invalid due date format for assignment ${id}: ${due_at}`
      );
    }
  }

  // Process learner submissions
  function processLearnerData() {
    const currentDate = new Date();
    const learnerDataMap = new Map();
    const assignmentMap = new Map(assignments.map((a) => [a.id, a]));
    for (const submission of learnerSubmissions) {
      const {
        learner_id,
        assignment_id,
        submission: { submitted_at, score },
      } = submission;

      const assignment = assignmentMap.get(assignment_id);
      if (!assignment) continue;

      ValidateAssignment(assignment); // Call validation here

      const { due_at, points_possible } = assignment;
      const dueDate = new Date(due_at);
      const submittedDate = new Date(submitted_at);

      //Skip assignments not yet due
      if (dueDate > currentDate) continue;

      let adjustedScore = score;
      if (submittedDate > dueDate) {
        console.log(
          `Late submission detected for assignment ${assignment_id}, deducting 10%.`
        );
        adjustedScore -= points_possible * 0.1; // Apply late penalty
      }

      const percentage = calculateGrade(adjustedScore, points_possible);

      //Store learner data
      if (!learnerDataMap.has(learner_id)) {
        learnerDataMap.set(learner_id, {
          id: learner_id,
          total_score: 0,
          total_possible: 0,
          scores: {},
        });
      }

      const learnerData = learnerDataMap.get(learner_id);
      learnerData.scores[assignment_id] = percentage;
      learnerData.total_score += adjustedScore;
      learnerData.total_possible += points_possible;
    }

    // Convert data to required format
    return Array.from(learnerDataMap.values()).map((learner) => ({
      id: learner.id,
      avg: learner.total_score / learner.total_possible,
      ...learner.scores,
    }));
  }

  // Execute functions in sequence
  try {
    verifyCourseId();
    return processLearnerData();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return [];
  }
}
const result = processAssignments(
  CourseInfo,
  AssignmentGroup,
  AssignmentGroup.assignments,
  LearnerSubmissions
);
console.log(result);

// function getLearnerData(course, ag, submissions) {
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// return result;
