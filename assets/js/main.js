// creat a functions this app
// build function to create page one
// get element container 
let container = document.querySelector('.container');
// app function
// object information User we have more details about User
let AccountUser = {
email: '',
 password: '',
}
let infoUser = {
    id: 0,
    ObjectNote :{
        icon: 'airplane outline',
        typeCategory: 'travel',
        color: 'var(--color4)',
        time: {
            hour: '08',
            minute: '30',
            typehour: 'AM',
        },
        textNote:'',
    }
}
// function special to store data on locla strogae
function storeData(data){
    localStorage.setItem('AccountUser',JSON.stringify(data));
}
// this function it run this app
function mainfunction(){
    createPageIntroduce();  // create page one in this app
        // after 2 second creat page 2 and remove last page
        setTimeout(function(){
            document.querySelector('.logoname').remove();
            createPageTwo(); // create page one in this app
            setTimeout(function(){
                document.querySelector('.getstart').classList.add('animate'); // add animate on div getstart
            },0.0001)
            // document.querySelector('ion-icon').onclick = function(){  // if click at icon remove page two and show page login
            //     document.querySelector('.getstart').remove();
            document.querySelector('ion-icon').onclick = function(){  // if click at icon remove page two and show page login
                document.querySelector('.getstart').remove();
if(JSON.parse(localStorage.getItem('AccountUser'))=== null){
    createPageLogin(); // creat page login 
        replay();
}   else{
    mainPage();
    addNewNote();
} 
let allDataLS = JSON.parse(localStorage.getItem('INFOUSER'));
if(allDataLS !==null ){
    document.querySelector('.NoNotes').classList.add('none');
    allDataLS.forEach((e)=>{
        appendNotetomPage(e);
        document.querySelector('.container .shortNote:last-child').id = `${e.id}`;
        
    });
    let allElement = document.querySelectorAll('.container .shortNote');
    allElement.forEach((e)=>{
        e.onclick = function(){
         
            if(e.classList.toggle('opacity')){
                // show trash
                e.classList.add('trash')
setTimeout(() => {
    e.classList.add('trashanimate')
}, 1);
}else{
    e.classList.remove('trashanimate')
    setTimeout(() => {
        e   .classList.add('trash');
    }, 1);
}
        }
    });
    let allTrash =document.querySelectorAll('#trash');
    let alledit =document.querySelectorAll('#edit');
    let allshow =document.querySelectorAll('#show');
    allTrash.forEach((trash)=>{
      trash.onclick =function(){
        console.log(trash.parentNode.id);
          removeItemFromLS(trash.parentNode.id);
          trash.parentNode.classList.remove('animate');
          setTimeout(()=>{
              trash.parentNode.remove();
          },100);  
          setTimeout(()=>{
              if(document.querySelectorAll('.container .shortNote').length ===0){
                  document.querySelector('.NoNotes').classList.remove('none');
                  document.querySelector('#addnote').classList.remove('none');
                  document.querySelector('.container').classList.remove('notes');
                  localStorage.removeItem('INFOUSER');
              }
          },100)
      }
    });
    allshow.forEach((show)=>{
      show.onclick = function()
      {
          // hidden shortNote
          allElement.forEach((e)=>{
              e.classList.remove('animate');
              e.classList.remove('visible');
          })
          // remove class notes and add class 'edit' to this element
          document.querySelector('.container').classList.remove('notes');
          // add class 'edit' to change style container 
          document.querySelector('.container').classList.add('edit');
          // run function createShowNote
          showNote();
          // get div 'notesShow' after run function ' showNote()'
          document.querySelector('.notesShow').innerText = getTextByID(show.parentNode.id);
          console.log(show.parentNode.id);
          container.style.background = show.parentNode.style.background;   
          document.querySelector('#backIcon').onclick =function(){
              container.classList.remove('edit');
              document.querySelector('#backIcon').remove();
              document.querySelector('.notesShow').remove();
              container.style.background = 'white';
              container.classList.add('notes');
              allElement.forEach((r)=>{
                  r.classList.add('visible');
                  r.classList.add('animate');
              });
          }
      }
  });
  alledit.forEach((edit)=>{
      edit.onclick =function(){
          let icon = edit.parentNode.children[4].children[0].children[0];
          let category = edit.parentNode.children[4].children[1];
          let shortmessg = edit.parentNode.children[6];
          let color = edit.parentNode;
          let ampm = edit.parentNode.children[5].children[2];
          let HOUR = edit.parentNode.children[5].children[0];
          let MINUTE = edit.parentNode.children[5].children[1];
          document.querySelector('.newNote').classList.add('removenone');
          // add animation when show div new note
          setTimeout(()=>{
              document.querySelector('.newNote').classList.add('visible');
          });
          container.classList.remove('notes');
          // hidden all notes
          allElement.forEach((e)=>{
              e.classList.remove('visible');
          })
          // remove btn '+'
          document.querySelector('#addnote ').classList.add('none');
          // add class 'spacebetween' to div addDelete
          document.querySelector('.addDelete').classList.add('spacebetween');
          // add class visible to show btn update
          document.querySelector('.update').classList.add('visible');
          // when click at function update to update value this shortNote
          // if user click at close button remove div add new note
          document.querySelector('#btn').onclick = function(){
            // remove div new note
            document.querySelector('.newNote').classList.remove('visible');
            // after 100ms  remove div new note from page by display:none:
            setTimeout(()=>{ 
                document.querySelector('.newNote').classList.remove('removenone');
            },100);
        // add text 'no notes here'
        setTimeout(()=>{
            if(!container.classList.contains('notes')){
                document.querySelector('.NoNotes').classList.remove('none');
            }
            
        },100);
        // add button add
        document.querySelector('#addnote').classList.remove('none');
         // if exist the class notes in container remove text no notes here
         if(document.querySelector('.container .shortNote')){
            document.querySelector('.NoNotes').classList.add('none');
            // remove no notes here
            
            document.querySelector('.container').classList.add('notes');
            document.querySelectorAll('.container .shortNote').forEach((sh)=>{
                sh.classList.add('visible');
                sh.classList.add('animate');
            });
        }
            };
          document.querySelector('.update').onclick = function(){
              //hidden div newNote
              document.querySelector('.newNote').classList.remove('visible');
              setTimeout(()=>{
                  document.querySelector('.newNote').classList.remove('removenone');
              },100);
              infoUser.ObjectNote.textNote = document.querySelector('#writeNotes').value;
              let element = update(edit.parentNode.id);
              icon.name = element.ObjectNote.icon;
              category.innerText = element.ObjectNote.typeCategory;
              shortmessg.innerText = element.ObjectNote.textNote;
              color.style.background = element.ObjectNote.color;
              edit.parentNode.style.background = element.ObjectNote.color;
              ampm.innerText = element.ObjectNote.time.typehour;
              HOUR.innerText = element.ObjectNote.time.hour;
              MINUTE.innerText = element.ObjectNote.time.minute;
              shortmessg.innerText = element.ObjectNote.textNote;
              container.classList.add('notes');
              allElement.forEach((snbt)=>{
                  snbt.classList.add('visible');
              });
              // show btn add by add remove class 'none'
              document.querySelector('#addnote').classList.remove('none'); 
          }
      }
  });
}    

 /* after create page login we have  a three sinarios first ==> user login with google or facebook or twitter
 and in this senario we store email and password for other platform in server and in local storge
 and show main page that created second ==> if user click at 'create an account on this app ' we store email and password 
 in local storgae and show main page last ==> if user click at 'skip' we will not do anythings about storgae and 
 show main page    */ 
                // if user login with google or faceboo or twitter              
function replay(){
    // if user click at skip in page login remove page login and show main page
    document.querySelector('.notNow').onclick = function(){
        document.querySelector('svg').classList.remove('show');
        document.querySelector('.loginWith').remove();
        mainPage();
        addNewNote(); ////////////
    }
    document.querySelectorAll('.accounts li').forEach((li)=>{
        li.addEventListener('click',()=>{
            AccountUser.email = li.innerHTML;
            AccountUser.password = li.innerHTML;
            storeData(AccountUser);    
            document.querySelector('svg').remove('show');
            document.querySelector('.loginWith').remove();
            mainPage();
            addNewNote(); /////////////////
        });
    })
    // in page login the user if click on 'or create an account it will function below'
    document.querySelector('.createAccount span').onclick = function(){
        // remove last page and svg
        document.querySelector('.loginWith').remove(); 
        document.querySelector('svg').classList.remove('show');
        document.querySelector('svg').classList.remove('scale');
        createPageUser(); // create page create an account 
        document.querySelector('#next').onclick = function(){
            // cheaking if input email and password is not void
            if(document.querySelector('input[type="email"]').value !== '' && document.querySelector('input[type="password"]').value !== ''){
                AccountUser.email = document.querySelector('input[type="email"]').value; // change vlaue email
                AccountUser.password = document.querySelector('input[type="password"]').value;// change vlaue email
                // set Object info User to Local storage to store by call function 
                storeData(AccountUser);
                document.querySelector('#svg2').classList.remove('show');
                document.querySelector('.textImg ').remove();
                document.querySelector('#back').remove();
                mainPage();
                addNewNote();  /////////////////
            }
        };
        document.querySelector('#back').onclick = function(){
            document.querySelector('#back').remove();
            document.querySelector('#svg2').classList.remove('show');
            document.querySelector('#svg2').classList.remove('scale');
            document.querySelector('.textImg').remove();
            createPageLogin();
            replay();

        };
        document.querySelector('#skip').onclick = function(){
            document.querySelector('#svg2').classList.remove('show');
            document.querySelector('.textImg ').remove();
            document.querySelector('#back').remove();
            mainPage();
            addNewNote();
        }

    };
}              
            }            
        },3000);
}
// function add new note
let arr;
function addNewNote(){
    runfunctionewnote();
                       // if user clicked at addNote run function createNewNote
                       document.querySelector('#addnote').onclick = function(){
                        if(document.querySelector('.update').classList.contains('visible')){
                            document.querySelector('.update').classList.remove('visible');
                            document.querySelector('.addDelete').classList.remove('spacebetween');
                        }
                        if(container.classList.contains('edit')){
                            container.classList.remove('edit');
                            document.querySelector('#backIcon').remove();
                            document.querySelector('.notesShow').remove();
                            container.style.background = 'white';
                        }   

                        if(document.querySelector('.container.notes')){
                            document.querySelector('.container').classList.remove('notes');
                            document.querySelectorAll('.container .shortNote').forEach((sh)=>{
                                sh.classList.remove('visible');
                                sh.classList.remove('animate');
                            });
                        }
                        document.querySelector('#addnote').classList.add('rotate');
                        setTimeout(()=>{
                            document.querySelector('#addnote').classList.remove('rotate');
                            },1000)
                        // run function div new note
                            document.querySelector('.newNote').classList.add('removenone');
                        // add class visible to  show div new note with animation
                        setTimeout(()=>{ // we use setTime out for ti enable aniamtion after very short time
                            document.querySelector('.newNote').classList.add('visible');
                        },100)
                        // remove text 'no notes here'
                        document.querySelector('.NoNotes').classList.add('none');
                        // remove button add
                        setTimeout(()=>{
                            document.querySelector('#addnote').classList.add('none');
                        },300)
                        // if user click at close button remove div add new note
                        document.querySelector('#btn').onclick = function(){
                        // remove div new note
                        document.querySelector('.newNote').classList.remove('visible');
                        // after 100ms  remove div new note from page by display:none:
                        setTimeout(()=>{ 
                            document.querySelector('.newNote').classList.remove('removenone');
                        },100);
                    // add text 'no notes here'
                    setTimeout(()=>{
                        if(!container.classList.contains('notes')){
                            document.querySelector('.NoNotes').classList.remove('none');
                        }
                        
                    },100);
                    // add button add
                    document.querySelector('#addnote').classList.remove('none');
                     // if exist the class notes in container remove text no notes here
                     if(document.querySelector('.container .shortNote')){
                        document.querySelector('.NoNotes').classList.add('none');
                        // remove no notes here
                        
                        document.querySelector('.container').classList.add('notes');
                        document.querySelectorAll('.container .shortNote').forEach((sh)=>{
                            sh.classList.add('visible');
                            sh.classList.add('animate');
                        });
                    }
                        };
                        // if user click at add
                    };
                    let btnaddNweNote = document.querySelector('.add');
                     // if user click at the add create an shortNotes an show it on the main page
                     btnaddNweNote.onclick = ()=>{
                        // when click at add check if container it has a class 'edit'
                                            // show icon add new note
                    document.querySelector('#addnote').classList.remove('none');
                        infoUser.ObjectNote.textNote = document.querySelector('#writeNotes').value; // get value content textarea and stor it in lacal stoarge
                        appendNotetomPage(infoUser); // this function to create shortMain and append it in main page
                        document.querySelector('#writeNotes').value = '';
                        if(JSON.parse(localStorage.getItem('INFOUSER')) === null){
                            arr = [];
                        }else{
                            arr = JSON.parse(localStorage.getItem('INFOUSER'));
                        }
                        arr.push(infoUser);
                        localStorage.setItem('INFOUSER',JSON.stringify(arr));
                                                // Show all previously hidden items
                          if(document.querySelector('.container.notes')){
                                                    document.querySelectorAll('.container .shortNote').forEach((sh)=>{
                                                        sh.classList.add('visible');
                                                        setTimeout(()=>{
                                                            sh.classList.add('animate');
                                                        },1);
                                                    });}; 
        let shortNotebtn  =document.querySelectorAll('.shortNote');
        // if user click at the shortNote shwo three element 1=> delete shortNote
        //2=> edit shortNote, 3=> show  shortNote content at main page
        let i =0;
      shortNotebtn.forEach((shNote)=>{
        shNote.style.order = i;
        i++;
        shNote.onclick = function(){
            if(shNote.classList.toggle('opacity')){
              
                            // show trash
            shNote.classList.add('trash');
            setTimeout(() => {
                shNote.classList.add('trashanimate')
            }, 1);
            }else{
                shNote.classList.remove('trashanimate')
                setTimeout(() => {
                    shNote.classList.add('trash');
                }, 1);
            }

        }
            
      });
      let allTrash =document.querySelectorAll('#trash');
      let alledit =document.querySelectorAll('#edit');
      let allshow =document.querySelectorAll('#show');
      allTrash.forEach((trash)=>{
        trash.onclick =function(){
            removeItemFromLS(trash.parentNode.id);
            trash.parentNode.classList.remove('animate');
            setTimeout(()=>{
                trash.parentNode.remove();
            },100);  
            setTimeout(()=>{
                if(document.querySelectorAll('.container .shortNote').length ===0){
                    document.querySelector('.NoNotes').classList.remove('none');
                    document.querySelector('#addnote').classList.remove('none');
                    document.querySelector('.container').classList.remove('notes');
                    localStorage.removeItem('INFOUSER');
                }
            },100)
        }
      });
      allshow.forEach((show)=>{
        show.onclick = function()
        {
            // hidden shortNote
            shortNotebtn.forEach((e)=>{
                e.classList.remove('animate');
                e.classList.remove('visible');
            })
            // remove class notes and add class 'edit' to this element
            document.querySelector('.container').classList.remove('notes');
            // add class 'edit' to change style container 
            document.querySelector('.container').classList.add('edit');
            // run function createShowNote
            showNote();
            // get div 'notesShow' after run function ' showNote()'
            document.querySelector('.notesShow').innerText = getTextByID(show.parentNode.id);
            console.log(show.parentNode.id);
            container.style.background = show.parentNode.style.background;   
            document.querySelector('#backIcon').onclick =function(){
                container.classList.remove('edit');
                document.querySelector('#backIcon').remove();
                document.querySelector('.notesShow').remove();
                container.style.background = 'white';
                container.classList.add('notes');
                shortNotebtn.forEach((r)=>{
                    r.classList.add('visible');
                    r.classList.add('animate');
                });
            }
        }
    });
    alledit.forEach((edit)=>{
        edit.onclick =function(){
            let icon = edit.parentNode.children[4].children[0].children[0];
            let category = edit.parentNode.children[4].children[1];
            let shortmessg = edit.parentNode.children[6];
            let color = edit.parentNode;
            let ampm = edit.parentNode.children[5].children[2];
            let HOUR = edit.parentNode.children[5].children[0];
            let MINUTE = edit.parentNode.children[5].children[1];
            document.querySelector('.newNote').classList.add('removenone');
            // add animation when show div new note
            setTimeout(()=>{
                document.querySelector('.newNote').classList.add('visible');
            });
            container.classList.remove('notes');
            // hidden all notes
            shortNotebtn.forEach((e)=>{
                e.classList.remove('visible');
            })
            // remove btn '+'
            document.querySelector('#addnote ').classList.add('none');
            // add class 'spacebetween' to div addDelete
            document.querySelector('.addDelete').classList.add('spacebetween');
            // add class visible to show btn update
            document.querySelector('.update').classList.add('visible');
            // when click at function update to update value this shortNote
            document.querySelector('.update').onclick = function(){
                //hidden div newNote
                document.querySelector('.newNote').classList.remove('visible');
                setTimeout(()=>{
                    document.querySelector('.newNote').classList.remove('removenone');
                },100);
                infoUser.ObjectNote.textNote = document.querySelector('#writeNotes').value;
                let element = update(edit.parentNode.id);
                icon.name = element.ObjectNote.icon;
                category.innerText = element.ObjectNote.typeCategory;
                shortmessg.innerText = element.ObjectNote.textNote;
                color.style.background = element.ObjectNote.color;
                edit.parentNode.style.background = element.ObjectNote.color;
                ampm.innerText = element.ObjectNote.time.typehour;
                HOUR.innerText = element.ObjectNote.time.hour;
                MINUTE.innerText = element.ObjectNote.time.minute;
                shortmessg.innerText = element.ObjectNote.textNote;
                container.classList.add('notes');
                shortNotebtn.forEach((snbt)=>{
                    snbt.classList.add('visible');
                });
                // show btn add by add remove class 'none'
                document.querySelector('#addnote').classList.remove('none'); 
            }
            // update(edit.parentNode.id);
        }
    });
      // increment Opacity by add class opacity to div overlay
  };
}
function appendNotetomPage(x){
    // hidden this div
    document.querySelector('.newNote').classList.remove('visible');
    // after 100ms  remove div new note from page by display:none:
    setTimeout(()=>{ 
        document.querySelector('.newNote').classList.remove('removenone');
    },100);
    // create short note
    creatShortNote(x);
    let shortNote = document.querySelector('.container .shortNote:last-child');
    let iconNote =  document.querySelector('.shortNote:last-child .iconcategory .ICON ion-icon');
    let category =  document.querySelector('.shortNote:last-child .CATEGORY');
    let htime = document.querySelector('.shortNote:last-child #h');
    let mtime = document.querySelector('.shortNote:last-child #m');
    let shortmessg = document.querySelector('.shortNote:last-child .shortmessg');
    let ampm =document.querySelector('.ap');
    // change background shortNote
    shortNote.style.background = `${x.ObjectNote.color}`;
    iconNote.name = `${x.ObjectNote.icon}`;
    category.innerText = `${x.ObjectNote.typeCategory}`;
    htime.innerText = `${x.ObjectNote.time.hour}`;
    mtime.innerText = `${x.ObjectNote.time.minute}`;
    shortmessg.innerText = `${x.ObjectNote.textNote}`;
    ampm.innerText = `${x.ObjectNote.time.typehour}`;
    // localStorage.setItem('test',JSON.stringify(infoUser));
    // show short note
    // add class visisble
    shortNote.classList.add('visible');
    // add class animate 
    setTimeout(() => {
        shortNote.classList.add('animate');
    }, 1);
    
}
function createPageIntroduce(){
    // creat parent div is call logoname
    let logoname = document.createElement('div');
    // set class on logoname
    logoname.classList = 'logoname';
    // creat h2
    let h2 = document.createElement('h2');
    // creat span for first letter
    let spanfrstLetter = document.createElement('span');
    // set class to this span
    spanfrstLetter.classList = 'bigletter';
    // creat text and append it in this span
    let N = document.createTextNode('N');
    // append text in span
    spanfrstLetter.appendChild(N);
    // creat text and append it in h2
    let textH2 = document.createTextNode('otes');
    //append this in h2
    h2.appendChild(textH2);
    // append span in h2
    h2.appendChild(spanfrstLetter);
    // append h2 in this div 'logoname'
    logoname.appendChild(h2);
    // creat p and append it in logoname
    let p = document.createElement('p');
    // creat text p
    let textP = document.createTextNode('write your notes any time');
    // append text on p
    p.appendChild(textP);
    // append p on logoname
    logoname.appendChild(p);
    // append logoname on container
    container.appendChild(logoname);
    document.body.appendChild(container);

    
}
// ---------- create page two -----------
function createPageTwo(){
    // creat div get started
    let getstart = document.createElement('div');
    getstart.classList = 'getstart';
    // creat icon
    // let icon = document.createElement('ion-icon');
    // icon.name = 'play-outline';
    let icon = document.createElement('ion-icon');
    icon.name = 'play-outline';
    getstart.appendChild(icon);
    let p = document.createElement('p');
    let textp = document.createTextNode('Start write Now');
    p.appendChild(textp);
    getstart.appendChild(p);
    container.prepend(getstart);
    document.body.prepend(container);
};
// create Page Log In

