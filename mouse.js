const section = document.querySelector("#about");
let zoomedIn = false;

const moveCircle = (e) => {
    const svg = document.querySelector(".o");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const pctX = (e.clientX - vw / 2) / (vw / 2);
    const pctY = (e.clientY - vh / 2) / (vh / 2);
    anime({
        targets: [".o-out"],
        translateX: pctX * svg.scrollWidth * 0.8 / 2,
        duration: 100,
        easing: 'easeOutSine'
    });
    anime({
        targets: ".o-in",
        translateX: pctX * svg.scrollWidth * 0.85 / 2,
        translateY: `${pctY * 2}%`,
        duration: 100,
        easing: 'easeOutSine'
    });
}

const attachMouseMoveListener = () => {
    if(!zoomedIn){
        section.addEventListener("mousemove", moveCircle);
        console.log("attached mouse move listener");
    }
}

const detachMouseMoveListener = () => {
    if(!zoomedIn){
        section.removeEventListener("mousemove", moveCircle);
        console.log("removed mouse move listener");
        anime({
            targets: [".o-out", ".o-in"],
            translateX: 0,
            translateY: 0,
        });
    }
}

section.addEventListener("mouseenter", (e) => {
    console.log("mouse entered about section");
    attachMouseMoveListener();
});

section.addEventListener("mouseleave", (e) => {
    console.log("mouse left about section");
    detachMouseMoveListener();
});

const onClickHandler = (e) => {
    console.log("clicked");
    if(!zoomedIn){
        detachMouseMoveListener();
        zoomedIn = true;
        anime({
            targets: [".o-out", ".o-in"],
            r: "30%",
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeInOutQuad',
            complete: function() {
                const circle = document.querySelector(".o-in");
                const svg = document.querySelector(".o");
                const scrollWidth = svg.scrollWidth;
                const radius = circle.r.animVal.value;
                const cx = circle.cx.animVal.value + 2;
                const cy = circle.cy.animVal.value;

                const isFullCircle = scrollWidth >= radius * 2;
                const width = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : scrollWidth;
                const height = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(scrollWidth / 2, 2));
                const dx = isFullCircle ? cx - radius * Math.sin(Math.PI / 4) : cx - scrollWidth / 2;
                const dy = isFullCircle ? cy - radius * Math.cos(Math.PI / 4) : cy - height / 2;
                //console.log(dx, dy);
                const g = d3.select(".o")
                            .append('g')
                            .attr("class", "o-text")
                            .attr('transform', 'translate(' + [dx, dy] + ')');
                const body = g.append("foreignObject")
                    .attr("width", width)
                    .attr("height", height)
                    .style("overflow-y", "scroll")
                    .append("xhtml:body")
                    .style("font", "14px 'prompt-light'")
                    .style("color", "white")
                    .style("background-color", "transparent")
                if(isFullCircle){
                    body.html(`<h3>I'm Alex, a software engineer with a passion for crafting clean, modern, and efficient code.</h3>
                            <br>
                            <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create a polished and intuitive user experience.</p>
                            <br>
                            <p>In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new projects, I enjoy learning about new technologies, reading, and working out. Here is how I created this website.</p>`);
                }
                else{
                    body.html(`<h5>I'm Alex, a software engineer with a passion for crafting clean, modern, and efficient code.</h5>
                            <br>
                            <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create a polished and intuitive user experience.</p>
                            <br>
                            <p>In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new projects, I enjoy learning about new technologies, reading, and working out. Here is how I created this website.</p>`);
                }   
            }
        });
        anime({
            targets: ".AB",
            translateX: "-20%"
        });
        anime({
            targets: ".UT",
            translateX: "20%"
        });
    }
    else{
        zoomedIn = false;
        const el = document.getElementsByClassName("o-text");
        //console.log(el);
        el[0].remove();
        attachMouseMoveListener();
        anime({
            targets: ".o-out",
            r: "5%",
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: ".o-in",
            r: "3%",
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: ".AB",
            translateX: "20%"
        });
        anime({
            targets: ".UT",
            translateX: "-20%"
        });
    }
}

const circle = document.querySelector(".o-group");
circle.addEventListener("click", onClickHandler);

addEventListener("resize", (e) => {
    if(zoomedIn){
        const circle = document.querySelector(".o-in");
        const svg = document.querySelector(".o");
        const scrollWidth = svg.scrollWidth;
        const radius = circle.r.animVal.value;
        const cx = circle.cx.animVal.value;
        const cy = circle.cy.animVal.value;
                
        const isFullCircle = scrollWidth >= radius * 2;
        const width = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : scrollWidth;
        const height = isFullCircle ? 2 * radius * Math.cos(Math.PI / 4) : 2 * Math.sqrt(Math.pow(radius, 2) - Math.pow(scrollWidth / 2, 2));
        const dx = isFullCircle ? cx - radius * Math.sin(Math.PI / 4) : cx - scrollWidth / 2;
        const dy = isFullCircle ? cy - radius * Math.cos(Math.PI / 4) : cy - height / 2;
        //console.log(dx, dy);
        const g = d3.select(".o-text")
                    .attr('transform', 'translate(' + [dx, dy] + ')');
        const xhtml = g.select("foreignObject")
                        .attr("width", width)
                        .attr("height", height);
        if(isFullCircle){
            xhtml.select("body")
                 .html("")
                 .html(`<h3>I'm Alex, a software engineer with a passion for crafting clean, modern, and efficient code.</h3>
                 <br>
                 <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create a polished and intuitive user experience.</p>
                 <br>
                 <p>In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new projects, I enjoy learning about new technologies, reading, and working out. Here is how I created this website.</p>`);
        }
        else{
            xhtml.select("body")
                 .html("")
                 .html(`<h5>I'm Alex, a software engineer with a passion for crafting clean, modern, and efficient code.</h5>
                 <br>
                 <p>Whether I'm working on a new app or optimizing an existing system, I always strive to create a polished and intuitive user experience.</p>
                 <br>
                 <p>In my freetime, I work as a freelance full-stack web developer. While I'm not coding away on my new projects, I enjoy learning about new technologies, reading, and working out. Here is how I created this website.</p>`);
        }
    }
});