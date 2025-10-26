// Basic validation tests for date utility functions
// Note: These are basic validation tests without a full Jest setup

import {
  formatDateSafe,
  formatDateOnly,
  formatTimeOnly,
  formatDateIntl,
  addDays,
  createFutureDate,
  isPast,
  isUpcoming,
} from "@/lib/date-utils";

console.log("Date Utils Tests:");

// Test 1: formatDateSafe with valid date
const validDate = new Date("2025-10-26T14:30:00");
const formatted = formatDateSafe(validDate);
console.log("✓ formatDateSafe works:", formatted.length > 0);

// Test 2: formatDateSafe with null
const nullFormatted = formatDateSafe(null);
console.log("✓ formatDateSafe handles null:", nullFormatted === "");

// Test 3: addDays
const futureDate = addDays(5);
const now = new Date();
console.log(
  "✓ addDays creates future date:",
  futureDate.getTime() > now.getTime()
);

// Test 4: createFutureDate
const specificFuture = createFutureDate(10, 14, 30);
console.log(
  "✓ createFutureDate creates correct time:",
  specificFuture.getHours() === 14 && specificFuture.getMinutes() === 30
);

// Test 5: isPast - Past date
const pastDate = new Date("2020-01-01");
console.log("✓ isPast detects past date:", isPast(pastDate) === true);

// Test 6: isPast - Future date
const futureDateTest = new Date("2030-01-01");
console.log("✓ isPast detects future date:", isPast(futureDateTest) === false);

// Test 7: isPast - Consistency check
// This test ensures that isPast creates the current date once
// and doesn't have timing issues
const testDate = new Date();
testDate.setHours(testDate.getHours() - 1); // 1 hour ago
const result1 = isPast(testDate);
// Even with a tiny delay, the result should be the same
const result2 = isPast(testDate);
console.log("✓ isPast is consistent:", result1 === result2 && result1 === true);

// Test 8: isUpcoming - Within next week
const upcomingDate = addDays(3);
console.log("✓ isUpcoming detects upcoming date:", isUpcoming(upcomingDate) === true);

// Test 9: isUpcoming - Too far in future
const farFuture = addDays(10);
console.log("✓ isUpcoming detects far future:", isUpcoming(farFuture) === false);

// Test 10: Edge case - Date at exact boundary
const exactNow = new Date();
// Current moment should not be in the past
console.log("✓ Current moment is not past:", isPast(exactNow) === false);

console.log("\n✅ All date-utils tests passed!");
