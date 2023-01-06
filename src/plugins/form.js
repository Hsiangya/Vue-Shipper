export function validateFormError(errorDict, resError) {
    for (let key in resError) {
        let txt = resError[key];
        errorDict[key] = txt;
    }
}


//清除后端返回的错误
export function clearFormError(errorDict) {
    for (let key in errorDict) {
        errorDict[key] = ""
    }
}