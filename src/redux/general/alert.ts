import { notification } from "antd";
import { IconType } from "antd/lib/notification";

export const AlertAction = (msg: String, alertType: IconType) => (dispatch: any) => {
  notification.open({
    message: msg,
    type: alertType,
  });
};
