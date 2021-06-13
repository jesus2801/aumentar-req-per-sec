module.exports.waitCustomTime = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

module.exports.getUsers = () => [
  { id: 0, name: 'Jesus' },
  { id: 1, name: 'Miguel' },
  { id: 2, name: 'Juan' },
];
