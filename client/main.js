function resetDivForm(selectorDiv,selectorForm,selectorElement){
  // $(selectorDiv).find('span').remove(selectorElement);
  // $(selectorDiv).find('input').remove(selectorElement);
  $(selectorDiv).find('*').remove(selectorElement);
  clearForm(selectorForm);
}
function clearForm(selector){
  $(selector).find('input').val("");
  $(selector).find('textarea').val("");
}
function displayEditAuthor(authorObj){

  console.log('author',authorObj)

  // load values to form
  $('#addAuthor').prepend(`<input class='author' name='authorId' type='hidden' value='${authorObj._id}'/>`)
  $('#addAuthor').find('input[name="firstName"]').val(authorObj.firstName);
  $('#addAuthor').find('input[name="lastName"]').val(authorObj.lastName);
  $('#addAuthor').find('input[name="birthYear"]').val(authorObj.birthYear);
  // toggle on the edit button
  $('#addA').hide();
  $('#editA').show();
}
function displayEditBook(bookObj){
  console.log('bookObj',bookObj)
  //
  $('#editBookDiv').show();
  // load values into the form
  $('#editBook').attr('action',`/books/${bookObj._id}/update`)
  $('#editBook').children('.form-group').prepend(`<span class='author'><b>Author:</b> ${bookObj.author.lastName},${bookObj.author.firstName}</span>`);
  $('#editBook').find('input[name="title"]').val(bookObj.title);
  $('#editBook').find('input[name="pub"]').val(bookObj.publisher);
  $('#editBook').find('input[name="year"]').val(bookObj.publishDate);
}
function editBook(event){
  event.preventDefault();
  var dataObject={
    title: $(this).find('input[name="title"]').val(),
    publishDate: $(this).find('input[name="year"]').val(),
    publisher: $(this).find('input[name="pub"]').val(),
  }
  // the book._id is already loaded in the action
  $.ajax({url: $(this).attr('action'),
          method: 'POST',
          data: dataObject,
          success: function(data){
            resetDivForm('#editBookDiv','#editBook','.author'); //div,form,element-selector
            $('#editBookDiv').hide();
            indexAuthorsBooks();},
        })
        .fail(function(data){
          console.log("Fail?!",data)
  });
}
function displayEdit(button){
  $.ajax({url: $(this).attr('formaction'),
          method: 'GET',
          success: function(returnObj){

            if (returnObj.firstName){
              resetDivForm('#addAuthor','#addAuthor','.author'); //div,form,element-selector
              displayEditAuthor(returnObj);
            }
            else{
              resetDivForm('#editBookDiv','#editBook','.author'); //div,form,element-selector
              displayEditBook(returnObj);
            }
          },
        })
        .fail(function(data){
          console.log("Fail?!",data)
  });
}
function displayAddBook(button){
  // clear the form inputs and remove any ".author" classed-elements
  resetDivForm('#addBookDiv','#addBook','.author'); //div,form,element-selector
  //insert the author info into the form,div-space
  $('#addBookDiv').children('form').prepend(`<span class='author' data='${$(this).attr('data')}'><b>Author:</b> ${$(this).attr('data2')}</span>`);
  $('#addBookDiv').children('form').prepend(`<input class='author' name='authorId' type='hidden' value='${$(this).attr('data')}'/>`);
  $('#addBookDiv').show();
}
function addBook(event){
  event.preventDefault();
  var dataObject={
    title: $('input[name="title"]').val(),
    publishDate: $('input[name="year"]').val(),
    publisher: $('input[name="pub"]').val(),
    author: $('input[name="authorId"]').val()
  }
  $.ajax({url: '/books',
          method: 'POST',
          data: dataObject,
          success: function(data){
            resetDivForm('#addBookDiv','#addBook','.author'); //div,form,element-selector
            $('#addBookDiv').hide();
            indexAuthorsBooks();},
        })
        .fail(function(data){
          console.log("Fail?!",data)
  });
}
function indexAuthorsBooks(){
  function writeAuthor(authorObj){
    var htmlString='';
    htmlString += `<li id=${authorObj._id} class='author'>
                    <button formaction="/authors/${authorObj._id}/show" class='btnE btn btn-xs btn-primary'>
                      Edit
                    </button>
                      <b>${authorObj.lastName}, ${authorObj.firstName}</b>, b. ${authorObj.birthYear}`;
    htmlString += `<button formaction="/authors/${authorObj._id}/addBook" class='btnA btn btn-xs btn-primary' data='${authorObj._id}' data2='${authorObj.lastName}, ${authorObj.firstName}'>
                    Add Book
                  </button>`;
    if (authorObj.books.length > 0){
        htmlString += "<ul data='books'>";
        authorObj.books.forEach(function(bookObj){
            htmlString += `<li class='book'>
                              <button formaction="/books/${bookObj._id}/show" class='btnE btn btn-xs btn-primary'>
                                Edit
                              </button>
                              ${bookObj.title} (${bookObj.publishDate})
                              <button formaction="/books/${bookObj._id}/destroy" class='btnD btn btn-xs btn-danger'>
                                Remove
                              </button>
                           </li>`
        });
        htmlString += "</ul>";
    } //books.length>0
    else{
      htmlString += `<button formaction='/authors/${authorObj._id}/destroy' class='btnD btn btn-xs btn-danger'>
                       Remove
                     </button>`;
    }
    htmlString +='</li>';
    return htmlString;
  }
  $('#ab ul').empty();
  $.ajax({
      url: '/authors',
      method: 'GET',
      data: '',
      success: function(authorsArr){
        var htmlString = '';
        authorsArr.forEach(function(authorObj){
          htmlString += writeAuthor(authorObj);
        });
        $('#ab ul').html(htmlString);
      } //success function
  })
  .fail(function(data){
    console.log("Fail!? :",data)
  });
}


