const notesmodel = require('./model/notes_model');
var flag = 'add';
var notes;
async function render() {
    notes = await notesmodel.find();
    var content = notes.map( e => {
      return `<div class='note-content'>
      <p> ${e.content} </p><button style='font-size:16px' onclick="deletenote(${e.id})"><i class='fas fa-trash'></i></button>
      <button style='font-size:16px' onclick="editnote(${e.id})"><i class='far fa-edit'></i></button>
      </div>`
    });
    content = content.join('');
    document.getElementById('content').innerHTML = content;
}

$(() => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/notesapp', {useNewUrlParser: true, useUnifiedTopology: true});
    render();
    document.getElementById('myTextarea').disabled = true;
    document.getElementById('save-note').disabled = true;
    $('#add-note').click(() => {
        alert('add');
        document.getElementById('myTextarea').disabled = false;
        document.getElementById('save-note').disabled = false;
        $('#myTextarea').focus();
    });

    $('#save-note').click(() => {
        alert('save');
        var content = document.getElementById('myTextarea').value;
        var index = document.getElementById('noteId').value;
        addnote(content,index);
        alert('save success!');
        render();
        document.getElementById('myTextarea').disabled = true;
        document.getElementById('save-note').disabled = true;
    });

    // $('#button-delete').click(function() {
    //     let id = this.value;
    //     alert(id);
    //     deletenote(id);
    // });

    // $('#button-edit').click(function() {
    //     document.getElementById('myTextarea').disabled = false;
    //     document.getElementById('save-note').disabled = false;
    //     $('#myTextarea').focus();
    //     let id = this.value;
    //     let content =  document.getElementById('myTextarea').value;
    //     editnote(id,content);
    // })
})

async function addnote(...param) {
    if(flag === 'edit') {
        notes[param[1]].content = param[0];
        flag = 'add';
        return;
    }
    let idnew = 0;
    if(notes.length > 0) {
            idnew = notes[notes.length - 1].id + 1;
    }
    
    let newNote = { id: idnew, content: param[0] };
    await notesmodel.create(newNote, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`success ${docs}`);
        }
    });     
    //notes.push(newNote);
}

function _isEmty() {
    if(!notes.length) {
        return true;
    }
    return false;
}

function deletenote(id){
    let index = notes.indexOf(notes.find( (e) => e.id === parseInt(id) ));
    notes.splice(index,1);
    alert('delete success');
    render();
}

function editnote(id) {
    document.getElementById('myTextarea').disabled = false;
    document.getElementById('save-note').disabled = false;
    let index = notes.indexOf(notes.find( (e) => e.id === parseInt(id) ));
    $('#myTextarea').value = notes[index].content;
    $('#myTextarea').focus();
    $('#noteId').val(index);
    flag = 'edit';
    // let newContent =  document.getElementById('myTextarea').value;
    // notes[index].content = newContent;
    // alert('edit note success!');
    // render();
}