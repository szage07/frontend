function createRouter(){
        // alert(window.location.pathname)
        switch (window.location.pathname) {
            case "/":
                case "/assets/index.html":
                    case "/assets/register(edited).html":
                        case "http://127.0.0.1:5500/":
                            case "/assets/":

                if (localStorage.getItem("token")) {
                    window.location.pathname = '/assets/js/dashboard/dashboard.html'
                }
                break;
            case "/assets/js/dashboard/dashboard.html":
                if (!localStorage.getItem("token")) {
                    window.location.pathname = '/assets/index.html'
                }
            break;

            default:
                break;
        }

}
export{createRouter};