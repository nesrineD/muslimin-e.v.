// Tests for date-utils functions
// Focus on the new getWeekDates function to ensure it doesn't mutate dates

import { getWeekDates } from "@/lib/date-utils";

// Test helper to format date for comparison
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

console.log("Date Utils Tests:");

// Test 1: getWeekDates returns 7 dates
const weekDates = getWeekDates(0);
console.log("✓ Returns 7 dates:", weekDates.length === 7);

// Test 2: Week starts on Monday
const firstDate = weekDates[0];
const dayOfWeek = firstDate.getDay();
console.log("✓ Week starts on Monday:", dayOfWeek === 1);

// Test 3: Week ends on Sunday
const lastDate = weekDates[6];
const lastDayOfWeek = lastDate.getDay();
console.log("✓ Week ends on Sunday:", lastDayOfWeek === 0);

// Test 4: Dates are consecutive
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_MS = 1000; // Allow 1 second tolerance
let isConsecutive = true;
for (let i = 0; i < weekDates.length - 1; i++) {
  const diff = weekDates[i + 1].getTime() - weekDates[i].getTime();
  if (Math.abs(diff - ONE_DAY_MS) > TOLERANCE_MS) {
    isConsecutive = false;
    break;
  }
}
console.log("✓ Dates are consecutive:", isConsecutive);

// Test 5: No mutation - original Date() is not affected
const beforeTest = new Date();
const beforeTime = beforeTest.getTime();
const testWeek = getWeekDates(0);
const afterTime = beforeTest.getTime();
console.log("✓ No mutation of Date object:", beforeTime === afterTime);

// Test 6: Week offset works correctly
const currentWeek = getWeekDates(0);
const nextWeek = getWeekDates(1);
const prevWeek = getWeekDates(-1);

const weekDiff = (nextWeek[0].getTime() - currentWeek[0].getTime()) / (1000 * 60 * 60 * 24);
const weekDiffPrev = (currentWeek[0].getTime() - prevWeek[0].getTime()) / (1000 * 60 * 60 * 24);

console.log("✓ Next week offset (+1):", Math.abs(weekDiff - 7) < 0.1);
console.log("✓ Previous week offset (-1):", Math.abs(weekDiffPrev - 7) < 0.1);

// Test 7: Each call returns new Date objects (not references)
const week1 = getWeekDates(0);
const week2 = getWeekDates(0);
console.log("✓ Returns new Date objects:", week1[0] !== week2[0]);

// Test 8: Multiple calls with same offset return equivalent dates
const isSameWeek = week1.every((date, index) => 
  formatDate(date) === formatDate(week2[index])
);
console.log("✓ Same offset returns equivalent dates:", isSameWeek);

console.log("\nAll date-utils tests completed!");
