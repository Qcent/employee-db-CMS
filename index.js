const db = require('./db/connection');

// this package can wrap text in a box/border
const box = require('ascii-box').box;

/* This code will capture the stdout ie console.log() so that I can wrap a border around */
/** */
var StdOutFixture = require('fixture-stdout');
var fixture = new StdOutFixture();

// Keep track of writes so we can check them later..
//var _writes = [];
let outputStr = '';

const captureConsole = () => {
        // Capture a write to stdout
        fixture.capture(function onWrite(string, encoding, fd) {
            outputStr += string;
            /* _writes.push({
                 string: string,
                 encoding: encoding,
                 fd: fd
             });*/
            // If you return `false`, you'll prevent the write to the original stream (useful for preventing log output during tests.)
            return false;
        });
    }
    /*** */
    /* END OF STDOUT CAPTURE */


// import Prompts/Questions object and methods
const askQuestions = require("./lib/prompts");
// import database query methods
const query = require("./db/queries");

// define empty lists of departments/roles/employees
// to use in inquirer prompts
let employeeList = [];
let managerList = [];
let roleList = [];
let departmentList = [];

// function to console.log the landing page
const displaySplashScreen = () => console.log(box(`
                     .,,uod8B8bou,,.
             ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗   
         !.......:!?|||||!!^^""'            ||||        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝   
         !.........||||                     ||||        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
         !.........||||  Welcome            ||||        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
         !.........||||    User             ||||        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
         !.........||||                     ||||        ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
         !.........||||   Connecting        ||||
         !.........||||      to Database... ||||    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗
         \`.........||||                    ,||||    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
          .;.......||||               _.-!!|||||    ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
   .,uodWBBBBb.....||||       _.-!!|||||||||!:'     ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║ 
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     \`.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"\`;:::       \`.         ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
\`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo. ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗
  \`..........:::::::::::::::::::::::;iof688888888888b.     \`YBBBP^ ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝
    \`........::::::::::::::::;iof688888888888888888888b.     \`     ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
      \`......:::::::::;iof688888888888888888888888888888b.         ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
        \`....:::;iof688888888888888888888888888888888899fT!  
          \`..::!8888888888888888888888888888888899fT|!^"'   
            \`' !!988888888888888888888888899fT|!^"' 
              \`!!8888888888888888899fT|!^"'
                \`!988888888899fT|!^"'
                  \`!9899fT|!^"'
                    \`!^"'
`, {
    border: 'single-double',
    color: 'red',
    minWidth: 153,
    maxWidth: 153
}));
// function to console.log the succesfull connection to the mysql databse
const displayConnected = () => console.log(box(`
                     .,,uod8B8bou,,.
             ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗   
         !.......:!?|||||!!^^""'            ||||        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝   
         !.........||||                     ||||        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
         !.........||||  Database           ||||        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
         !.........||||    Connected :)     ||||        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
         !.........||||                     ||||        ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
         !.........||||                     ||||
         !.........||||                     ||||    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗
         \`.........||||                    ,||||    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
          .;.......||||               _.-!!|||||    ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
   .,uodWBBBBb.....||||       _.-!!|||||||||!:'     ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║ 
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     \`.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"\`;:::       \`.         ██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
\`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo. ██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗
  \`..........:::::::::::::::::::::::;iof688888888888b.     \`YBBBP^ ██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝
    \`........::::::::::::::::;iof688888888888888888888b.     \`     ██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
      \`......:::::::::;iof688888888888888888888888888888b.         ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
        \`....:::;iof688888888888888888888888888888888899fT!  
          \`..::!8888888888888888888888888888888899fT|!^"'   
            \`' !!988888888888888888888888899fT|!^"' 
              \`!!8888888888888888899fT|!^"'
                \`!988888888899fT|!^"'
                  \`!9899fT|!^"'
                    \`!^"'
`, {
    border: 'round',
    color: 'green',
    padding: 4,
    minWidth: 153,
    maxWidth: 153
}));

