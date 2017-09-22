if (process.argv.length == 2) {
  console.error("Usage: node pets.js [read | create | update | destroy]");
} else {
  const fs = require('fs');
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    let myData = JSON.parse(data);
    if (process.argv[2] == 'read') {
      if (process.argv.length == 3) {
        console.log(myData);
      } else if (process.argv.length == 4 && process.argv[3] < myData.length && process.argv[3] >= 0) {
        console.log(myData[process.argv[3]]);
      } else {
        console.error('Usage: node pets.js read INDEX');
      }
    }
    if (process.argv[2] == 'create') {
      if (process.argv.length !== 6) {
        console.error('Usage: node pets.js create AGE KIND NAME');
      } else {
        if (!Number.isInteger(parseInt(process.argv[3]))) {
          console.error('Age must be a Number!');
        } else {
          myData.push({
            age: parseInt(process.argv[3]),
            kind: process.argv[4],
            name: process.argv[5]
          });
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    if (process.argv[2] == 'update') {
      if (process.argv.length !== 7){
        console.error('Usage: node pets.js update INDEX AGE KIND NAME');
      }
      else{
        if (!Number.isInteger(parseInt(process.argv[4]))) {
          console.error('Age must be a Number!');
        } else {
          myData[process.argv[3]].age = parseInt(process.argv[4]);
          myData[process.argv[3]].kind = process.argv[5];
          myData[process.argv[3]].name = process.argv[6];
          console.log(myData[process.argv[3]]);
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    if (process.argv[2] == 'destroy'){
      if (process.argv.length !== 4){
        console.error('Usage: node pets.js destroy INDEX');
      } else {
        console.log(myData[process.argv[3]]);
        myData.splice(process.argv[3],1);
        let newData = JSON.stringify(myData);
        fs.writeFile('./pets.json', newData, (err) => {});
      }
    }
  });
}
