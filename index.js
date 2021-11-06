const db = require('./db/connection');

// import Prompts/Questions object and methods
const askQuestions = require("./lib/prompts");
// import database query methods
const query = require("./db/queries");

// function to console.log the landing page
const displaySplashScreen = () => console.log(`
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
`);
// function to console.log the succesfull connection to the mysql databse
const displayConnected = () => new Promise((res, rej) => {
    res(console.log(`
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
`));
});

const displayGoodBye = () => {

    console.log(`
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
   \`\\  ;;; \`OOO#####OOOO##\?????/##OOOO#######O####%O@a   
     \,\`;'  \`OOO####OOO######;######OOO###########%O###,    
     .,\\      \`OO####OO"#####;#####"OO##########%oO###O#;   
   ,;;;; \\   .::::OO##OOOaaa###aaaOOO#######',;OO##OOO##;,                                                                                              
  .;;''    \:::.OOaa\`###OO#######OO###'::aOO.:;;OO###OO;::.
  '       .::\.OO####O#::;;;;;;;;;;;;::O#O@OO.::::::::://::
         .:::.O\########O#O::;;;::O#OO#O###@OO.:;;;;;;;;//:,
        .:/;:.OO#\#########OO#OO#OO########@OO.:;;;;;;;;;//:
       .://;;.OO###\##########O#############@OO.:;;;;;;;;//:.
       ;//;;;;.O'//;;;;;;\##################@OO.:;;;;;;;;//:..
      ;//:;;;;:.//;;;;;;;;;#################@OO.:;;;;;;;;;//..
      ;;//:;;;:://;;;;;;;;;################@OO.:/;;;;;;;;;//..
      \`;;;;;:::::::ooOOOoo#\############@OOO.;;//;;;;;;;;;//.o,
      .;,,,.OOOOO############\#######@OOO.;;;//;;;;;;;;;;//;.OO,
     //;;.oO##################@\OOO.;;;;;;;;;;;;;;;;;;;;//;.oO#O,
    //;;;;O##############@OOO=;;;;//;;;;;;;;;;;;;;;;;;;//;.oO##Oo
    //::;;O#########@OOOOO=;;;;;;;//;;;;;;;;;;;;;;;////;.oO####OO
 .n.n.n.n\`;O########@OOOOO=;;;;;;;;;;///;;;;////////';oO########OO
.%%%%%%%%%,;;########@=;;;;=;;;;///////////////':::::::::.a######@
/%%%%%%%%%%.;;;;""""=:://:::::::::::::::::\::::::::::::://:.####@'
/%%%%%%%%%//.;'     =:://:::::::::::::::::::\::::::::::://:.###@'
 /%%%%%%%%//'        =:://::::::::;:::::::::::\:::::::://:.##@'
  /%%%%%%/             =:://:::;;:::::::::::::::\::::::::'
    ''''                 ''''''   ''''''''''''''''\''''
                    \
`);
};

const makeConnection = () => {
    return new Promise((res, rej) => {
        db.connect(err => {
            if (err) console.log(err);
            console.clear();
            displayConnected();
            res("success");
        });
    });
};

const mainLoop = () => {
    askQuestions()
        .then(response => {
            console.clear();

            //VIEW TABLES
            if (response.primary.match(/View/)) {
                if (response.primary.match(/Department/)) {
                    query.viewDepartments(db).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Role/)) {
                    query.viewRoles(db).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Employee/)) {
                    query.viewEmployees(db).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                }
            }
            //ADD to TABLES
            else if (response.primary.match(/Add/)) {
                if (response.primary.match(/Department/)) {
                    query.addDepartment(db, response.departmentName).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Role/)) {
                    query.addRole(db, response).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                } else if (response.primary.match(/Employee/)) {
                    query.addEmployee(db, response).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                }
            }
            //UPDATE TABLES
            else if (response.primary.match(/Update/)) {
                if (response.primary.match(/Department/));
                //else if (response.primary.match(/Role/));
                else if (response.primary.match(/Employee/)) {
                    query.updateEmployeeRole(db, { roleID: 5, employeeID: 10 }).then(() => mainLoop()).catch((err) => {
                        console.log(err);
                        process.exit();
                    });
                }
            }

            if (response.primary === "Exit") {
                displayGoodBye();
                process.exit();
            }
        });
}

console.clear();
displaySplashScreen();

makeConnection()
    .then(() => mainLoop())
    .catch(err => console.log(err));