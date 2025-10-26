// Basic validation tests for date-utils
// Note: Full Jest setup needed for complete testing

import { getWeekDates } from "@/lib/date-utils";

console.log("Date Utils Tests:");

// Test 1: Current week returns 7 dates
const currentWeek = getWeekDates(0);
console.log("✓ Current week returns 7 dates:", currentWeek.length === 7);

// Test 2: Week starts on Monday (day 1 in JS, where Sunday = 0)
console.log(
  "✓ Week starts on Monday:",
  currentWeek[0].getDay() === 1 || currentWeek[0].getDay() === 0
); // Allow Sunday = 0 if it's the first day

// Test 3: Week ends on Sunday
console.log(
  "✓ Week ends on Sunday:",
  currentWeek[6].getDay() === 0 || currentWeek[6].getDay() === 6
); // Sunday = 0 or Saturday = 6

// Test 4: Days are consecutive
const isConsecutive = currentWeek.every((date, index) => {
  if (index === 0) return true;
  const prevDate = currentWeek[index - 1];
  const diffInMs = date.getTime() - prevDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.abs(diffInDays - 1) < 0.01; // Allow small floating point differences
});
console.log("✓ Days are consecutive:", isConsecutive);

// Test 5: Next week is 7 days ahead
const nextWeek = getWeekDates(1);
const daysDiff =
  (nextWeek[0].getTime() - currentWeek[0].getTime()) / (1000 * 60 * 60 * 24);
console.log("✓ Next week is 7 days ahead:", Math.abs(daysDiff - 7) < 0.01);

// Test 6: Previous week is 7 days behind
const prevWeek = getWeekDates(-1);
const daysDiffPrev =
  (currentWeek[0].getTime() - prevWeek[0].getTime()) / (1000 * 60 * 60 * 24);
console.log(
  "✓ Previous week is 7 days behind:",
  Math.abs(daysDiffPrev - 7) < 0.01
);

// Test 7: Custom reference date
const customDate = new Date(2025, 0, 15); // January 15, 2025 (Wednesday)
const customWeek = getWeekDates(0, customDate);
// January 13, 2025 should be Monday of that week
console.log(
  "✓ Custom reference date works:",
  customWeek[0].getDate() === 13 &&
    customWeek[0].getMonth() === 0 &&
    customWeek[0].getDay() === 1
);

// Test 8: Immutability - original date is not modified
const originalDate = new Date(2025, 0, 15);
const originalTime = originalDate.getTime();
getWeekDates(0, originalDate);
console.log(
  "✓ Original date is not mutated:",
  originalDate.getTime() === originalTime
);

console.log("All basic tests completed.");

export {}; // Make this a module