function createPageLogin(){
    // get SVG and add it class 'Show'
    document.querySelector('svg').classList.add('show');
    setTimeout(()=>{
        document.querySelector('svg').classList.add('scale');
        document.querySelector('.loginWith').classList.add('scale');
    },1)
    // create element page LogIn
    // create div loginWith
    let div = document.createElement('div');
    div.classList = 'loginWith';
    let h3 = document.createElement('h3');
    let textH3 = document.createTextNode('LogIn With:');
    h3.appendChild(textH3); 
    // append h3 on container
    div.appendChild(h3);
    // create Div Accounts
    let Accounts = document.createElement('div');
    Accounts.classList = 'accounts';
    // create Li
    let li1 = document.createElement('li');
    li1.classList = 'google';
    let li1text = document.createTextNode('Google');
    li1.appendChild(li1text);
        // create Li2
        let li2 = document.createElement('li');
        li2.classList = 'facebook';
        let li2text = document.createTextNode('Facebook');
        li2.appendChild(li2text);
         // create Li3
        let li3 = document.createElement('li');
        li3.classList = 'Twitter';
        let li3text = document.createTextNode('Twitter');
        li3.appendChild(li3text);
        Accounts.appendChild(li1);
        Accounts.appendChild(li2);
        Accounts.appendChild(li3);
        div.appendChild(Accounts);
        let h4 =document.createElement('h4');
        h4.classList = 'createAccount';
        let span = document.createElement('span');
        let spantext = document.createTextNode('or create an account');
        span.appendChild(spantext);
        h4.appendChild(span);
        div.appendChild(h4);
        // create span not now
        let spanNotNo = document.createElement('span');
        spanNotNo.classList =  'notNow';
        let textSpanNotNo = document.createTextNode('Skip');
        spanNotNo.appendChild(textSpanNotNo);
        div.appendChild(spanNotNo);
        container.appendChild(div);
}
// creat page user creat an account

