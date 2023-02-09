import {validateFormError} from "@/plugins/form";
import {ElMessage} from "element-plus";
// import {getCurrentInstance} from "vue";
//
// const proxy = getCurrentInstance()

export function DoSendSms(proxy, FromInstanceDom, FromData, BtnSmsValue, BtnSmsTextValue, SmsError) {
    FromInstanceDom.validateField("mobile", valid => {
        // 校验失败
        if (!valid) {
            console.log("校验失败");
            return false;
        }
        proxy.$axios.post("api/shipper/send/sms/", FromData).then(res => {
            console.log(FromData)
            if (res.data.code === 1000) {
                console.log("send ok")
                BtnSmsValue = true;// 发送验证码按钮禁止点击
                console.log("BtnSmsValue ok " + BtnSmsValue)
                let num = 60;
                let interval = window.setInterval(() => {
                    console.log(num)
                    num -= 1;
                    BtnSmsTextValue = `${num}秒后重发`
                    console.log(BtnSmsTextValue)
                    if (num < 1) {
                        BtnSmsTextValue = "重新发送";
                        window.clearInterval(interval);
                        BtnSmsValue = false;
                    }
                }, 1000)
            } else if (res.data.code === 2001) {
                validateFormError(SmsError, res.data.detail);
                ElMessage.error(res.data.message.mobile[0]);
            } else {
                ElMessage.error(res.data.message);
            }
        })
    })
}


