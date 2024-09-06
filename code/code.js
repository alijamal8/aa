let title = document.getElementById("title");
let price = document.getElementById("price");
let count = document.getElementById("count");
let data;
let add = document.getElementById("add");
let mood = "cr";
let tmp;
let t = document.getElementById("t");
let h = document.getElementById("h");
if (localStorage.data != null) {
  data = JSON.parse(localStorage.data);
} else {
  data = [];
}
function newobj() {
  let obj = {
    title: title.value,
    price: price.value,
    count: count.value,
  };
  if(title.value==''||price.value=='')
    {


  }else{
    if (mood === "cr") {
      if (obj.count > 1) {
        for (let j = 0; j < obj.count; j++) {
          data.push(obj);
        }
      } else {
        data.push(obj);
      }
    } else {
      data[tmp] = obj;
      mood = "cr";
      add.innerHTML = "اضافة";
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
  showdata();
  clearInterval();
}
function showdata() {
  let table = "";
  let datee = new Date();
  let d =
    datee.getDate() +
    "/" +
    (datee.getMonth() + 1) +
    "/" +
    datee.getFullYear() +
    "" +
    "/" +
    datee.getHours() +
    "" +
    ":" +
    datee.getMinutes() +
    "";
  for (let i = 0; i < data.length; i++) {
    table += `<tr>
              <td>${i}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${d}</td>
              <td><button onclick="del(${i})" style="background-color: #641220;" class="but"><i style="color: aliceblue;" class='bx bxs-trash'></i></button></td>
              <td><button onclick="updata(${i})" style="background-color:#012a4a;" class="but"><i style="color: aliceblue;" class='bx bx-pencil'></i></button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}
showdata();
function clearInterval() {
  title.value = "";
  price.value = "";
  count.value = "";
}
function deleteall() {
  let sum = 0;
  for (let a = 0; a < data.length; a++) {
    sum = +data[a].price + sum;
  }
  t.style.display = "none";
  h.style.display = "block";
  h.innerHTML = "بيع اليوم:" + sum;
  localStorage.clear();
  data.splice(0);
  showdata();
}
function del(i) {
  data.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showdata();
}
function updata(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  add.innerHTML = "تعديل";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  mood = "up";
}
function serdata(v) {
  let datee = new Date();
  let d =
    datee.getDate() +
    "/" +
    (datee.getMonth() + 1) +
    "/" +
    datee.getFullYear() +
    "";
  let table = "";
  for (let j = 0; j < data.length; j++) {
    if (data[j].title.includes(v)) {
      table += `<tr>
              <td>${j}</td>
              <td>${data[j].title}</td>
              <td>${data[j].price}</td>
              <td>${d}</td>
              <td><button onclick="del(${j})" style="background-color: #641220;" class="but"><i style="color: aliceblue;" class='bx bxs-trash'></i></button></td>
              <td><button onclick="updata(${j})" style="background-color:#012a4a;" class="but"><i style="color: aliceblue;" class='bx bx-pencil'></i></button></td>
    </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
