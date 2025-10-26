
var MainView = document.querySelector(".Main");
var SwitchView = document.querySelector(".Bottom");

window.onscroll = function () {
    const navbar = document.querySelector(".Header");
    if (window.pageYOffset > 0) {
        navbar.classList.add("Header_Sub");
    } else {
        navbar.classList.remove("Header_Sub");
    }
};

function LoadPage(url,page,loading = false,loading_F = null) {
    gsap.to([SwitchView.children[page].children[0].children[0],SwitchView.children[page].children[1]], {
        immediateRender: true,
        color: "#DFDFD6",
        fill: "#DFDFD6",
        duration: 0.120,
        ease: "power1"
    });
    for(i=0;i<SwitchView.children.length;i++){
        if(i == page) continue;
        gsap.to([SwitchView.children[i].children[0].children[0],SwitchView.children[i].children[1]], {
            immediateRender: true,
            color: "#98989F",
            fill: "#98989F",
            duration: 0.120,
            ease: "power1"
        });
    }
    gsap.to(MainView, {
        immediateRender: true,
        y: "-1em",
        opacity: 0,
        duration: 0.385,
        ease: "power1",
        onComplete: () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    if(xhr.responseText === "") return;
                    MainView.innerHTML = xhr.responseText;
                    if(loading) MainView.classList.add("Main_Tips_Status");
                    gsap.fromTo(MainView, {
                        immediateRender: true,
                        y: "1em",
                        opacity: 0,
                        // delay: 0.1,
                        duration: 0.385,
                        ease: "power1"
                    },{
                        immediateRender: true,
                        y: "0",
                        opacity: 1,
                        // delay: 0.1,
                        duration: 0.385,
                        ease: "power1"
                    });
                    
                    try {
                        loading_F();
                    } catch (error) {
                        console.error(error);
                    }
                    
                    // window.history.pushState({}, '', url);
                    if(!loading) MainView.classList.remove("Main_Tips_Status");
                }
            };
            xhr.send();
        }
    });

    /*MainView.innerHTML = Shell.Run("cat \""+url+"\"").stdout;
    window.history.pushState({}, '', url);*/
}

function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}

window.addEventListener("popstate", function (e) {
    console.log("Hei Hei Hei ~");
}, false);










