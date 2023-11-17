const newNames = ['Elijah', 'Olivia', 'Liam', 'Sophia', 'Jackson', 'Ava', 'Lucas', 'Isabella', 'Mateo', 'Emma', 'Amelia', 
'Sebastian', 'Aiden', 'Mia', 'Ezra', 'Harper', 'Carter', 'Evelyn', 'Leo', 'Abigail', 'Julian', 'Luna', 'Gabriel', 'Aria', 'Henry', 
'Scarlett', 'Owen', 'Grace', 'Avery', 'Chloe', 'Emma-Jane', 'Ella', 'Ethan', 'Benjamin', 'Lily', 'Madison', 'Mason', 'Zoe', 'Nolan', 
'Aubrey', 'Caleb', 'Elizabeth', 'Isaac', 'Hannah', 'Evan', 'Victoria', 'Sarah', 'John', 'David', 'Michael', 'Samantha', 'Christopher', 
'Emily', 'Nicholas', 'Andrew', 'Jonathan', 'Justin'];

const newAppDescriptions = ['Expense Tracker', 'Fitness Buddy', 'Language Learning', 'Weather App', 'Recipe Finder', 'Mindfulness Meditation', 
'Travel Planner', 'Sleep Tracker', 'Task Manager', 'Study Planner', 'Podcast Player', 'Budget Planner', 'Digital Sketchbook', 'Mind Mapping', 
'Virtual Garden', 'Home Workout', 'Job Search Assistant', 'Self-Care Reminder', 'Book Recommendation', 'Photography Portfolio', 'Goal Tracker', 
'Period Tracker', 'Random Acts of Kindness', 'Daily Affirmations', 'Virtual Museum Tour', 'Habit Builder', 'Guitar Tuner', 'Live Chat Support', 
'Plant Identification', 'Car Maintenance Tracker', 'Public Speaking Coach', 'Joke Generator', 'DIY Crafts Ideas', 'Language Translator', 'Sudoku Solver', 
'Sleepy Time Stories', 'Healthy Recipes', 'Movie Reviewer', 'Puzzle Solver', 'Home Renovation Planner', 'Digital Cookbook', 'Travel Journal', 'Virtual Pet', 
'Astrology Guide', 'Flashcard Maker', 'Local Events Finder', 'Time Zone Converter', 'Daily Journal', 'Virtual Fashion Stylist', 'Chess Companion', 'Party Planner', 
'Memory Game', 'Music Playlist Curator', 'Virtual Interior Designer', 'Carb Counter'];

const newTags = ['html', 'css', 'javascript', 'typescript', 'go', 'cpp', 'python', 'rust', 'React', 'React Native', 'NextJS', 'Tailwind', 'Vue', 'mongodb', 'sql'];

// Array to store generated users
const users = [];

// Function to get a random item from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to get a random full name by combining two random names
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random applications with specified attributes
const selectRandomApp = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      // Randomly determine if the application is published
      published: Math.random() < 0.5,
      // Get a random application description
      description: getRandomArrItem(appDescriptions),
      // Randomly determine if the build was successful
      buildSuccess: Math.random() < 0.5,
      // Get an array of random application tags
      tags: [...getApplicationTags(3)],
    });
  }
  return results;
};

// Function to create an array of random application tags
const getApplicationTags = (int) => {
  // If only one tag is requested, return a single random tag
  if (int === 1) {
    return getRandomArrItem(possibleTags);
  }
  
  const results = [];
  for (let i = 0; i < int; i++) {
    // Create an object with tagBody and username properties
    results.push({
      tagBody: getRandomArrItem(possibleTags),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, selectRandomApp };
