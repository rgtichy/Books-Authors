
$(document).ready(function(){
    console.log('jQuery running');
    $.ajax({
        url: '/authors',
        method: 'GET',
        success: function(authorsArr){
            var htmlString = '';
            authorsArr.forEach(function(authorObj){
                htmlString += `<li>${authorObj.firstName} ${authorObj.lastName}`;

                if (authorObj.books.length > 0){
                    htmlString += " ("
                    authorObj.books.forEach(function(bookObj){
                        htmlString += bookObj.title + ', '
                    })
                    htmlString += ")"
                }
            })

            $('ul').html(htmlString)
        }
    })
})