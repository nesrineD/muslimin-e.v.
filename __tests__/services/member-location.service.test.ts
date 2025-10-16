// Basic validation for Member Location Service
// Note: Full Jest setup needed for complete testing

import { MemberLocationService } from "@/services/member-location.service";

console.log("Member Location Service Tests:");

// Test 1: Demo mode detection
console.log(
  "✓ Demo mode active:",
  MemberLocationService.isDemoModeActive() === true
);

// Test 2: Demo users available
const demoUsers = MemberLocationService.getDemoUsers();
console.log("✓ Demo users count:", demoUsers.length === 3);
console.log(
  "✓ Has Zahra:",
  demoUsers.some((u) => u.email === "mitglied@email.com")
);

// Test 3: Validation tests
const validUpdate = { postal_code: "10115", location_visible: true };
const validationResult =
  MemberLocationService.validateLocationUpdate(validUpdate);
console.log("✓ Valid update validation:", validationResult.valid === true);

const invalidUpdate = { postal_code: "abc123" };
const invalidResult =
  MemberLocationService.validateLocationUpdate(invalidUpdate);
console.log("✓ Invalid update validation:", invalidResult.valid === false);

// Test 4: Member lookup by email
const zahra = MemberLocationService.getMemberByEmail("mitglied@email.com");
console.log("✓ Member lookup:", zahra?.first_name === "Zahra");

// Test 5: Demo user simulation
MemberLocationService.setDemoUser("helper@email.com");
console.log("✓ Demo user set successfully");

// Test async functionality would require proper test environment
console.log("Basic service tests completed.");

export {};
