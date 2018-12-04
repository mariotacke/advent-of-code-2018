class Guard {
  constructor (id) {
    this.id = id;
    this.minutesAsleep = Array.from({ length: 60 }).map(() => 0);
    this.fellAsleepAt = null;
  }

  sleep (fellAsleepAt) {
    this.fellAsleepAt = fellAsleepAt;
  }

  awake (awokeAt) {
    for (let i = this.fellAsleepAt; i < awokeAt; i++) {
      this.minutesAsleep[i] += 1;
    }
  }

  get totalSleepMinutes () {
    return this.minutesAsleep.reduce((a, b) => a + b, 0);
  }

  get sleepiestMinute () {
    return this.minutesAsleep
      .map((value, index) => ({ index, value }))
      .sort((a, b) => b.value - a.value)[0].index;
  }
}

const sleep = (input) => {
  const guards = {};
  const schedule = input
    .split('\n')
    .map((x) => x.trim())
    .sort()
    .map((x) => {
      const parts = x.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);

      return {
        minute: +parts[5],
        message: parts[6],
      };
    });

  let currentGuard = null;

  for (let i = 0; i < schedule.length; i++) {
    const { message, minute } = schedule[i];

    if (/Guard/.test(message)) {
      const parts = message.match(/Guard #(\d+) begins shift/);
      const guardId = +parts[1];
      const guard = guards[guardId] ? guards[guardId] : new Guard(guardId);

      currentGuard = guards[guardId] = guard;
    } else if (message === 'falls asleep') {
      currentGuard.sleep(minute);
    } else if (message === 'wakes up') {
      currentGuard.awake(minute);
    }
  }

  const sleepiestGuard = Object
    .keys(guards)
    .map((guardId) => guards[guardId])
    .sort((a, b) => b.totalSleepMinutes - a.totalSleepMinutes)[0];

  return sleepiestGuard.id * sleepiestGuard.sleepiestMinute;
};

module.exports = sleep;
