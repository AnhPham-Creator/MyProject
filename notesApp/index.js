const readline = require('readline');
const menu = [
    '1. show all notes \n',
    '2. add notes new \n',
    '3. edit notes \n',
    '4. delete notes \n',
    '5. Exit'
]
var notes = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showmenu() {
    console.log(menu.join(''));
    rl.question('what your choose ? \n', (number) => {
        switch(number) {
            case '1':
                shownotes();
                break;
            case '2': 
                addnote();
                break;
            case '3':
                editnote();
                break;
            case '4':
                deletenote();
                break;
            default:
                rl.close();
                break;
        }
        //rl.close();
    });
}

function run() {
        showmenu();
}

function _isEmty() {
    if(!notes.length) {
        return true;
    }
    return false;
}

function print() {
    if(_isEmty()) {      
        console.log('list note empty');
        return;
    }
    console.log('-------------------List Note-------------------');
    notes.forEach( e => console.log(e) );
    console.log('----------------------End----------------------');
}
function shownotes() {
    print();
    showmenu();
}

function addnote() {
    rl.question('input contet note ? ', (content) => {
        let idnew = 0;
        if(notes.length > 0) {
             idnew = notes[notes.length - 1].id + 1;
        }
        
        let newNote = { id: idnew, content: content };
        notes.push(newNote);
        console.log('add note success');
        showmenu();
    });
}

function editnote() {
    if(_isEmty()) {
        console.log('list note empty');
        showmenu();
        return;
    }
    print();
    rl.question('choose id note want edit?', (id) => {
        rl.question('input content note new', (newContent) => {
            //let noteUpdate = { id: id, contet: newContent };
            let index = notes.indexOf(notes.find( (e) => e.id === parseInt(id) ))
            notes[index].content = newContent;
            console.log('edit note success!');
            showmenu();
        });
    });
}

function deletenote(){
    if(_isEmty()) {
        console.log('list note empty');
        showmenu();
        return;
    }
    rl.question('choose id note want delete?', (id) => {
        let index = notes.indexOf(notes.find( (e) => e.id === parseInt(id) ));
        notes.splice(index,1);
        console.log('delete note success');
        showmenu();
    });
}

rl.on('close', function() {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});
run();
// const prompt = require('prompt');

// prompt.start();

// prompt.get(['username', 'email'], function (err, result) {
//     if (err) { return onErr(err); }
//     console.log('Command-line input received:');
//     console.log('  Username: ' + result.username);
//     console.log('  Email: ' + result.email);
// });

// function onErr(err) {
//     console.log(err);
//     return 1;
// }