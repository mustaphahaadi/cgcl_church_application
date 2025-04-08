/**
 * Utility for logging system updates
 */

// Function to format the current date and time
const getFormattedDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  return `[${date}:${time}]`;
};

/**
 * Log system updates to localStorage and console
 * @param {string} type - The type of update (chore, bug, feat)
 * @param {string} message - The message to log
 */
export const logSystemUpdate = (type, message) => {
  // Create timestamp
  const timestamp = getFormattedDateTime();

  // Format the log entry
  const logEntry = `${timestamp} [${type}] ${message}`;

  // Log to console
  console.log(`System Log: ${logEntry}`);

  // Store in localStorage
  const logs = JSON.parse(localStorage.getItem("system-logs") || "[]");
  logs.push(logEntry);
  localStorage.setItem("system-logs", JSON.stringify(logs));

  // In a real application with a backend, you would send this to your server
  // to be written to a file
};

/**
 * Get all system logs
 * @returns {Array} Array of log entries
 */
export const getSystemLogs = () => {
  return JSON.parse(localStorage.getItem("system-logs") || "[]");
};

/**
 * Export logs to a file
 */
export const exportLogs = () => {
  const logs = getSystemLogs();
  const content = logs.join("\n");

  // Create a blob with the logs
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Create a link to download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = "system-update.log";
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
