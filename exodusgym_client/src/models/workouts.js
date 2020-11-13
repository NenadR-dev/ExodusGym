export const templateWorkout = {
  name: "",
  description: "",
  intensity: "",
  type: "",
  duration: "",
  sets: "",
  dates: [],
  exercises: [{
    name: "",
    interval: ""
  }]
}


export const hiitWorkout = {
    name: "Hiit",
    description: "HIIT stands for high-intensity interval training, which refers to the short bursts of intense exercise alternated with low-intensity recovery periods that make up the protocol.",
    intensity: "Moderate",
    type: "Group",
    duration: "15 minutes",
    sets: "1 set",
    dates: [],
    exercises: [
      {
        name: "Close-Grip Chest Press",
        interval: "30 seconds"
      },
      {
        name: "Close-Grip Chest Press with Crunch",
        interval: "45 seconds"
      },
      {
        name: "Close-Grip Chest Press with Crunch and Leg Lowers",
        interval: "75 seconds"
      },
      {
        name: "Squat Hold",
        interval: "45 seconds"
      },
      {
        name: "Renegade Rows",
        interval: "30 seconds"
      },
      {
        name: "Weighted Walkout to Renegade Row",
        interval: "45 seconds"
      },
      {
        name: "Weighted Walkout to Renegade Row to Knee Raise and Twist",
        interval: "75 seconds"
      },
      {
        name: "Squat hold",
        interval: "45 seconds"
      },
      {
        name: "Dumbbell Over-the-Shoulder Chops",
        interval: "30 seconds"
      },
      {
        name : "Squat and Over-the-Shoulder Chops",
        interval: "45 seconds"
      },
      {
        name: "Squat Thrust and Over-the-Shoulder Chops",
        interval: "75 seconds"
      },
      {
        name: "Cooldown Stretch",
        interval: "45 seconds"
      }
    ]
  }

export const spartanWorkout = {
  name: "Spartan",
  description: "It is an intense training system and is not meant to be performed every day. The 300 Spartan workout is best approached like a fullbody training system, using it 3 times per week on alternating days.",
  intensity: "High",
  type: "Individual",
  duration: "30 minutes",
  sets: "3 set",
  dates: [],
  exercises: [
    {
      name: "Squats",
      interval: "20 reps"
    },
    {
      name: "Jump Knee Trucks",
      interval: "10 reps"
    },
    {
      name: "Slow Climbers",
      interval: "20 reps"
    },
    {
      name: "Push-Ups",
      interval: "10 reps"
    },
    {
      name: "Elbow plank",
      interval: "20 seconds"
    },
    {
      name: "Lunges",
      interval: "20 reps"
    },
    {
      name: "Sit-Ups",
      interval: "10 reps"
    },
    {
      name: "Leg Raises",
      interval: "10 reps"
    },
    {
      name: "Reverse Crunches",
      interval: "10 reps"
    },
    {
      name: "Rest",
      interval: "up to 2 minutes"
    }
  ]
}

export const yogaWorkout = {
  name: "Yoga",
  description: "For many, yoga is a path to physical health. A solid, consistent practice can improve your strength, flexibility, coordination—and even your mental well-being.",
  intensity: "Low",
  type: "Group",
  duration: "15 minutes",
  sets: "1 set",
  dates: [],
  exercises:[
    {
      name: "Downward Dog",
      interval: "5-10 breaths"
    },
    {
      name: "Child's Pose",
      interval: "5-10 breaths"
    },
    {
      name: "High Lunge and Warrior I",
      interval: "5-10 breaths"
    },
    {
      name: "Triangle Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Warrior II",
      interval: "5-10 breaths"
    },
    {
      name: "Mountain Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Cat/Cow Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Bridge Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Warrior III (with Blocks)",
      interval: "5-10 breaths"
    },
    {
      name: "Seated Forward Bend",
      interval: "5-10 breaths"
    },
    {
      name: "Tree Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Pigeon Pose",
      interval: "5-10 breaths"
    },
    {
      name: "Half Lord of the Fishes",
      interval: "5-10 breaths"
    }
  ]
}