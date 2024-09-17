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
  const logFilesForDay = logFileList.split("\n").filter(logFileName => {
    const date = /\w{4}-\w{2}-\w{2}/.exec(logFileName)[0];
    return new Date(date).getDay() === day;
  });

  if (!logFilesForDay.length)
    throw new Error(`No log files exist for day ${day} (${getWeekdayFromNumber(day)})`);

  console.log(
    `Found ${logFilesForDay.length} file(s) for ${getWeekdayFromNumber(day)}: ${logFilesForDay.join(
      ", "
    )}`
  );

  const activityByHour = new Array(24).fill(0);

  for await (const logFileContent of logFilesForDay.map(x => textFile(x)))
    for (const timeStamp of logFileContent.split("\n")) {
      const hour = new Date(+timeStamp).getHours();
      activityByHour[hour]++;
    }
  return activityByHour;
}

function activityTablePromises(day) {
  if (day < 0 || day > 6)
    return new Promise((_, reject) =>
      reject(new Error(`Error: day must be between 0 and 6 (received: ${day})`))
    );
  return textFile("camera_logs.txt")
    .then(logFileList => {
      const logFilesForDay = logFileList.split("\n").filter(logFileName => {
        const date = /\w{4}-\w{2}-\w{2}/.exec(logFileName)[0];
        return new Date(date).getDay() === day;
      });

      if (!logFilesForDay.length)
        throw new Error(`No log file exists for day ${day} (${getWeekdayFromNumber(day)})`);
      return logFilesForDay;
    })
    .then(logFileNames => {
      console.log(
        `Found ${logFileNames.length} file(s) for ${getWeekdayFromNumber(day)}: ${logFileNames.join(
          ", "
        )}`
      );
      return Promise.all(logFileNames.map(x => textFile(x)));
    })
    .then(contentOfAllLogFiles => {
      const activityByHour = new Array(24).fill(0);
      for (const logFileContent of contentOfAllLogFiles) {
        for (const timeStamp of logFileContent.split("\n")) {
          const hour = new Date(+timeStamp).getHours();
          activityByHour[hour]++;
        }
      }
      return activityByHour;
    });
}

// activityTable(1)
//   .then(table => console.log(activityGraph(table)))
//   .catch(e => {
//     console.log(e?.message || e);
//   });

// activityTablePromises(5)
//   .then(table => console.log(activityGraph(table)))
//   .catch(e => {
//     console.log(e?.message || e);
//   });

function logAll(logger) {
  for (let i = 0; i <= 6; i++) {
    logger(i)
      .then(table => {
        console.log("\n");
        console.log(getWeekdayFromNumber(i));
        console.log(activityGraph(table));
      })
      .catch(e => {
        console.log(e?.message || e);
      });
  }
}

logAll(activityTable);
