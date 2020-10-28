import Vue from "vue";
class ToastService {
  /**
   * Shows a toast with the provided message
   *
   * @param {String} message Text to be displayed
   * @param {Boolean} isSuccess Whether the toast should display success
   * @memberof ToastService
   */
  showToast(message, isSuccess) {
    Vue.$toast.open({
      message: message,
      type: isSuccess ? "success" : "error",
      position: "top"
    });
  }
}

export default new ToastService();
