function resetFormAddBook(){
  $('#addBookDiv').find('span').remove('.author');
  $('#addBookDiv').find('input').remove('.author');
  clearForm('#addBookDiv');
}
function clearForm(selector){
  $(selector).find('input').val("");
  $(selector).find('textarea').val("");
}
function displayAddBook(button){
  console.log(button)

  resetFormAddBook();

  $('#addBookDiv').children('form').prepend(`<span class='author' data='${$(this).attr('data')}'><b>Author:</b> ${$(this).attr('data2')}</span>`);
  $('#addBookDiv').children('form').prepend(`<input class='author' name='authorId' type='hidden' value='${$(this).attr('data')}'/>`);
  $('#addBookDiv').css('display', 'none');
  $('#addBookDiv').toggle();
}
function addBook(event){
  event.preventDefault();
  console.log($(this))
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
            resetFormAddBook();
            $('#addBookDiv').css('display', 'none');
            indexAuthorsBooks();},
        })
        .fail(function(data){
          console.log("Fail?!",data)
  });
}
function indexAuthorsBooks(){
  function writeAuthor(authorObj){
    var htmlString='';
    htmlString += `<li>
                    <button formaction="/authors/${authorObj._id}/show" class='btnE btn btn-xs btn-primary'>
                      Edit
                    </button>
                      ${authorObj.lastName}, ${authorObj.firstName}`;
    htmlString += `<button formaction="/authors/${authorObj._id}/addBook" class='btnA btn btn-xs btn-primary' data='${authorObj._id}' data2='${authorObj.lastName}, ${authorObj.firstName}'>
                    Add Book
                  </button>`;
    if (authorObj.books.length > 0){
        htmlString += "<ul data='books'>";
        authorObj.books.forEach(function(bookObj){
            htmlString += `<li>
                              <button formaction="/books/${bookObj._id}/show" class='btnE btn btn-xs btn-primary'>
                                Edit
                              </button>
                              ${bookObj.title}
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
  console.log("re-fill authors/books")
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
  console.log('#this',$(this))

  $.ajax({url: $(this).attr('formaction'),
          method: 'POST',
          success: indexAuthorsBooks,
        })
        .fail(function(dta){
          console.log("Fail?!",dta)
  });
}
function addAuthor(event){

  event.preventDefault();
  var dataObject={firstName: $('input[name="firstName"]').val(),
         lastName: $('input[name="lastName"]').val(),
         birthYear: $('input[name="birth"]').val()};

  $.ajax({url: '/authors',
          method: 'POST',
          data: dataObject,
          success: function(){
            clearForm('#addAuthor')
            indexAuthorsBooks();
          },
  });
}
$(document).ready(function(){
    console.log('jQuery running');
    $('#addBook').on('submit', addBook);
    $('#addAuthor').submit(addAuthor);
    $('#ab').on('click','.btnD', remove);
    $('#ab').on('click','.btnA', displayAddBook);
    $('#ab').on('mouseenter mouseleave','li',function(){
      $(this).children('.btnD').toggle();
    });
    $('#ab').on('mouseenter mouseleave','li',function(){
      $(this).children('.btnE,.btnA').toggle();
    });
    indexAuthorsBooks();
});