// function that console.logs the exit screen
const displayGoodBye = () => {
    console.clear();
    console.log(box(`
                                     .,;;;;;;;,.
                                   ,;;;;;;;,/;;;;
                  .,aa###########@a;;;;;/;;;,//;;;
         ..,,,.,aa##################@a;//;;;,//;;;
      ,;;;;;;;O#####OO##############OOO###a,/;;;;'
    .;;//,;;;O####OOO##########OOO####OOO#####a'
   .;;/,;;/;OO##OO#######################OOO####.
   ;;;/,;;//OO#######OOO###########OOO###########.          ██████╗  ██████╗  ██████╗ ██████╗     ██████╗ ██╗   ██╗███████╗██╗
   \`;;//,;,OOO#########OO#########OO##############.        ██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗    ██╔══██╗╚██╗ ██╔╝██╔════╝██║
  ;. \`\`\`\`\`\`OOO#####;;;;;;OO#####OO;;;;;;######O####.       ██║  ███╗██║   ██║██║   ██║██║  ██║    ██████╔╝ ╚████╔╝ █████╗  ██║
.;;,       OOO###O;;' ~\`;##OOOOO##;' ~\`;;O#####OO###       ██║   ██║██║   ██║██║   ██║██║  ██║    ██╔══██╗  ╚██╔╝  ██╔══╝  ╚═╝
;;;;    ,  OOO##O;;;,.,;O#########O;,.,;;;O####OO###,      ╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝    ██████╔╝   ██║   ███████╗██╗
\`;;'   ,;; OOO##OO;;;;OOO(???????)OOO;;;;OO####OO###%,      ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝     ╚═════╝    ╚═╝   ╚══════╝╚═╝
   \`\\  ;;; \`OOO#####OOOO##\\?????/##OOOO#######O####%O@a   
     \\,\`;'  \`OOO####OOO######;######OOO###########%O###,    
     .,\\      \`OO####OO"#####;#####"OO##########%oO###O#;   
   ,;;;; \\   .::::OO##OOOaaa###aaaOOO#######',;OO##OOO##;,
  .;;''    \\:::.OOaa\`###OO#######OO###'::aOO.:;;OO###OO;::.
  '       .::\\.OO####O#::;;;;;;;;;;;;::O#O@OO.::::::::://::
         .:::.O\\########O#O::;;;::O#OO#O###@OO.:;;;;;;;;//:,
        .:/;:.OO#\\#########OO#OO#OO########@OO.:;;;;;;;;;//:
       .://;;.OO###\\##########O#############@OO.:;;;;;;;;//:.
       ;//;;;;.O'//;;;;;;\\##################@OO.:;;;;;;;;//:..
      ;//:;;;;:.//;;;;;;;;;#################@OO.:;;;;;;;;;//..
      ;;//:;;;:://;;;;;;;;;################@OO.:/;;;;;;;;;//..
      \`;;;;;:::::::ooOOOoo#\\############@OOO.;;//;;;;;;;;;//.o,
      .;,,,.OOOOO############\\#######@OOO.;;;//;;;;;;;;;;//;.OO,
     //;;.oO##################@\\OOO.;;;;;;;;;;;;;;;;;;;;//;.oO#O,
    //;;;;O##############@OOO=;;;;//;;;;;;;;;;;;;;;;;;;//;.oO##Oo
    //::;;O#########@OOOOO=;;;;;;;//;;;;;;;;;;;;;;;////;.oO####OO
 .n.n.n.n\`;O########@OOOOO=;;;;;;;;;;///;;;;////////';oO########OO
.%%%%%%%%%,;;########@=;;;;=;;;;///////////////':::::::::.a######@
/%%%%%%%%%%.;;;;""""=:://:::::::::::::::::\\::::::::::::://:.####@'
/%%%%%%%%%//.;'     =:://:::::::::::::::::::\\::::::::::://:.###@'
 /%%%%%%%%//'        =:://::::::::;:::::::::::\\:::::::://:.##@'
  /%%%%%%/             =:://:::;;:::::::::::::::\\::::::::'
    ''''                 ''''''   ''''''''''''''''\\''''
                                                    \\
`, {
        border: 'round',
        color: 'cyan',
        minWidth: 122,
        maxWidth: 150
    }));
};
// a Promise that resolves when successfully connected to the database
const makeConnection = () => {
    return new Promise((res, rej) => {
        db.connect(err => {
            if (err) {
                rej(err);
                return;
            }
            console.clear();
            displayConnected();
            res("success");
        });
    });
};

