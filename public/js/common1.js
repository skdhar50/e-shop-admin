const openSubMenu = (divId) => {
    // alert(divId)
    let ele = document.getElementById(divId)
    let btn = document.getElementById("btn-" + divId);
    btnClassName = "btn-sidebar-item hover:bg-gray-700 rounded-full rotate-0";

    btn.className === btnClassName ? (
        ele.className = "sub-menu ml-9 text-gray-300"
    ) : (
        ele.className = "sub-menu hidden ml-9 text-gray-300"
    );

    btn.className = btn.className === btnClassName ? btnClassName + " !rotate-180" : btnClassName
};


function sidebarHandler() {
    let btnSidebar = document.getElementById("btn-sidebar");
    let siidebarInner = document.getElementById("sidebar-inner");
    let logo = document.getElementById('logo');
    let footer = document.getElementById('footer');
    let sidebar = document.getElementById('sidebar');
    let width = sidebar.style.minWidth;
    let itemTitles = document.getElementsByClassName('sidebar-item-title');
    let btns = document.getElementsByClassName('btn-sidebar-item');
    let subMenues = document.getElementsByClassName('sub-menu');
    let subMenuItems = document.getElementsByClassName('sub-menu-item');


    // hide/show all title (Working)
    for (let i = 0; i < itemTitles.length; i++) {
        width === "80px" ? itemTitles[i].style.display = 'block' : itemTitles[i].style.display = 'none';
    }

    // hide/show all buttons (working)
    for (let i = 0; i < btns.length; i++) {
        if (width === "80px") {
            btns[i].className = 'btn-sidebar-item hover:bg-gray-700 rounded-full rotate-0';
        } else {
            btns[i].className = 'btn-sidebar-item hover:bg-gray-700 rounded-full rotate-0 hidden';
        }
    }

    // hide/show all sub menues
    for (let i = 0; i < subMenues.length; i++) {
        subMenues[i].className = 'sub-menu hidden ml-9 text-gray-300';
        subMenuItems[i].className = 'sub-menu-item';
        if (width !== "80px") {
            subMenues[i].className = 'sub-menu hidden ml-9 text-gray-300 group-hover:block group-hover:absolute -mt-8 w-44 pl-3';
            subMenuItems[i].className = 'sub-menu-item bg-gray-900 p-2 rounded text-gray-300';
        }
    }


    if (width === "80px") {
        // Expand the sidebar
        logo.style.display = "block";
        footer.style.display = "block";
        sidebar.style.minWidth = "256px";
        btnSidebar.style.transform = "rotate(0deg)";
        siidebarInner.style.paddingRight = "0px";


    } else {
        // Collapse the sidebar
        logo.style.display = "none";
        footer.style.display = "none";
        sidebar.style.minWidth = "80px";
        btnSidebar.style.transform = "rotate(180deg)";
        siidebarInner.style.paddingRight = "16px";
    }
};
function showSidebar() {
    let sidebar = document.getElementById('sm-sidebar');
    // sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    sidebar.className = sidebar.className === "hidden absolute md:static md:!block" ? "absolute md:static md:!block" : "hidden absolute md:static md:!block";
}


// Displaying date and time
(dateTime = () => {
    var today = new Date();
    today = today.toLocaleString('un-US', { hour12: true })
    document.getElementById('time').innerHTML = today;

    setTimeout(function () {
        dateTime()
    }, 1000);
})();

