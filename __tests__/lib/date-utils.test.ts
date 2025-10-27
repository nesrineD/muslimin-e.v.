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

describe("Date Utils", () => {
  describe("getWeekDates", () => {
    it("should return 7 dates", () => {
      const weekDates = getWeekDates(0);
      expect(weekDates).toHaveLength(7);
    });

    it("should start week on Monday", () => {
      const weekDates = getWeekDates(0);
      const firstDate = weekDates[0];
      const dayOfWeek = firstDate.getDay();
      expect(dayOfWeek).toBe(1);
    });

    it("should end week on Sunday", () => {
      const weekDates = getWeekDates(0);
      const lastDate = weekDates[6];
      const lastDayOfWeek = lastDate.getDay();
      expect(lastDayOfWeek).toBe(0);
    });

    it("should have consecutive dates", () => {
      const weekDates = getWeekDates(0);
      for (let i = 0; i < weekDates.length - 1; i++) {
        const diff = weekDates[i + 1].getTime() - weekDates[i].getTime();
        expect(Math.abs(diff - ONE_DAY_MS)).toBeLessThan(TOLERANCE_MS);
      }
    });

    it("should not mutate original Date object", () => {
      const beforeTest = new Date();
      const beforeTime = beforeTest.getTime();
      getWeekDates(0);
      const afterTime = beforeTest.getTime();
      expect(beforeTime).toBe(afterTime);
    });

    it("should handle week offset correctly", () => {
      const currentWeek = getWeekDates(0);
      const nextWeek = getWeekDates(1);
      const prevWeek = getWeekDates(-1);

      const weekDiff = (nextWeek[0].getTime() - currentWeek[0].getTime()) / (1000 * 60 * 60 * 24);
      const weekDiffPrev = (currentWeek[0].getTime() - prevWeek[0].getTime()) / (1000 * 60 * 60 * 24);

      expect(Math.abs(weekDiff - 7)).toBeLessThan(0.1);
      expect(Math.abs(weekDiffPrev - 7)).toBeLessThan(0.1);
    });

    it("should return new Date objects on each call", () => {
      const week1 = getWeekDates(0);
      const week2 = getWeekDates(0);
      expect(week1[0]).not.toBe(week2[0]);
    });

    it("should return equivalent dates with same offset", () => {
      const week1 = getWeekDates(0);
      const week2 = getWeekDates(0);
      const isSameWeek = week1.every((date, index) => 
        formatDate(date) === formatDate(week2[index])
      );
      expect(isSameWeek).toBe(true);
    });
  });

  describe("isPast", () => {
    it("should return true for past date", () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
      expect(isPast(pastDate)).toBe(true);
    });

    it("should return false for future date", () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
      expect(isPast(futureDate)).toBe(false);
    });

    it("should return consistent results on rapid calls", () => {
      const testDate = new Date(Date.now() - 1000); // 1 second ago
      const result1 = isPast(testDate);
      const result2 = isPast(testDate);
      const result3 = isPast(testDate);
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    it("should return true for recent past date", () => {
      const almostNow = new Date(Date.now() - 100); // 100ms ago
      expect(isPast(almostNow)).toBe(true);
    });
  });

  describe("isUpcoming", () => {
    it("should return true for date within next week", () => {
      const threeDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
      expect(isUpcoming(threeDaysFromNow)).toBe(true);
    });

    it("should return false for date beyond next week", () => {
      const tenDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10);
      expect(isUpcoming(tenDaysFromNow)).toBe(false);
    });

    it("should return false for past date", () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      expect(isUpcoming(pastDate)).toBe(false);
    });

    it("should return consistent results on rapid calls", () => {
      const upcomingTestDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
      const upcomingResult1 = isUpcoming(upcomingTestDate);
      const upcomingResult2 = isUpcoming(upcomingTestDate);
      const upcomingResult3 = isUpcoming(upcomingTestDate);
      expect(upcomingResult1).toBe(upcomingResult2);
      expect(upcomingResult2).toBe(upcomingResult3);
    });
  });
});