//the Main Loop that generates all table lists then prompts the user for functionality
const mainLoop = () => {
    // this chunck of code handles the boxing of the captured console.logs
    if (outputStr.length) {
        fixture.release();
        console.clear();
        console.log(box(outputStr, {
            color: 'grey',
            maxWidth: 122
        }));
        outputStr = '';
    }


    /* GET LISTS OF TABLES */
    query.getListOfEmployees(db)
        .then(eList => {
            employeeList = [];
            // create an employee list for inquirer choices
            eList.forEach(obj => {
                employeeList.push({ name: obj.full_name, value: obj.id, job: obj.job });
            });
            // create a manager list rom
            managerList = employeeList.filter(worker => {
                if (worker.job) {
                    if (worker.job.match(/manager/i)) return true;
                };
                return false;
            });
            managerList.push({ name: "(None)", value: null, job: null })
        })
        .then(() => query.getListOfRoles(db))
        .then((rList) => {
            roleList = [];
            // create a role list for inquirer choices
            rList.forEach(obj => {
                roleList.push({ name: obj.title + " : " + obj.department, value: obj.id });
            });
        })
        .then(() => query.getListOfDepartments(db))
        .then((dList) => {
            departmentList = [];
            // create a department list for inquirer choices
            dList.forEach(obj => {
                departmentList.push({ name: obj.name, value: obj.id });
            });
        })
        /* END OF LIST GETTING */

    .then(() => askQuestions(employeeList, roleList, departmentList, managerList))
        .then(response => {

            captureConsole();

            //VIEW TABLES
            if (response.primary.match(/View/)) {
                if (response.primary.match(/Departments/)) {
                    query.viewDepartments(db).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Role/)) {
                    query.viewRoles(db).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Employee/)) {
                    if (response.primary.match(/Manager/)) {
                        query.viewEmployeesByManager(db, response.managerID).then(() => mainLoop()).catch((err) => {
                            fixture.release();
                            console.log(err);
                            process.exit();
                        });
                    } else if (response.primary.match(/Department/)) {
                        query.viewEmployeesByDepartment(db, response.departmentID).then(() => mainLoop()).catch((err) => {
                            fixture.release();
                            console.log(err);
                            process.exit();
                        });
                    } else {
                        query.viewEmployees(db).then(() => mainLoop()).catch((err) => {
                            fixture.release();
                            console.log(err);
                            process.exit();
                        });
                    }
                }
            }
            //ADD to TABLES
            else if (response.primary.match(/Add/)) {
                if (response.primary.match(/Department/)) {
                    query.addDepartment(db, response.departmentName).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Role/)) {
                    query.addRole(db, response).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Employee/)) {
                    query.addEmployee(db, response).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                }
            }
            //UPDATE TABLES
            else if (response.primary.match(/Update/)) {
                if (response.primary.match(/Department/)) {
                    query.updateDepartment(db, response).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Role/)) {
                    query.updateRole(db, response).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Employee/)) {
                    query.updateEmployee(db, response).then(() => mainLoop()).catch((err) => {
                        fixture.release();
                        console.log(err);
                        process.exit();
                    });
                }
            }
            //DELETE TABLE ROWS
            else if (response.primary.match(/Delete/)) {
                query.deleteRow(db, response).then(() => mainLoop()).catch((err) => {
                    fixture.release();
                    console.log(err);
                    process.exit();
                });
            }

            if (response.primary === "Exit") {
                fixture.release();
                displayGoodBye();
                process.exit();
            }
        });
}

console.clear();
displaySplashScreen();

makeConnection()
    .then(() => mainLoop())
    .catch(err => {
        console.log("FATAL ERROR! EXITING PROGRAM!\n" + err);
        process.exit();
    });