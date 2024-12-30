let books=[
    {
        id:1,
        bookName:"Yüzüklerin Efendisi",
        bookType:"Fantastik",
        author:"J.R.R. Tolkien"
    },
    {
        id:2,
        bookName:"Ben, Claudius",
        bookType:"Tarihsel Roman",
        author:"Robert Graves"
    },
    {
        id:3,
        bookName:"1984",
        bookType:"Bilim Kurgu",
        author:"George Orwell"
    }
]
if(localStorage.getItem("books")){
    books=JSON.parse(localStorage.getItem("books"));
}
function isAccepted(msg, ...keys){
    const value=prompt(msg);
    if(keys.includes(value)){
        return value;
    }else{
        alert("Hatalı tuşlama yaptınız!");
        return isAccepted(msg, ...keys);
    }
    
}
function addBook(){
    const bookName=prompt("Kitap ismini giriniz.");
    const bookType=prompt("Kitap türünü giriniz.");
    const author=prompt("Kitap yazarını giriniz.");
    alert("kitap başarı ile eklendi")
    books.push(
        {
            id: books[books.length-1].id+1,
            bookName,
            bookType,
            author
        }
    )
    localStorage.setItem("books",JSON.stringify(books));
    return nextAction();
    
}

function deleteBook(){
    const listBook=books.map(books=>`ID:${books.id}.Kitap türü: ${books.bookType}\n Kitap Adı: ${books.bookName}\n Kitap yazarı: ${books.author} `).join("\n");

    const value = prompt(`Silmek istediğiniz kullanıcının idsini söyleyin\nVazgeçmek istiyorsanız x yazınız\n${listBook}`);


    const findBooks=books.findIndex(books => books.id == value);
    if(findBooks== -1 && value.toLowerCase !="x"){
        if(value.toLowerCase() === "x"){
            return mainMenu();
        }
        alert("Yanlış bir ID değeri girdiniz");
        return deleteBook();
    } 
    books.splice(findBooks, 1);
    localStorage.setItem("books",JSON.stringify(books));
    return nextAction();

}

function bookList(){
    const listBook=books.map((books,index)=>`${index+1}.Kitap türü: ${books.bookType}\n Kitap Adı: ${books.bookName}\n Kitap yazarı: ${books.author}`).join("\n");
    alert(listBook);
    localStorage.setItem("books",JSON.stringify(books));
    return nextAction();
}

function mainMenu(){
    const value=isAccepted("Yapmak istediğiniz işlemi sçiniz:\n1.Kitap Ekleme\n2.kitap silme\n3.Kitapları listele\n4.Çıkış","1","2","3","4");
    if(value==1){
        return addBook();
    }else if(value==2){
        return deleteBook();

    }else if(value==3){
        return bookList();
    }
}
function nextAction(){
    const value = isAccepted("Başka bir işlem yapmak ister misiniz? (e/h)", "e", "h", "E", "H"); 
    if(value.toLowerCase() === "e"){
        return mainMenu();
    }else{
        alert("Güle güle....")
        return;
    }
}
mainMenu();