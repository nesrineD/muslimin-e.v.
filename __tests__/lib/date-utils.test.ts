// Tests for date-utils functions
// Focus on the new getWeekDates function to ensure it doesn't mutate dates

import { getWeekDates, isPast, isUpcoming } from "@/lib/date-utils";

// Test constants
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_MS = 1000; // Allow 1 second tolerance

// Test helper to format date for comparison
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

describe("Date Utils", () => {
  describe("getWeekDates", () => {
    it("returns 7 dates", () => {
      const weekDates = getWeekDates(0);
      expect(weekDates.length).toBe(7);
    });

    it("week starts on Monday", () => {
      const weekDates = getWeekDates(0);
      const firstDate = weekDates[0];
      const dayOfWeek = firstDate.getDay();
      expect(dayOfWeek).toBe(1);
    });

    it("week ends on Sunday", () => {
      const weekDates = getWeekDates(0);
      const lastDate = weekDates[6];
      const lastDayOfWeek = lastDate.getDay();
      expect(lastDayOfWeek).toBe(0);
    });

    it("dates are consecutive", () => {
      const weekDates = getWeekDates(0);
      let isConsecutive = true;
      for (let i = 0; i < weekDates.length - 1; i++) {
        const diff = weekDates[i + 1].getTime() - weekDates[i].getTime();
        if (Math.abs(diff - ONE_DAY_MS) > TOLERANCE_MS) {
          isConsecutive = false;
          break;
        }
      }
      expect(isConsecutive).toBe(true);
    });

    it("does not mutate original Date object", () => {
      const beforeTest = new Date();
      const beforeTime = beforeTest.getTime();
      getWeekDates(0);
      const afterTime = beforeTest.getTime();
      expect(beforeTime).toBe(afterTime);
    });

    it("week offset works correctly for next week", () => {
      const currentWeek = getWeekDates(0);
      const nextWeek = getWeekDates(1);
      const weekDiff =
        (nextWeek[0].getTime() - currentWeek[0].getTime()) / (1000 * 60 * 60 * 24);
      expect(Math.abs(weekDiff - 7)).toBeLessThan(0.1);
    });

    it("week offset works correctly for previous week", () => {
      const currentWeek = getWeekDates(0);
      const prevWeek = getWeekDates(-1);
      const weekDiffPrev =
        (currentWeek[0].getTime() - prevWeek[0].getTime()) / (1000 * 60 * 60 * 24);
      expect(Math.abs(weekDiffPrev - 7)).toBeLessThan(0.1);
    });

    it("returns new Date objects (not references)", () => {
      const week1 = getWeekDates(0);
      const week2 = getWeekDates(0);
      expect(week1[0]).not.toBe(week2[0]);
    });

    it("same offset returns equivalent dates", () => {
      const week1 = getWeekDates(0);
      const week2 = getWeekDates(0);
      const isSameWeek = week1.every(
        (date, index) => formatDate(date) === formatDate(week2[index])
      );
      expect(isSameWeek).toBe(true);
    });
  });

  describe("isPast", () => {
    it("returns true for past date", () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
      expect(isPast(pastDate)).toBe(true);
    });

    it("returns false for future date", () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
      expect(isPast(futureDate)).toBe(false);
    });

    it("gives consistent results on rapid calls", () => {
      const testDate = new Date(Date.now() - 1000); // 1 second ago
      const result1 = isPast(testDate);
      const result2 = isPast(testDate);
      const result3 = isPast(testDate);
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    it("returns true for recent past date", () => {
      const almostNow = new Date(Date.now() - 100); // 100ms ago
      expect(isPast(almostNow)).toBe(true);
    });
  });

  describe("isUpcoming", () => {
    it("returns true for date within next week", () => {
      const threeDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
      expect(isUpcoming(threeDaysFromNow)).toBe(true);
    });

    it("returns false for date beyond next week", () => {
      const tenDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10);
      expect(isUpcoming(tenDaysFromNow)).toBe(false);
    });

    it("returns false for past date", () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
      expect(isUpcoming(pastDate)).toBe(false);
    });

    it("gives consistent results on rapid calls", () => {
      const upcomingTestDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
      const result1 = isUpcoming(upcomingTestDate);
      const result2 = isUpcoming(upcomingTestDate);
      const result3 = isUpcoming(upcomingTestDate);
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });
  });
});

