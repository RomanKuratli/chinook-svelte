export const toastState = $state({
    message: "",
    type: "success", // success, error
    visible: false
})

export function showToast(msg: string, type="success") {
    toastState.message = msg
    toastState.type = type
    toastState.visible = true;

    setTimeout(() => {
        toastState.visible = false
    }, 3000)
}