/**
 * Get the user's timezone
 * @returns {string} The timezone string (e.g., "Asia/Karachi", "America/New_York")
 */
export const getTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.error('Failed to get timezone:', error);
    return 'UTC'; // Fallback to UTC if unable to determine
  }
};

/**
 * Get timezone object with formatted information
 * @returns {Object} Object containing timezone and offset information
 */
export const getTimeZoneInfo = () => {
  const timeZone = getTimeZone();
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const timeString = parts.map((p) => p.value).join('');

  return {
    timeZone,
    currentTime: timeString,
    timestamp: now.getTime(),
  };
};