function createPageUser(){
    // get svg and show it
    document.querySelector('#svg2').classList.add('show');
    setTimeout(() => {
        document.querySelector('#svg2').classList.add('scale');
    }, 10);
    // create button go back
    let back = document.createElement('button');
    back.id = 'back';
    back.innerHTML = '<';
    container.appendChild(back);
    // create div textimg
    let textImg = document.createElement('div');
    textImg.classList = 'textImg';
    // textImg.appendChild(document.querySelector('.svg2'));
    let h5 = document.createElement('h5');
    let textH5 = document.createTextNode('creating an account in Notes');
    h5.appendChild(textH5);
    textImg.appendChild(h5);
    // creat div account
    let account = document.createElement('div');
    account.classList = 'account';
    // creat input email and password
    let email = document.createElement('input');
    email.type = 'email';
    email.placeholder= 'Email';
    email.name = '';
    email.id = 'email';
    account.appendChild(email);
    let paswrd = document.createElement('input');
    paswrd.type = 'password';
    paswrd.placeholder= 'password';
    paswrd.name = '';
    paswrd.id = 'password';
    account.appendChild(paswrd);
    // creat Buttons
    let buttons = document.createElement('div');
    buttons.classList = 'buttons';
    let skip = document.createElement('button');
    skip.id = 'skip'
    let skiptext = document.createTextNode('skip');
    skip.appendChild(skiptext);
    buttons.appendChild(skip);
    let next = document.createElement('button');
    next.id = 'next';
    let nexttext = document.createTextNode('next');
    next.appendChild(nexttext);
    buttons.appendChild(next);
    account.appendChild(buttons);
    textImg.appendChild(account);
    container.appendChild(textImg);
    setTimeout(() => {
        document.querySelector('.textImg').classList.add('animate');
    }, 10);

}
{/* <span class="NoNotes">No Notes Here</span>
<button id="addnote">+</button> */}
// function create main page 
function mainPage(){
    // create text no notes here 
    let span = document.createElement('span');
    span.classList = 'NoNotes';
    let textspan = document.createTextNode('No Notes Here');
    span.appendChild(textspan);
    container.appendChild(span);
    // create button to add new notes
    let add = document.createElement('button');
    add.id = 'addnote';
    let textadd = document.createTextNode('+');
    add.appendChild(textadd);
    container.appendChild(add);
}
// --------- run function main app ---------------
// --------- run function main app ---------------

