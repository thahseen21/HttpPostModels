// For to learn different http header content-types https://www.geeksforgeeks.org/http-headers-content-type/

//Illegal invocation is used to the bad content-type mentioned.

//400 error - the server cannot or will not process the request due to something
//that is from client error like malformed request syntax,invalid request message framing like that.

const BASE_URL = "https://localhost:5001";
const TYPE1 = "/home/insertType1";
const TYPE2 = "/home/insertType2";
const TYPE3 = "/home/insertType3";
const TYPE5 = "/home/insertType5";
const TYPE7 = "/home/insertType7";
const PAUSE_FILE_UPLOAD = "/home/PauseFileUpload";

class info {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

$(document).ready(() => {
  postType1();
  postType2();
  postType3();
  $("#file").change(() => {
    postType5();
    postType7();
  });
});

function postType1() {
  let body = new info(1, "potato");

  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE1,
    data: body,
    data: JSON.stringify(body),
    contentType: "application/json", // if the data is being sent as json then mention content-type as application/json
  });
}

function postType2() {
  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE2 + `?id=1&name=anotherpotato`,
  });
}

function postType3() {
  let body = new info(1, "another large potato");

  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE3,
    data: body,
  });
}

// Multiple content-type is not valid.
// So the below method is useless.
function postType4() {
  let body = new info(1, "another large potato");
  let formdata = new info(2, "fromfordata");
  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE3,
    data: body,
  });
}

//File upload
function postType5() {
  let file = $("#file")[0].files[0];

  let formdata = new FormData();

  formdata.append("file", file);

  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE5,
    data: formdata,
    contentType: false, // while the content type is set has multipart/form-data ; a network error is occuring
    processData: false,
  });
}

function postType5() {
  let file = $("#file")[0].files[0];

  let formdata = new FormData();

  formdata.append("file", file);

  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE5,
    data: formdata,
    contentType: false, // while the content type is set has multipart/form-data ; a network error is occuring
    processData: false,
  });
}

function postType7() {
  let file = $("#file")[0].files[0];

  let formdata = new FormData();

  formdata.append("file", file);
  formdata.append("id", 21);
  formdata.append("name", "smashed potato");

  $.ajax({
    type: "POST",
    url: BASE_URL + TYPE7,
    data: formdata,
    contentType: false, // while the content type is set has multipart/form-data ; a network error is occuring
    processData: false,
  });
}

let ajaxCall;

function PauseAndContinueFileUpload() {
  let file = $("#pauseFile")[0].files[0];

  let formdata = new FormData();

  formdata.append("file", file);
  formdata.append("id", 21);
  formdata.append("name", "super cool potato");
  formdata.append("isContinue", false)

  this.ajaxCall = $.ajax({
    type: "POST",
    url: BASE_URL + PAUSE_FILE_UPLOAD,
    data: formdata,
    contentType: false, // while the content type is set has multipart/form-data ; a network error is occuring
    processData: false,
    success: function () {
      alert("file uploaded");
    },

    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            $("#uploadProgress").html(percentComplete);
            $("#uploadProgress").css({
              width: percentComplete.toString() + "%",
            });
            // $("#upload")
            if (percentComplete === 100) {
              $("#progress-bar").hide();
            }
          }
        },
        false
      );

      xhr.addEventListener("loadstart", function () {
        console.log("loadstart");
        $("#progress-bar").show();
      });

      xhr.addEventListener("loadend", function () {
        console.log("loadend");
        $("#progress-bar").hide();
      });
      xhr.addEventListener("error", function () {
        console.log("error");
        $("#progress-bar").hide();
      });

      return xhr
    }
  });
}

function stopFileUpload() {
  if (this.ajaxCall != null)
    this.ajaxCall.abort();
  else
    alert("null value detected")
}