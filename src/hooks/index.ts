import cookies from "js-cookie";

export const Url :string = "http://192.168.1.10:8000"
export const Url_img :string = "http://192.168.1.10:8000"
//export const Url :string = "https://finovafintech.io/deltaagro/admincms"
// export const Url_img :string = "https://finovafintech.io"
// export const Url :string = "./admincms"
// export const Url_img :string = ".."
export const en :string = "api"
export const fr :string = "api/fr"



const currentLanguageCode = cookies.get("i18next") || "en";
export const lng = currentLanguageCode ==="fr" ? fr : en