// function add animation to button add 
function addAnimation(){            // add animation to button
    document.querySelector('#addnote').onclick = function(){
        document.querySelector('#addnote').classList.add('rotate');
        setTimeout(()=>{
            document.querySelector('#addnote').classList.remove('rotate');
            },1000)
    }}
    function creatMinutes(){
        for(let i = 1;i <=59;i++){
            let span = document.createElement('span');
            span.id = i;
            span.innerHTML = i;
            document.querySelector('.contentminutes').appendChild(span);
        }
    }
    // creatMinutes();
// function create add new note
function createDivNewNote(){
    // create div original
    let newNote = document.createElement('div');
    newNote.classList = 'newNote';
    // create H3 and h3 text
    let h3 = document.createElement('h3');
    let h3text = document.createTextNode('New Note');
    h3.appendChild(h3text);
    newNote.appendChild(h3);
    // create div icon category
    let ctgryicon = document.createElement('div');
    ctgryicon.classList = 'iconCategory';
    // cretae span icon
    let spanicon = document.createElement('span');
    spanicon.classList = 'icon';
    let icon = document.createElement('ion-icon');
    icon.name = 'airplane-outline';
    spanicon.appendChild(icon);
    ctgryicon.appendChild(spanicon);
    // cretae span category
    let spancategory = document.createElement('span');
    spancategory.classList = 'category';
    let categorytext = document.createTextNode('travel');
    spancategory.appendChild(categorytext);
    ctgryicon.appendChild(spancategory);
    // append ctgryicon on div newnote
    newNote.appendChild(ctgryicon);

    //cretae div color reminder
    let colorremainder = document.createElement('div');
    colorremainder.classList = 'colorRemainder';
    let spancolor =document.createElement('span');
    spancolor.classList = 'color';
    let textspancolor = document.createTextNode('c');
    spancolor.appendChild(textspancolor);
    colorremainder.appendChild(spancolor);
    // create div Remainder
    let Remainder = document.createElement('span');
    Remainder.classList = 'Remainder'; 
    // create span hours
    let spanhour = document.createElement('span');
    spanhour.id ='hour';
    let textspanhour = document.createTextNode('08');
    spanhour.appendChild(textspanhour);
    Remainder.appendChild(spanhour);
    // text remainder
    let textremainder = document.createTextNode(':');
    Remainder.appendChild(textremainder);
    colorremainder.appendChild(Remainder);

     // create span minute
     let spanminute = document.createElement('span');
     spanminute.id ='minute';
     let textspanminute = document.createTextNode('00');
     spanminute.appendChild(textspanminute);
     Remainder.appendChild(spanminute);
     newNote.appendChild(colorremainder);
     //create textarea
     let textarea = document.createElement('textarea');
     textarea.name = '';
     textarea.id = 'writeNotes';
     textarea.cols = '30';
     textarea.rows = '10';
     // append textarea to div newnote
     newNote.appendChild(textarea);
     // create div addDelete
     let addDelete = document.createElement('div');
     addDelete.classList = 'addDelete';
     let spanadd = document.createElement('span');
     spanadd.classList = 'add';
     let textspanadd = document.createTextNode('add');
     spanadd.appendChild(textspanadd);
     addDelete.appendChild(spanadd);
     // create span delete
     let spandelete = document.createElement('span');
     spandelete.classList = 'update';
     let textspandelete = document.createTextNode('update');
     spandelete.appendChild(textspandelete);
     addDelete.appendChild(spandelete);
     newNote.appendChild(addDelete);
     container.appendChild(newNote);
     newNote.prepend(document.querySelector('.icons'));
     buttonClose(newNote);
     
}
// function create Category
let category = ['sport','learn','school','work','Health','another thing'];

