export default function theme (){
    let darktheme = document.querySelector(".darktheme");
    let darkthemeIcon = document.querySelector(".darktheme_box span")
    
    const useDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    if(useDarkTheme.matches){
        darkthemeIcon.textContent = 'dark_mode'
        darktheme.classList.add("sidenav_effect")
        document.documentElement.classList.add("calc-darkmode")
    }else{
        darktheme.classList.remove("sidenav_effect");
        darkthemeIcon.textContent = 'light_mode';
        document.documentElement.classList.remove("calc-darkmode")
    }
    
    function toggleDarkMode(state){
        document.documentElement.classList.toggle("calc-darkmode", state)
    }
    darktheme.onclick = () =>{
        if(darkthemeIcon.textContent == 'light_mode'){
            darkthemeIcon.textContent = 'dark_mode'
            darktheme.classList.add("sidenav_effect")
            toggleDarkMode(true)
        }
        else{
            darktheme.classList.remove("sidenav_effect");
            darkthemeIcon.textContent = 'light_mode';
            toggleDarkMode(false)
        }
    }

}