var myItems = [];
var myList = $("#lista");

for (var i = 0; i < 100; i++) {
    myItems.push("<li>item " + i + "</li>");
}

myList.append(myItems.join('<hr>'));

let dos = $("li[id^='item']").eq(1);
console.log(dos.html());

console.log(dos.parents('div#listas').attr('id'));

$('li:first-child').css({
    color: 'red'
})

let tercero = $('li').eq(2);  // ? toma el tercer elemento de la lista
tercero.data('llave', '<h1>Hola</h1>');
console.log(tercero.data('llave'));


var foo = $("#bar1");

console.log("Index: " + foo.index()); // 1

var listItem = $("li");

// This implicitly calls .first()
console.log("Index: " + listItem.index()); // 1
console.log("Index: " + listItem.first().index()); // 1

var div = $("div");

// This implicitly calls .first()
console.log("Index: " + div.index()); // 0
console.log("Index: " + div.first().index()); // 0