function createCategory(){

    // create div category shaow
    let div = document.createElement('div');
    div.classList = 'categoryshow';
    // create li 
    for(let i =0;i<=5;i++){
        let li =document.createElement('li');
        let litext = document.createTextNode(category[i]);

        let spantext = document.createElement('span');
        spantext.classList = 'textcategory';
        spantext.appendChild(litext);
        li.appendChild(spantext);
        div.appendChild(li);
        // in last li
        if(i==5){
            li.id = 'another-thing'; 
            let input = document.createElement('input');
            input.type = 'text';
            input.value = '';
            input.placeholder = 'write any thing';
            // creat h3
            let h3 = document.createElement('h3');
            let h3text = document.createTextNode('your note');
            h3.appendChild(h3text);
            // creat span counter letters
            let spancounter = document.createElement('span');
            spancounter.classList = 'counter'
            let spannumber = document.createElement('span');
            spannumber.id = 'counter';
            let textspannumber = document.createTextNode('0');
            spannumber.appendChild(textspannumber);
            spancounter.appendChild(spannumber);
            let textspancounter = document.createTextNode('/11');
            spancounter.appendChild(textspancounter);
            let divinput =document.createElement('div');
            divinput.classList = 'parentinput';
            divinput.appendChild(h3);
            divinput.appendChild(input);
            divinput.appendChild(spancounter);
            li.appendChild(divinput);
        }
    }
    
    document.querySelector('.newNote').prepend(div);
    buttonClose(div);
}

