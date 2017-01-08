function addBook(form){
  console.log(form)
}
function indexAuthorsBooks(authorsArr){
  console.log("after add authors")
  console.log(authorsArr)
  $('ul#ab').empty();
  var htmlString = '';
  authorsArr.forEach(function(authorObj){
      htmlString += `<li><button data='${authorObj._id}' class='btnE btn btn-xs btn-primary'>Edit</button>${authorObj.lastName}, ${authorObj.firstName}`;
      htmlString += `<button data='${authorObj._id}' class='btnA btn btn-xs btn-primary'>Add Book</button>`
      if (authorObj.books.length > 0){
          htmlString += "<ul data='books'>";
          authorObj.books.forEach(function(bookObj){
              htmlString += `<li><button data='${bookObj._id}' class='btnE btn btn-xs btn-primary'>Edit</button>${bookObj.title}<button data='${bookObj._id}' class='btnD btn btn-xs btn-danger'>Remove</button></li>`
          });
          htmlString += "</ul>";
      }
      else{
        htmlString += `<button data='${authorObj._id}' class='btnD btn btn-xs btn-danger'>Remove</button>`;
      }
  });
  $('ul').html(htmlString);
}
function remove(event){
  var doc=$(this).attr('data');
  var collection=$(this).parents('ul:first').attr('data');
  console.log('doc=',doc);
  console.log('collection=',collection);
  $.ajax({url: '/'+collection+'/'+doc+'/destroy',
          method: 'POST',
          success: indexAuthorsBooks,
        });
}
function addAuthor(event){
  console.log("Add Author")
  console.log($(this));
  event.preventDefault();
  var serialize=$(this).serialize();
  console.log("S#:",serialize)
  var dataObject={firstName: $('input[name="firstName"]').val(),
         lastName: $('input[name="lastName"]').val(),
         birthYear: $('input[name="birth"]').val()};
  console.log("dO#:",dataObject)

  // $.ajax({url: '/authors',
  //         method: 'POST',
  //         data: { body: dataObject},
  //         dataType: 'json',
  //         success: indexAuthorsBooks,
  //       });
  $.ajax({url: '/authors',
          method: 'POST',
          data: JSON.stringify(dataObject),
          success: indexAuthorsBooks,
        });
  // $.post({
  //         url: '/authors',
  //         data: dataObject,
  //         success: function(data){console.log("Success? ",data)}
  // })
  // $.post('/authors',
  //         JSON.stringify(dataObject),
  //         function(data,error){console.log("Success? ",data,error)}
  //       );
}
$(document).ready(function(){
    console.log('jQuery running');
    $('#addBook').on('submit',this, addBook);
    $('#addAuthor').submit(addAuthor);
    $('#ab').on('click','.btnD', remove);
    $('#ab').on('mouseenter mouseleave','li',function(){
      $(this).children('.btnD').toggle();
    });
    $('#ab').on('mouseenter mouseleave','li',function(){
      $(this).children('.btnE,.btnA').toggle();
    });
    $.ajax({
        url: '/authors',
        method: 'GET',
        success: function(authorsArr){
            var htmlString = '';
            authorsArr.forEach(function(authorObj){
                htmlString += `<li><button data='${authorObj._id}' class='btnE btn btn-xs btn-primary'>Edit</button>${authorObj.lastName}, ${authorObj.firstName}`;
                htmlString += `<button data='${authorObj._id}' class='btnA btn btn-xs btn-primary'>Add Book</button>`
                if (authorObj.books.length > 0){
                    htmlString += "<ul data='books'>";
                    authorObj.books.forEach(function(bookObj){
                        htmlString += `<li><button data='${bookObj._id}' class='btnE btn btn-xs btn-primary'>Edit</button>${bookObj.title}<button data='${bookObj._id}' class='btnD btn btn-xs btn-danger'>Remove</button></li>`
                    });
                    htmlString += "</ul>";
                }
                else{
                  htmlString += `<button data='${authorObj._id}' class='btnD btn btn-xs btn-danger'>Remove</button>`;
                }
            });
            $('ul').html(htmlString)
        }
    });
});