function remove(event){
  event.preventDefault();

  $.ajax({url: $(this).attr('formaction'),
          method: 'POST',
          success: indexAuthorsBooks,
        })
        .fail(function(data){
          console.log("Fail?!",data)
  });
}
function formAuthor(event){

  event.preventDefault();
  var dataObject={firstName: $('input[name="firstName"]').val(),
         lastName: $('input[name="lastName"]').val(),
         birthYear: $('input[name="birthYear"]').val()};
  var aId=$(this).children('input[name="authorId"]').val();
  if(aId !== undefined){
    dataObject['_id'] = aId;
    $.ajax({url: `/authors/${aId}/update`,
            method: 'POST',
            data: dataObject,
            success: function(){

              $('#addAuthor').find('input').remove('.author');
              clearForm('#addAuthor');

              $('#addA').css('display','none');
              $('#editA').css('display','none');
              $('#addA').toggle();

              indexAuthorsBooks();
            },
    });
  }
  else{
    $.ajax({url: '/authors',
            method: 'POST',
            data: dataObject,
            success: function(){
              clearForm('#addAuthor')
              indexAuthorsBooks();
            },
    });
  }
}
$(document).ready(function(){
    console.log('jQuery running');

    $('#addBook').on('submit', addBook);
    $('#addBook').on('click','.cancel',function(){
      resetDivForm('#addBookDiv','#addBook','.author'); //div,form,element-selector
      $('#addBookDiv').hide();
    });

    $('#editBook').on('submit', editBook);
    $('#editBook').on('click','.cancel',function(){
      resetDivForm('#editBookDiv','#editBook','.author'); //div,form,element-selector
      $('#editBookDiv').hide();
    });

    $('#addAuthor').submit(formAuthor);
    $('#addAuthor').on('click','.cancel',function(){
      resetDivForm('#addAuthor','#addAuthor','.author'); //div,form,element-selector
    });

    $('#ab').on('click','.btnD', remove);
    $('#ab').on('click','.btnA', displayAddBook);
    $('#ab').on('click','.btnE', displayEdit);
    $('#ab').on('mouseenter','li',function(){
      $(this).children('.btnD,.btnE,.btnA').show();
    });
    $('#ab').on('mouseleave','li',function(){
      $(this).children('.btnD,.btnE,.btnA').hide();
    });
    indexAuthorsBooks();
});