// function createcolor
// array of color
let background = ['background: var(--color1);','background: var(--color2);','background: var(--color3);'
                   ,'background: var(--color4);','background: var(--color5);','background: var(--color6);'
                ,'background: var(--color7);','background: var(--color8);'];
function createColor(){
    // create div colors
    let colors =document.createElement('div');
    colors.classList = 'colors';
    for(let i =0;i<=7;i++){
        let color = document.createElement('color');
        color.style = background[i];
        colors.appendChild(color);
    }
    document.querySelector('.newNote').appendChild(colors);
}
// function create Time
function createTime(){
    // create div time
    let divTime = document.createElement('div');
    divTime.classList = 'Time';
    // create div AMPM
    // create icon time
    let icon = document.createElement('ion-icon');
    icon.name = 'arrow-forward-outline';
    divTime.appendChild(icon);
    let ampm = document.createElement('div');
    ampm.classList = 'AMPM';
    // create Div am
    let am = document.createElement('div');
    am.id = 'AM';
    am.classList = 'active';
    let amtext = document.createTextNode('AM');
    am.appendChild(amtext);
    ampm.appendChild(am);
    // create Div pm
    let pm = document.createElement('div');
    pm.id = 'PM';
    let pmtext = document.createTextNode('PM');
    pm.appendChild(pmtext);
    ampm.appendChild(pm);
    // append am and pm to AMPM
    ampm.appendChild(am);
    ampm.appendChild(pm);
    // append AMPM to div time
    divTime.appendChild(ampm);
    // create DIV hours
    let hours =document.createElement('div');
    hours.classList = 'hours';
    let texthours = document.createTextNode('08');
    hours.appendChild(texthours);
    // create content hours
    let contentHourse = document.createElement('div');
    contentHourse.classList = 'contenthours';
    // create span hours
    for(let i = 1;i<=12;i++){
        let span = document.createElement('span');
        span.id = i;
        // add zero to left numbers less than 
        let spantexthour ;
        if(i<10){
            spantexthour = document.createTextNode('0'+i);
        }else{
            spantexthour = document.createTextNode(i);
        }
        span.appendChild(spantexthour);
        contentHourse.appendChild(span)
    }
    // hours.appendChild(contentHourse);
    divTime.appendChild(contentHourse);
    divTime.appendChild(hours);
    let divTimetext =document.createTextNode(':');
    divTime.appendChild(divTimetext);
     // create DIV minutes
     let minutes =document.createElement('div');
     minutes.classList = 'minutes';
     let textminutes = document.createTextNode('00');
     minutes.appendChild(textminutes);
     // create content hours
     let contentminutes = document.createElement('div');
     contentminutes.classList = 'contentminutes';
     // create span hours
     for(let i = 0;i<=59;i++){
         let span = document.createElement('span');
         span.id = i;
         let spantextminutes;
          if(i<10){
            spantextminutes = document.createTextNode('0'+i);
          }else{
            spantextminutes = document.createTextNode(i);
          }
         span.appendChild(spantextminutes);
         contentminutes.appendChild(span)
     }
    //  minutes.appendChild(contentminutes);
    divTime.appendChild(contentminutes);
     divTime.appendChild(minutes);
     document.querySelector('.newNote').appendChild(divTime);
}
// object new note

