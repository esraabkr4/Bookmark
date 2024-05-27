var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBTN = document.getElementById("submitBTN");
var siteList;
if (Boolean(localStorage.getItem('BookmarkList')) == false) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem('BookmarkList'));
  displaySite();
}
submitBTN.onclick = function () {
  addSite();
  displaySite();
  clearForm();
}
function addSite() {
  if (validation(siteName) && validation(siteUrl)) {
    var siteOBJ = { siteName: siteName.value, siteUrl: siteUrl.value };
    siteList.push(siteOBJ);
    localStorage.setItem('BookmarkList', JSON.stringify(siteList));
  }
}
function clearForm() {
  siteName.value = '';
  siteUrl.value = '';

}
function displaySite() {
  var box = "";
  for (var i = 0; i < siteList.length; i++) {

    box += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${siteList[i].siteName}</td>
        <td><a href="${siteList[i].siteUrl}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</a>
        </td>
        <td><button type="button" class="btn btn-danger" onclick="deletefun(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </td>
      </tr>`

  }
  document.getElementById("tableBody").innerHTML = box;
}
function deletefun(index) {
  siteList.splice(index, 1);
  localStorage.setItem('BookmarkList', JSON.stringify(siteList));
  displaySite();
}
function validation(ele) {

  var regex = {
    siteName: /^\w{3,}$/,
    siteUrl: /(^http(s)?:\/{2}\w+\.\w{2,}$)|(^www(\.\w{2,}){1,2}$)/
  }
  if (regex[ele.id].test(ele.value)) {
    // ele.classList.replace('is-invalid','is-valid');
    // ele.nextElementSibling.classList.replace('d-block','d-none');
    ele.classList.remove('is-invalid');
    ele.classList.add('is-valid');
    ele.nextElementSibling.classList.remove('d-block');
    ele.nextElementSibling.classList.add('d-none');
    return true;
  } else {
    // ele.classList.replace('is-valid','is-invalid');
    // ele.nextElementSibling.classList.replace('d-none','d-block');
    ele.classList.remove('is-valid');
    ele.classList.add('is-invalid');
    ele.nextElementSibling.classList.remove('d-none');
    ele.nextElementSibling.classList.add('d-block');
    return false;
  }

}

