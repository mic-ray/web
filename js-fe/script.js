var title = document.getElementById("title");
var subTitle = document.createElement("h3");
subTitle.textContent = "This is a subtitle";

title.after(subTitle);
