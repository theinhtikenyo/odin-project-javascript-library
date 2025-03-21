const dialogElem = document.getElementById("dialog");
const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector("#close");
const output = document.querySelector("output")
const confirmBtn = document.querySelector("#confirmBtn");
const author = document.querySelector("#author")
const title = document.querySelector("#title")
const pages = document.querySelector("#pages")
const haveread = document.querySelector('#haveread')
var table = document.querySelector('#myTable')
const deleteBook = document.querySelector('#deleteBook')

function Book (uuid,author,title, pages, status) {
  this.uuid = uuid
  this.author = author
  this.title = title
  this.pages = pages
  this.status = status
}
let booksArray = [
  
]


showBtn.addEventListener("click", () => {
  dialogElem.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  let status = haveread.checked === false
        ? "No"
        : "Yes"
        let toCheckArray = [author.value,title.value,pages.value]
        let flag = toCheckArray.every(el => el !== "" && el !== null && el !== undefined)
        
        if (flag){
          let uuid = crypto.randomUUID();
          let newBook = new Book(uuid, author.value, title.value,pages.value,status)
          booksArray.push(newBook)
          document.querySelector("#myTable tbody").innerHTML = booksArray.map(book => 
                                                `<tr>
                                                <td id="uuid">${book.uuid}</td>
                                                <td>${book.author}</td>
                                                <td>${book.title}</td>
                                                <td>${book.pages}</td>
                                                <td>${book.status}</td>
                                                <td>  <input type="button" value="Delete" /></td>
                                                </tr>`
                                              ).join('')

                                          
    }
  });
  
  
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialogElem.close();
    
  });

function tableclick(e) {
    if(e.target.value == "Delete")
      table.deleteRow( e.target.parentNode.parentNode.rowIndex);

    // this select td elements including author, pages .etc
      let tableData = e.target.parentNode.parentNode

    // .textContent make the html node as string
      let uuid = tableData.querySelector("#uuid").textContent

      // I used findIndex to search arrary index
      //  const numbers = [4, 9, 16, 25, 29];
      //  numbers.findIndex(myFunction); // it return array number if true
      //  function myFunction(value, index, array) {
      //   return value > 18;
      // }

      let indexNumberForDelete = booksArray.findIndex((value) => value["uuid"] == uuid)

      if (indexNumberForDelete >= 0) {
        booksArray.splice(indexNumberForDelete,1);//splice(0,1) means , 1 items will remove start from index 0
      }
}


table.addEventListener('click',tableclick,false);