// main function to run newNote 
function runfunctionewnote(){
    // run function createDivNewNote();
    createDivNewNote();
    // we have 4 click the user it will do it one: click at div icon th choosing the icon
    // two: click at div category
    // three: click at div color
    // four: click at div time to choosing the time
    // click at div icon th choosing the icon
    document.querySelector('.icon').addEventListener('click',()=>{
        document.querySelector('.icons').classList.remove('hidden');
        setTimeout(()=>{
            document.querySelector('.icons').classList.add('animate');
        },1);
        // we need if user click at button close close div icons
        document.querySelector('.btnicons').onclick = function(){
            document.querySelector('.icons').classList.remove('animate');
             setTimeout(()=>{
                document.querySelector('.icons').classList.add('hidden');
             },300)
        }
        // add event click at all icon
        let allIcons = document.querySelectorAll('.icons ion-icon');
        allIcons.forEach((icon)=>{
            icon.addEventListener('click',()=>{
                document.querySelector('.icon ion-icon').name = icon.name;
                document.querySelector('.icons').classList.remove('animate');
                infoUser.ObjectNote.icon = icon.name;
            });
        });
    });
    // click at div category
    document.querySelector('.category').addEventListener('click',()=>{
        // create div category 
        createCategory();
        // if user click at any li print value li at the div icon
        let allLi = document.querySelectorAll('.categoryshow li:not(:last-child)');
        // add eventlistener to all li to app function print content li at the div icon
        for(let i =0;i<= allLi.length-1;i++){
            allLi[i].addEventListener('click',()=>{
                 // add input value in category
                 let thevalue = allLi[i].innerText;
                 // add input value in category interface
                 document.querySelector('.iconCategory .category').innerHTML = thevalue;
                                             // remove class visible to remove disabled display none
                                             document.querySelector('.categoryshow').classList.remove('animate');
                                             // add class animate to add animate the div when show it
                                             setTimeout(()=>{
                                                 document.querySelector('.categoryshow').classList.remove('visible');
                                             },300);
                                             infoUser.ObjectNote.typeCategory = thevalue;
            });

        }
        // add class visible to remove disabled display none
        document.querySelector('.categoryshow').classList.add('visible');
        // add class animate to add animate the div when show it
        setTimeout(()=>{
            document.querySelector('.categoryshow').classList.add('animate');
        },1);
        // when click at last li show input
        let lastli = document.getElementById('another-thing');
        buttonClose(document.querySelector('.categoryshow'));
        buttonchecked(document.querySelector('.categoryshow'));
        // when user click at last li 
        let Mycounter; // that variable it include interval time
        lastli.onclick = function(){
            let counter = document.querySelector('#another-thing .parentinput #counter');
                 // add class visible to input 
                 document.querySelector('#another-thing .parentinput').classList.add('visible');
                 setTimeout(()=>{
                     document.querySelector('#another-thing .parentinput').classList.add('animate');
                 },1);
                 // create button close and button checked
                 setTimeout(()=>{
                    document.querySelector('.categoryshow #btn2').classList.add('visible');
                    document.querySelector('.categoryshow #btnchecked').classList.add('visible');
                 },350);
                 // store buttons in variables
                 let btnclose = document.querySelector('.categoryshow #btn2');
                 let btnchecked = document.querySelector('#btnchecked');
                 let input = document.querySelector('#another-thing .parentinput input');
                 input.focus();
                 Mycounter = setInterval(()=>{
                    if(input.value.length <=11){
                        counter.innerHTML = input.value.length;
                    }else{
                        input.value = '';
                    }
                 },0.00001);
                 btnclose.onclick =function(){
                    clearInterval(Mycounter);
                    document.querySelector('.categoryshow #btn2').classList.remove('visible');
                    document.querySelector('.categoryshow #btnchecked').classList.remove('visible');
                    document.querySelector('#another-thing .parentinput ').classList.remove('animate');
                    setTimeout(()=>{
                        document.querySelector('#another-thing .parentinput ').classList.remove('visible');
                                        },300);
                           }
                           //  if user click at btnchecked take input value and printed on the div category
                btnchecked.onclick = function(){
                    // clear interval
                    clearInterval(Mycounter);
                    // add input value in category
                    let inputvalue = document.querySelector('#another-thing input').value;
                    document.querySelector('#another-thing .textcategory').innerHTML = inputvalue;
                    // add input value in category interface
                    document.querySelector('.iconCategory .category').innerHTML = inputvalue;
                    // hidden input and icons
                    document.querySelector('#btn2').classList.remove('visible');
                    document.querySelector('.categoryshow #btnchecked').classList.remove('visible');
                    document.querySelector('#another-thing input').classList.remove('animate');
                            // remove class visible to remove disabled display none
                            document.querySelector('.categoryshow').classList.remove('animate');
        // add class animate to add animate the div when show it
        setTimeout(()=>{
            document.querySelector('.categoryshow').classList.remove('visible');
        },300);
        infoUser.ObjectNote.typeCategory = inputvalue;
        // cheak if no existspace in category 
        if(checkSpace(input) !==1){
            document.querySelector('.category').innerHTML = 'Unkowne';
        }
                }
                
                
        }
        // when click at close button hidden div category show
        let button  = document.querySelectorAll('.categoryshow #btn');
        button[1].id = 'btn2';
        button[0].onclick = function(){
            clearInterval(Mycounter);
            // add class visible to remove disabled display none
        document.querySelector('.categoryshow').classList.remove('animate');
        // add class animate to add animate the div when show it
        setTimeout(()=>{
            document.querySelector('.categoryshow').remove();
        },300);
        }
    });
    // click at div color
    document.querySelector('.color').addEventListener('click',()=>{
        // remove text from this icon color
        document.querySelector('.color').innerHTML = '';
        // create div colors
        createColor();
        // show div color by add class animate
        setTimeout(()=>{
            document.querySelector('.colors').classList.add('animate');
        },1)
        // add event click at all colors
        let allColor = document.querySelectorAll('.colors color');
        allColor.forEach((color)=>{
            color.addEventListener('click',()=>{
                infoUser.ObjectNote.color = color.style.background;
                document.querySelector('.colors').classList.remove('animate');
                setTimeout(()=>{
                    document.querySelector('.colors').remove();
                },200);
                // change background div color into color select
                document.querySelector('.color').style.background = `${color.style.background}`;
            });
        });
    });
    // click at div time to choosing the time
    document.querySelector('.Remainder').addEventListener('click',()=>{
        // add class none click 
        document.querySelector('.Remainder').classList.add('noneclick');
        // create timer
        createTime();
        let btntime = document.querySelector('.Time ion-icon'); // btn to confirm take a time
        // set value in object new notes
        infoUser.ObjectNote.time.hour = document.querySelector('.hours').innerText;
        infoUser.ObjectNote.time.minute = document.querySelector('.minutes').innerText;
        infoUser.ObjectNote.time.typehour = document.querySelector('.AMPM .active').innerText;
        // set object in local storage
        // add class animate to show div
        setTimeout(() => {
            document.querySelector('.Time').classList.add('animate');
        }, 1);
        // if user click at am or pm add class active to change background
        // get element am and pm and add event click at both
        let ampm = document.querySelectorAll('.AMPM div');
        ampm.forEach((e)=>{

            e.addEventListener('click',()=>{
                ampm.forEach((e)=>{
                        e.classList.remove('active');
                });
                e.classList.add('active');
                infoUser.ObjectNote.time.typehour = e.innerHTML; // set value to this object
            });
        });
        let hour = document.querySelector('.hours');
        let minute = document.querySelector('.minutes');
        // if click at hour show div contnetHours
        hour.onclick = function(){
            document.querySelector('.contenthours').classList.add('animate');
            minute.classList.add('noneclick');
            let contenthours = document.querySelectorAll('.contenthours span');
            // add event click at all hours
            contenthours.forEach((h)=>{
                h.addEventListener('click',()=>{
                    hour.innerText = h.innerText;
                    minute.classList.remove('noneclick');
                    document.querySelector('.contenthours').classList.remove('animate');
                    infoUser.ObjectNote.time.hour = h.innerHTML; // set value to this object
                });
            })
        }
        // if click at minute show div contnetminutes
        minute.onclick = function(){
            document.querySelector('.contentminutes').classList.add('animate');
            hour.classList.add('noneclick');
            let contentminutes = document.querySelectorAll('.contentminutes span');
            // add event click at all hours
            contentminutes.forEach((h)=>{
                h.addEventListener('click',()=>{
                    minute.innerText = h.innerText;
                    hour.classList.remove('noneclick');
                    document.querySelector('.contentminutes').classList.remove('animate');
                    infoUser.ObjectNote.time.minute = h.innerHTML; // set value to this object
                });
            })
        }
        // if user click at btntime hidden div time
        btntime.onclick = function(){
            // remove div time
            document.querySelector('.Time').remove();
            // remove 
            document.querySelector('.Remainder').classList.remove('noneclick');
            // change time in the icon time
            document.querySelector('#hour').innerText = infoUser.ObjectNote.time.hour;
            document.querySelector('#minute').innerText = infoUser.ObjectNote.time.minute;
        };
    });
}

