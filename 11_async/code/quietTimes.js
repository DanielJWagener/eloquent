function getWeekdayFromNumber(num) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (num >= 0 && num <= 6) {
    return weekdays[num];
  } else {
    return "Invalid number. Please enter a number between 0 and 6.";
  }
}

async function activityTable(day) {
  if (day < 0 || day > 6)
    return new Promise((_, reject) =>
      reject(new Error(`Error: day must be between 0 and 6 (received: ${day})`))
    );
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
  const logFileForDay = logFileList.split("\n").find(logFileName => {
    const date = /\w{4}-\w{2}-\w{2}/.exec(logFileName)[0];
    return new Date(date).getDay() === day;
  });

  if (!logFileForDay)
    throw new Error(`No log file exists for day ${day} (${getWeekdayFromNumber(day)})`);

  const logFileContent = await textFile(logFileForDay);
  const activityByHour = new Array(24).fill(0);
  for (const timeStamp of logFileContent.split("\n")) {
    const hour = new Date(+timeStamp).getHours();
    activityByHour[hour]++;
  }
  return activityByHour;
}

activityTable(1)
  .then(table => console.log(activityGraph(table)))
  .catch(e => {
    console.log(e?.message || e);
  });
