// Get references to HTML elements
const form = document.getElementById('checkInForm');
const attendeeNameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greeting = document.getElementById('greeting');
const attendeeCount = document.getElementById('attendeeCount');
const progressBar = document.getElementById('progressBar');
const waterCount = document.getElementById('waterCount');
const zeroCount = document.getElementById('zeroCount');
const powerCount = document.getElementById('powerCount');

// Set up our counters
let totalAttendees = 0;
let waterTeam = 0;
let zeroTeam = 0;
let powerTeam = 0;
const goal = 50;

// Listen for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the values from the form
  const name = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  // Don't do anything if name is empty
  if (!name) return;

  // Increase total count
  totalAttendees++;

  // Update the correct team count
  if (team === 'water') {
    waterTeam++;
    waterCount.textContent = waterTeam;
  } else if (team === 'zero') {
    zeroTeam++;
    zeroCount.textContent = zeroTeam;
  } else if (team === 'power') {
    powerTeam++;
    powerCount.textContent = powerTeam;
  }

  // Update total attendee count on page
  attendeeCount.textContent = totalAttendees;

  // Update progress bar
  const progress = (totalAttendees / goal) * 100;
  progressBar.style.width = progress + '%';

  // Show personalized greeting
  greeting.style.display = 'block';
  greeting.className = 'success-message';
  greeting.textContent = '👋 Welcome, ' + name + '! Thanks for joining ' + getTeamName(team) + '!';

  // Clear the form
  attendeeNameInput.value = '';
  teamSelect.value = '';

  // Check if goal is reached
  if (totalAttendees >= goal) {
    greeting.textContent = '🎉 Goal reached! Amazing turnout! ' + getWinningTeam() + ' is leading!';
  }
});

// Helper function to get team display name
function getTeamName(team) {
  if (team === 'water') return '🌊 Team Water Wise';
  if (team === 'zero') return '🌿 Team Net Zero';
  if (team === 'power') return '⚡ Team Renewables';
}

// Helper function to find winning team
function getWinningTeam() {
  if (waterTeam >= zeroTeam && waterTeam >= powerTeam) return '🌊 Team Water Wise';
  if (zeroTeam >= waterTeam && zeroTeam >= powerTeam) return '🌿 Team Net Zero';
  return '⚡ Team Renewables';
}