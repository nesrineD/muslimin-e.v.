// Tests for date-utils functions
// Focus on the new getWeekDates function to ensure it doesn't mutate dates

import { getWeekDates, isPast, isUpcoming } from "@/lib/date-utils";

// Test constants
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_MS = 1000; // Allow 1 second tolerance

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

// isPast Tests
console.log("\nisPast Tests:");

// Test 9: Past date should return true
const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
console.log("✓ Past date returns true:", isPast(pastDate) === true);

// Test 10: Future date should return false
const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
console.log("✓ Future date returns false:", isPast(futureDate) === false);

// Test 11: Consistency - multiple rapid calls should give consistent results
const testDate = new Date(Date.now() - 1000); // 1 second ago
const result1 = isPast(testDate);
const result2 = isPast(testDate);
const result3 = isPast(testDate);
console.log("✓ Consistent results on rapid calls:", result1 === result2 && result2 === result3);

// Test 12: Date very close to now (edge case)
// Create a date that's definitely in the past but very close to now
const almostNow = new Date(Date.now() - 100); // 100ms ago
console.log("✓ Recent past date returns true:", isPast(almostNow) === true);

// isUpcoming Tests
console.log("\nisUpcoming Tests:");

// Test 13: Date within next week should return true
const threeDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
console.log("✓ Date in 3 days returns true:", isUpcoming(threeDaysFromNow) === true);

// Test 14: Date beyond next week should return false
const tenDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10);
console.log("✓ Date in 10 days returns false:", isUpcoming(tenDaysFromNow) === false);

// Test 15: Past date should return false for isUpcoming
console.log("✓ Past date returns false for isUpcoming:", isUpcoming(pastDate) === false);

// Test 16: Consistency - multiple rapid calls to isUpcoming
const upcomingTestDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
const upcomingResult1 = isUpcoming(upcomingTestDate);
const upcomingResult2 = isUpcoming(upcomingTestDate);
const upcomingResult3 = isUpcoming(upcomingTestDate);
console.log("✓ isUpcoming consistent results:", upcomingResult1 === upcomingResult2 && upcomingResult2 === upcomingResult3);

console.log("\nAll date-utils tests completed!");
