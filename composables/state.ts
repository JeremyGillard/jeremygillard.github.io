export const useIndexRoute = () => useState<string>(() => '/#about');

export function toggleIndexRoute() {   
    const indexRoute = useIndexRoute();
    if (indexRoute.value == "/#about") {
        indexRoute.value = "/";
    } else {
        indexRoute.value = "/#about";
    }
}