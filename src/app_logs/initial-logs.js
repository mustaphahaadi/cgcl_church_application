import { logSystemUpdate } from "./logger";

// Function to initialize logs
export const initializeLogs = () => {
  // Clear existing logs for demo purposes
  localStorage.removeItem("system-logs");

  // Add some initial logs
  logSystemUpdate("feat", "Initial application setup");
  logSystemUpdate(
    "chore",
    "Updated Navbar component with profile dropdown in mobile view"
  );
  logSystemUpdate("feat", "Added user authentication system");
  logSystemUpdate(
    "bug",
    "Fixed issue with mobile menu not closing on navigation"
  );
  logSystemUpdate("chore", "Implemented system logging functionality");
};