// create function craeteButtonclose
function buttonClose(parent){
    // create button 
    let btn = document.createElement('button');
    btn.id = 'btn';
    let btntext = document.createTextNode('X');
    btn.appendChild(btntext);
    parent.prepend(btn);

};
// create function craeteButtonchecked
function buttonchecked(parent){
    // create button 
    let btn = document.createElement('button');
    btn.id = 'btnchecked';
    let btntext = document.createTextNode('>');
    btn.appendChild(btntext);
    parent.prepend(btn);

};
// function checkspace
function checkSpace(input){
    let arr = input.value.split('');
    for(let i = 0;i<arr.length;i++){
                if(arr[i] !== ' '){
            return 1;
            
        }
    }
}

function creatShortNote(MyObject){
    // create Div shortNote
    let shortNote = document.createElement('div');
    shortNote.classList = 'shortNote';
    let idshort =  Date.now();
    shortNote.id = idshort;
    infoUser.id = idshort;
    // create overlay
    let overlay = document.createElement('div');
    overlay.classList = 'overlay';
    shortNote.appendChild(overlay);
    // create iCON
    let icon =  document.createElement('ion-icon');
    icon.name = "trash-outline";
    icon.id = 'trash';
    // create iCON2
    let iconedit =  document.createElement('ion-icon');
    iconedit.name = "create-outline";
    iconedit.id = 'edit'
    // create iCON
    let iconshow =  document.createElement('ion-icon');
    iconshow.name = "eye-outline";
    iconshow.id = 'show';
    // append icon on div shortNote
    shortNote.appendChild(iconshow);
    shortNote.appendChild(iconedit);
    shortNote.appendChild(icon);
    // create div iconcategory
    let iconcategory =document.createElement('div');
    iconcategory.classList = 'iconcategory';
    // create div icon
    let ICON = document.createElement('div');
    ICON.classList = 'ICON';
    let icon2 = document.createElement('ion-icon');
    icon2.name = MyObject.ObjectNote.icon;
    // append icon2 to ICON div
    ICON.appendChild(icon2);
    // append ICON to iconcategory div
    iconcategory.appendChild(ICON);
    // create div CATEGORY
    let Category = document.createElement('div');
    Category.classList = 'CATEGORY';
    let textCategory = document.createTextNode(MyObject.ObjectNote.typeCategory);
    Category.appendChild(textCategory);
    iconcategory.appendChild(Category);
        // append iconcategory to shortNote div
        shortNote.appendChild(iconcategory);
        // create Div Time
        let time = document.createElement('div');
        time.classList = 'TIME';
        let spanH = document.createElement('span');
        spanH.id = 'h'
        let spanHtext = document.createTextNode(MyObject.ObjectNote.time.hour);
        spanH.appendChild(spanHtext);
        let textTime =document.createTextNode(':');

        let spanM = document.createElement('span');
        spanM.id = 'm'
        let spanMtext = document.createTextNode(MyObject.ObjectNote.time.minute);
        spanM.appendChild(spanMtext);
        time.appendChild(spanH);
        time.appendChild(textTime);
        time.appendChild(spanM);
        shortNote.appendChild(time);
        let ampm = document.createElement('span');
        ampm.classList = 'ap';
        let textampm =document.createTextNode('am');
        ampm.appendChild(textampm);
        time.appendChild(ampm);
        // shortmessg
        let shortmessg = document.createElement('div');
        shortmessg.classList = 'shortmessg';
        let shortmessgtext = document.createTextNode(MyObject.ObjectNote.textNote);
        shortmessg.appendChild(shortmessgtext);
        shortNote.appendChild(shortmessg);
        container.classList.add('notes');
        container.appendChild(shortNote);
}
function showNote(){
    // create div showNote
    let showNote =document.createElement('div');
    showNote.classList = 'notesShow';
    container.prepend(showNote);
    // create icon back
    let iconback = document.createElement('ion-icon');
    iconback.name = 'caret-back-outline';
    iconback.id = 'backIcon'
    container.appendChild(iconback);
}
// function remove Item from local storage
function removeItemFromLS(IDItem){
    let data = JSON.parse(localStorage.getItem('INFOUSER'));
    let newData = [];
    if(data !== null){
        for(let i =0;i<data.length;i++){
            if(data[i].id !== Number(IDItem)){
                newData[newData.length] = data[i];
            }
        }
    }
    localStorage.setItem('INFOUSER',JSON.stringify(newData));
}
// function Update 
function update(IdItem){
    let element;
    let allData = JSON.parse(localStorage.getItem('INFOUSER'));
    for(let i =0;i<allData.length;i++){

        if(allData[i].id === Number(IdItem)){
            // we specific what We need from other Object and we not take Id and we not chang it
            infoUser.id =  Number(IdItem);
            allData[i] = infoUser;
            element = allData[i];
        }
    }
   localStorage.setItem('INFOUSER',JSON.stringify(allData));
   return element;
}
// function gettext note by Id
function getTextByID(ID){
    let data = JSON.parse(localStorage.getItem('INFOUSER'));
    for(let i =0;i<data.length;i++){
        if(data[i].id === Number(ID)){
            return data[i].ObjectNote.textNote;
        }
    }
}
mainfunction();